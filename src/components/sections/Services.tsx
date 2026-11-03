"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { useState } from "react";
import BookingModal from "@/components/booking/BookingModal";
import { money } from "@/lib/utils";
import { ServiceData } from "@/types";

export default function Services({ services }: { services: ServiceData[] }) {
  const [selected, setSelected] = useState("");

  return (
    <section className="atelier-services" id="servicos" aria-label="Serviços e preços">
      <div className="container atelier-services-grid">
        <header className="atelier-services-intro" data-reveal>
          <p className="atelier-label">02 / O QUE FAZEMOS</p>
          <h2>O seu visual<br />não precisa de<br /><em>fórmula pronta.</em></h2>
          <p>
            Primeiro a gente escuta. Depois escolhe técnica, acabamento e ritmo
            para deixar o resultado com a sua cara.
          </p>
          <div className="atelier-service-rule" />
          <small>Atendimento com horário marcado<br />em Poços de Caldas, MG.</small>
        </header>

        <div className="atelier-menu" data-reveal>
          <div className="atelier-menu-head">
            <span>RITUAIS</span><span>TEMPO</span><span>INVESTIMENTO</span>
          </div>
          {services.map((service, index) => (
            <button
              className="atelier-menu-row"
              key={service._id}
              onClick={() => setSelected(service.slug)}
            >
              <span className="atelier-menu-number">0{index + 1}</span>
              <span className="atelier-menu-name">
                <strong>{service.name}</strong>
                <small>{service.description}</small>
              </span>
              <span className="atelier-menu-time"><Clock size={13} /> {service.duration} min</span>
              <span className="atelier-menu-price">{money(service.price)}</span>
              <ArrowUpRight className="atelier-menu-arrow" size={18} />
            </button>
          ))}
          <button className="atelier-all-book" onClick={() => setSelected(services[0]?.slug ?? "")}>
            Escolher meu horário <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
      {selected && <BookingModal services={services} selected={selected} onClose={() => setSelected("")} />}
    </section>
  );
}
