"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Clock, Camera, MessageCircle } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import { whatsapp } from "@/lib/utils";
import SectionTitle from "@/components/ui/SectionTitle";
export default function Contact() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });
  async function submit(data: z.infer<typeof contactSchema>) {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      setMessage(body.message || body.error);
      if (res.ok) reset();
    } catch {
      setMessage("Não foi possível enviar. Tente novamente.");
    }
  }
  return (
    <section id="contato" className="section contact">
      <div className="container contact-grid">
        <div data-reveal>
          <SectionTitle
            eyebrow="06 / VENHA NOS CONHECER"
            title="Seu lugar é aqui."
          />
          <ul className="contact-list">
            <li>
              <MapPin />
              <div>
                <b>Encontre a BARBER PRIME</b>
                <p>
                  Rua dos Barbeiros, 123 · Centro
                  <br />
                  Pouso Alegre, MG · Endereço de exemplo
                </p>
              </div>
            </li>
            <li>
              <Clock />
              <div>
                <b>Um horário para você</b>
                <p>
                  Segunda a sábado · 09h às 19h
                  <br />
                  Domingo · Fechado
                </p>
              </div>
            </li>
            <li>
              <MessageCircle />
              <Link href={whatsapp()}>Fale com a gente no WhatsApp ↗</Link>
            </li>
            <li>
              <Camera />
              <Link href="https://instagram.com">
                Instagram · perfil de exemplo ↗
              </Link>
            </li>
          </ul>
        </div>
        <form
          data-reveal
          onSubmit={handleSubmit(submit)}
          className="contact-form"
        >
          <h3>Vamos conversar?</h3>
          <label>
            Nome
            <input
              {...register("name")}
              autoComplete="name"
              placeholder="Como podemos chamar você?"
            />
            {errors.name && <small>Informe ao menos 3 caracteres.</small>}
          </label>
          <label>
            E-mail
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
            />
            {errors.email && <small>Informe um e-mail válido.</small>}
          </label>
          <label>
            WhatsApp (opcional)
            <input
              {...register("whatsapp")}
              autoComplete="tel"
              placeholder="(35) 99999-9999"
            />
          </label>
          <label>
            Mensagem
            <textarea
              {...register("message")}
              rows={3}
              placeholder="Como podemos ajudar?"
            />
            {errors.message && (
              <small>Escreva entre 10 e 2.000 caracteres.</small>
            )}
          </label>
          <button className="button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensagem ↗"}
          </button>
          {message && <p role="status">{message}</p>}
        </form>
      </div>
    </section>
  );
}
