"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AppointmentData, ServiceData } from "@/types";
import { money } from "@/lib/utils";
import AdminSidebar from "./AdminSidebar";
import AppointmentTable from "./AppointmentTable";
import ServiceForm from "./ServiceForm";
import Modal from "@/components/ui/Modal";
export default function AdminPanel({
  view,
}: {
  view: "dashboard" | "agendamentos" | "servicos";
}) {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [editing, setEditing] = useState<ServiceData | null | undefined>(
    undefined,
  );
  const load = useCallback(async () => {
    try {
      const res = await fetch(
        view === "servicos" ? "/api/services?all=1" : "/api/appointments",
      );
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      setError("");
      if (!res.ok) throw new Error(data.error);
      if (view === "servicos") setServices(data);
      else setAppointments(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha de conexão.");
    } finally {
      setLoading(false);
    }
  }, [view, router]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(view === "servicos" ? "/api/services?all=1" : "/api/appointments", {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/admin/login");
          return null;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      })
      .then((data) => {
        if (controller.signal.aborted || !data) return;
        if (view === "servicos") setServices(data);
        else setAppointments(data);
      })
      .catch((e) => {
        if (!controller.signal.aborted)
          setError(e instanceof Error ? e.message : "Falha de conexão.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [view, router]);
  async function change(id: string, newStatus: string) {
    try {
      const res = await fetch("/api/appointments/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        setError((await res.json()).error || "Falha na atualização.");
        return;
      }
      await load();
    } catch {
      setError("Falha de conexão.");
    }
  }
  async function remove(id: string) {
    if (
      !confirm(
        "Remover este serviço? Agendamentos existentes serão preservados.",
      )
    )
      return;
    try {
      const res = await fetch("/api/services/" + id, { method: "DELETE" });
      if (!res.ok) setError((await res.json()).error);
      else await load();
    } catch {
      setError("Falha de conexão.");
    }
  }
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">BARBER PRIME / ADMIN</span>
            <h1>
              {view === "dashboard"
                ? "Visão geral"
                : view === "servicos"
                  ? "Seus serviços"
                  : "Agendamentos"}
            </h1>
            <p>O cuidado com seu negócio começa aqui.</p>
          </div>
          {view === "servicos" && (
            <button className="button" onClick={() => setEditing(null)}>
              + Novo serviço
            </button>
          )}
        </div>
        {error && (
          <p className="error" role="alert">
            {error}{" "}
            <button onClick={() => void load()}>Tentar novamente</button>
          </p>
        )}
        {loading ? (
          <p role="status">Carregando...</p>
        ) : view === "servicos" ? (
          <div className="admin-services">
            {services.map((s) => (
              <article key={s._id}>
                <span
                  className={"badge " + (s.active ? "confirmed" : "cancelled")}
                >
                  {s.active ? "Ativo" : "Inativo"}
                </span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <strong>
                  {money(s.price)} · {s.duration} min
                </strong>
                <div className="row-actions">
                  <button onClick={() => setEditing(s)}>Editar / ativar</button>
                  <button onClick={() => void remove(s._id)}>Remover</button>
                </div>
              </article>
            ))}
            {!services.length && !error && (
              <p>
                Nenhum serviço cadastrado. Execute o seed ou crie um serviço.
              </p>
            )}
          </div>
        ) : (
          <>
            {view === "dashboard" && (
              <div className="metric-grid">
                {[
                  ["Total", appointments.length],
                  [
                    "Pendentes",
                    appointments.filter((a) => a.status === "pending").length,
                  ],
                  [
                    "Confirmados",
                    appointments.filter((a) => a.status === "confirmed").length,
                  ],
                  [
                    "Concluídos",
                    appointments.filter((a) => a.status === "completed").length,
                  ],
                ].map(([label, value]) => (
                  <article key={String(label)}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
            )}
            <div className="admin-toolbar">
              <h2>
                {view === "dashboard"
                  ? "Últimos agendamentos"
                  : "Todos os agendamentos"}
              </h2>
              {view === "agendamentos" && (
                <div className="filters">
                  <label>
                    Status
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="pending">Pendente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="completed">Concluído</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </label>
                  <label>
                    Data
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <button
                    onClick={() => {
                      setDate("");
                      setStatus("");
                    }}
                  >
                    Limpar
                  </button>
                </div>
              )}
            </div>
            <AppointmentTable
              items={appointments
                .filter(
                  (a) =>
                    (!status || a.status === status) &&
                    (!date || a.date === date),
                )
                .slice(0, view === "dashboard" ? 8 : undefined)}
              onChange={change}
            />
          </>
        )}
        {editing !== undefined && (
          <Modal
            title={editing ? "Editar serviço" : "Novo serviço"}
            onClose={() => setEditing(undefined)}
          >
            <ServiceForm
              service={editing || undefined}
              onSaved={() => {
                setEditing(undefined);
                void load();
              }}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}
