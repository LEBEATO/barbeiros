"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Scissors, Sparkles } from "lucide-react";
import BookingModal from "@/components/booking/BookingModal";
import { money } from "@/lib/utils";
import { ServiceData } from "@/types";

type Showcase = {
  eyebrow: string;
  title: string;
  description: string;
  serviceSlugs: string[];
  action: string;
  icon: "scissors" | "razor" | "clipper";
};

const showcases: Showcase[] = [
  { eyebrow: "O OFÍCIO · CORTES", title: "A arte do corte.", description: "Antes da tesoura, uma conversa. Avaliamos o formato do rosto, o tipo de fio e sua rotina para chegar a um corte que funciona todos os dias.", serviceSlugs: ["corte-masculino", "acabamento"], action: "Agendar corte", icon: "scissors" },
  { eyebrow: "O OFÍCIO · BARBA", title: "Barba de respeito.", description: "Navalha afiada, toalha quente e produtos que cuidam da pele. Contorno alinhado e nada de ardência no dia seguinte.", serviceSlugs: ["barba-completa"], action: "Agendar barba", icon: "razor" },
  { eyebrow: "O OFÍCIO · COMBOS", title: "Combos da casa.", description: "Corte e barba na mesma sessão, com tempo para fazer tudo com calma. Saia mais em conta e com o visual resolvido de uma vez.", serviceSlugs: ["corte-barba"], action: "Agendar combo", icon: "clipper" },
];

function ToolArt({ icon }: Pick<Showcase, "icon">) {
  if (icon === "razor") return <span className="tool-razor" aria-hidden="true" />;
  return icon === "clipper" ? <Sparkles aria-hidden="true" /> : <Scissors aria-hidden="true" />;
}

export default function Services({ services }: { services: ServiceData[] }) {
  const [slide, setSlide] = useState(0);
  const [selected, setSelected] = useState("");
  const current = showcases[slide];
  const displayed = useMemo(
    () => current.serviceSlugs.map((slug) => services.find((service) => service.slug === slug)).filter((service): service is ServiceData => Boolean(service)),
    [current, services],
  );
  const move = (direction: -1 | 1) => setSlide((value) => (value + direction + showcases.length) % showcases.length);

  return (
    <section className="service-showcase" id="servicos" aria-label="Serviços">
      <div className="container showcase-grid">
        <div className="showcase-copy" data-reveal>
          <p className="showcase-eyebrow">{current.eyebrow}</p>
          <h2>{current.title}</h2>
          <p className="showcase-description">{current.description}</p>
          <div className="showcase-list">
            {displayed.map((service) => (
              <button key={service._id} onClick={() => setSelected(service.slug)}>
                <span>{service.name}</span>
                <small><Clock size={12} /> {service.duration} min</small>
                <strong>{money(service.price)}</strong>
              </button>
            ))}
          </div>
          <button className="button showcase-action" onClick={() => setSelected(displayed[0]?.slug ?? "")}>{current.action}</button>
          <div className="showcase-controls" aria-label="Navegação dos serviços">
            <button onClick={() => move(-1)} aria-label="Serviço anterior"><ChevronLeft size={18} /></button>
            <button onClick={() => move(1)} aria-label="Próximo serviço"><ChevronRight size={18} /></button>
            <span>Próximo: {showcases[(slide + 1) % showcases.length].title.replace(".", "")}</span>
          </div>
        </div>
        <div className={`showcase-art art-${current.icon}`} data-reveal>
          <span className="art-glow" />
          <ToolArt icon={current.icon} />
          <div className="art-index">0{slide + 1}<span>/ 03</span></div>
        </div>
      </div>
      <div className="showcase-progress" aria-hidden="true">
        {showcases.map((item, index) => <span key={item.title} className={index === slide ? "active" : ""} />)}
      </div>
      {selected && <BookingModal services={services} selected={selected} onClose={() => setSelected("")} />}
    </section>
  );
}
