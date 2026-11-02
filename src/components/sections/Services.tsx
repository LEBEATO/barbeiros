"use client";
import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import BookingModal from "@/components/booking/BookingModal";
import { ServiceData } from "@/types";
import { money } from "@/lib/utils";
export default function Services({ services }: { services: ServiceData[] }) {
  const [selected, setSelected] = useState("");
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-heading services-heading" data-reveal>
          <SectionTitle
            eyebrow="01 / NOSSOS SERVIÇOS"
            title="Escolha o seu ritual."
          >
            Da primeira conversa ao acabamento: um atendimento pensado para você.
          </SectionTitle>
          <span className="tiny-note">TOQUE PARA AGENDAR ↓</span>
        </div>
        <div className="ritual-list">
          {services.map((s, i) => {
            return (
              <button
                data-reveal
                className="ritual-row"
                key={s._id}
                onClick={() => setSelected(s.slug)}
              >
                <span className="ritual-index">0{i + 1}</span>
                <span className="ritual-title">
                  <strong>{s.name}</strong>
                  <small>{s.description}</small>
                </span>
                <span className="ritual-time">
                  <Clock size={13} />
                  {s.duration} minutos
                </span>
                <span className="ritual-price">{money(s.price)}</span>
                <ArrowUpRight className="ritual-arrow" size={22} />
              </button>
            );
          })}
        </div>
      </div>
      {selected && (
        <BookingModal
          services={services}
          selected={selected}
          onClose={() => setSelected("")}
        />
      )}
    </section>
  );
}
