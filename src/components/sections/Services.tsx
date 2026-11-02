"use client";
import { useState } from "react";
import { Scissors, Combine, ArrowUpRight, Sparkles, Clock } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import BookingModal from "@/components/booking/BookingModal";
import { ServiceData } from "@/types";
import { money } from "@/lib/utils";
const icons = [Scissors, Combine, Sparkles, Scissors];
export default function Services({ services }: { services: ServiceData[] }) {
  const [selected, setSelected] = useState("");
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-heading" data-reveal>
          <SectionTitle
            eyebrow="01 / NOSSOS SERVIÇOS"
            title="O cuidado que define você."
          >
            Do clássico ao contemporâneo, excelência em cada detalhe.
          </SectionTitle>
          <span className="tiny-note">ESCOLHA SEU RITUAL ↓</span>
        </div>
        <div className="service-grid">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <button
                data-reveal
                className={
                  "service-card " + (s.slug === "corte-barba" ? "featured" : "")
                }
                key={s._id}
                onClick={() => setSelected(s.slug)}
              >
                {s.slug === "corte-barba" && (
                  <span className="card-label">O RITUAL COMPLETO</span>
                )}
                <div className="card-top">
                  <Icon size={32} strokeWidth={1} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <span className="duration">
                  <Clock size={13} />
                  {s.duration} minutos
                </span>
                <div className="card-bottom">
                  <span>{money(s.price)}</span>
                  <ArrowUpRight size={21} />
                </div>
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
