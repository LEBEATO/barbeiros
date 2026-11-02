"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookingSchema } from "@/lib/validation";
import { ServiceData } from "@/types";
import { today, whatsapp } from "@/lib/utils";
import Button from "@/components/ui/Button";
export default function BookingForm({
  services,
  selected = "",
}: {
  services: ServiceData[];
  selected?: string;
}) {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { serviceId: selected, email: "", notes: "" },
  });
  async function submit(data: z.infer<typeof bookingSchema>) {
    setMessage("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      setMessage(body.message || body.error);
      setSuccess(res.ok);
    } catch {
      setMessage("Não foi possível conectar. Tente novamente.");
    }
  }
  if (success)
    return (
      <div className="success" role="status">
        <span>✓</span>
        <h3>Seu próximo visual está a caminho.</h3>
        <p>{message}</p>
        <Link
          className="button"
          href={whatsapp(
            "Olá! Enviei uma solicitação para " +
              getValues("date") +
              " às " +
              getValues("time") +
              ". Gostaria de confirmar.",
          )}
        >
          Continuar no WhatsApp ↗
        </Link>
      </div>
    );
  return (
    <form onSubmit={handleSubmit(submit)} className="form-grid">
      <label>
        Seu nome
        <InputField
          {...register("customerName")}
          autoComplete="name"
          placeholder="Nome completo"
        />
        {errors.customerName && <small>{errors.customerName.message}</small>}
      </label>
      <label>
        WhatsApp
        <InputField
          {...register("whatsapp")}
          autoComplete="tel"
          placeholder="(35) 99999-9999"
        />
        {errors.whatsapp && <small>{errors.whatsapp.message}</small>}
      </label>
      <label>
        E-mail <span>(opcional)</span>
        <InputField
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
        />
        {errors.email && <small>{errors.email.message}</small>}
      </label>
      <label>
        Escolha seu serviço
        <select {...register("serviceId")}>
          <option value="">Selecione um serviço</option>
          {services.map((s) => (
            <option key={s._id} value={s.slug}>
              {s.name} · {s.duration} min
            </option>
          ))}
        </select>
        {errors.serviceId && <small>{errors.serviceId.message}</small>}
      </label>
      <label>
        Data
        <input {...register("date")} type="date" min={today()} />
        {errors.date && <small>{errors.date.message}</small>}
      </label>
      <label>
        Horário
        <select {...register("time")}>
          <option value="">Selecione</option>
          {Array.from({ length: 20 }, (_, i) => {
            const t =
              String(9 + Math.floor(i / 2)).padStart(2, "0") +
              ":" +
              (i % 2 ? "30" : "00");
            return <option key={t}>{t}</option>;
          })}
        </select>
        {errors.time && <small>{errors.time.message}</small>}
      </label>
      <label className="full">
        Observação <span>(opcional)</span>
        <textarea
          {...register("notes")}
          placeholder="Alguma preferência?"
          rows={3}
        />
        {errors.notes && <small>{errors.notes.message}</small>}
      </label>
      <p className="full form-note">
        Ao solicitar, você permite o uso dos dados para organizar seu
        atendimento. O horário depende de confirmação da equipe.
      </p>
      <Button className="full" disabled={isSubmitting || !services.length}>
        {isSubmitting ? "Enviando..." : "Solicitar agendamento"} ↗
      </Button>
      {message && (
        <p className="full error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
import InputField from "@/components/ui/Input";
