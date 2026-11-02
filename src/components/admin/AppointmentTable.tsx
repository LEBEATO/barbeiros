"use client";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { AppointmentData } from "@/types";
import StatusBadge from "./StatusBadge";
export default function AppointmentTable({
  items,
  onChange,
}: {
  items: AppointmentData[];
  onChange: (id: string, status: string) => Promise<void>;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {[
              "Cliente",
              "Serviço",
              "Data / hora",
              "WhatsApp",
              "Status",
              "Ações",
            ].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a._id}>
              <td>{a.customerName}</td>
              <td>{a.serviceName}</td>
              <td>
                {format(parseISO(a.date), "dd/MM/yyyy")} · {a.time}
              </td>
              <td>
                <Link
                  href={"https://wa.me/" + a.whatsapp.replace(/\D/g, "")}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.whatsapp} ↗
                </Link>
              </td>
              <td>
                <StatusBadge status={a.status} />
              </td>
              <td>
                {!["completed", "cancelled"].includes(a.status) && (
                  <div className="row-actions">
                    {a.status === "pending" && (
                      <button onClick={() => void onChange(a._id, "confirmed")}>
                        Confirmar
                      </button>
                    )}
                    <button onClick={() => void onChange(a._id, "completed")}>
                      Concluir
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Cancelar este agendamento?"))
                          void onChange(a._id, "cancelled");
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && <p className="empty">Nenhum agendamento encontrado.</p>}
    </div>
  );
}
