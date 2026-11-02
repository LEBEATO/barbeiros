"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serviceSchema } from "@/lib/validation";
import { ServiceData } from "@/types";
export default function ServiceForm({
  service,
  onSaved,
}: {
  service?: ServiceData;
  onSaved: () => void;
}) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service || { active: true, duration: 40, price: 65 },
  });
  async function save(data: z.infer<typeof serviceSchema>) {
    try {
      const res = await fetch(
        "/api/services" + (service ? "/" + service._id : ""),
        {
          method: service ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (res.ok) onSaved();
      else setError((await res.json()).error || "Falha ao salvar.");
    } catch {
      setError("Falha de conexão.");
    }
  }
  return (
    <form className="form-grid" onSubmit={handleSubmit(save)}>
      <label>
        Nome
        <input {...register("name")} />
      </label>
      <label>
        Identificador (slug)
        <input {...register("slug")} placeholder="corte-masculino" />
      </label>
      <label className="full">
        Descrição
        <textarea {...register("description")} />
      </label>
      <label>
        Duração em minutos
        <input
          type="number"
          {...register("duration", { valueAsNumber: true })}
        />
      </label>
      <label>
        Preço (R$)
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
        />
      </label>
      <label className="checkbox full">
        <input type="checkbox" {...register("active")} /> Serviço ativo
      </label>
      {Object.entries(errors).map(([key, value]) => (
        <p className="error full" key={key}>
          {key}: {value.message}
        </p>
      ))}
      <button className="button full" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar serviço"}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
