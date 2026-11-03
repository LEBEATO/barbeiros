"use client";

import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/booking/BookingModal";
import { money } from "@/lib/utils";
import { ServiceData } from "@/types";

export default function Services({ services }: { services: ServiceData[] }) {
  const [selected, setSelected] = useState("");

  return (
    <section className="app-services" id="servicos" aria-label="Serviços e preços">
      <div className="container">
        <header className="app-section-header" data-reveal>
          <span className="app-eyebrow"><Sparkles size={14} /> NOSSOS SERVIÇOS</span>
          <div>
            <h2>Escolha seu<br /><em>próximo visual.</em></h2>
            <p>Profissionais, produtos e cuidado para você sair se sentindo bem.</p>
          </div>
        </header>
        <div className="service-filter" aria-label="Categorias de serviços">
          <span className="active">Todos</span><span>Cortes</span><span>Barba</span><span>Combos</span>
        </div>
        <div className="app-service-grid" data-reveal>
          {services.map((service, index) => (
            <button
              className="app-service-card"
              key={service._id}
              onClick={() => setSelected(service.slug)}
            >
              <span className="app-service-icon">{String(index + 1).padStart(2, "0")}</span>
              <span className="app-service-name">
                <strong>{service.name}</strong>
                <small>{service.description}</small>
              </span>
              <span className="app-service-footer">
                <span><Clock size={14} /> {service.duration} min</span>
                <b>{money(service.price)}</b>
                <ArrowRight size={18} />
              </span>
            </button>
          ))}
        </div>
        <button className="app-all-book" onClick={() => setSelected(services[0]?.slug ?? "")}>
          Ver horários disponíveis <ArrowRight size={18} />
        </button>
      </div>
      {selected && <BookingModal services={services} selected={selected} onClose={() => setSelected("")} />}
    </section>
  );
}
