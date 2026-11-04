"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Star } from "lucide-react";

const HERO_TITLE = "Seu melhor estilo\\ncomeça aqui.";

export default function Hero({ video }: { video: boolean }) {
  const [typedTitle, setTypedTitle] = useState(HERO_TITLE);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let position = HERO_TITLE.length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const animateTitle = () => {
      position += deleting ? -1 : 1;
      setTypedTitle(HERO_TITLE.slice(0, position));

      if (!deleting && position === HERO_TITLE.length) {
        deleting = true;
        timer = setTimeout(animateTitle, 1600);
        return;
      }

      if (deleting && position === 0) {
        deleting = false;
        timer = setTimeout(animateTitle, 420);
        return;
      }

      timer = setTimeout(animateTitle, deleting ? 34 : 72);
    };

    timer = setTimeout(animateTitle, 1300);
    return () => clearTimeout(timer);
  }, []);

  const [firstLine, secondLine = ""] = typedTitle.split("\\n");

  return (
    <section className="hero hero-redesign" id="inicio">
      <div className="hero-photo hero-atelier-photo" aria-hidden="true" />
      {video && (
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-content hero-content-redesign">
        <div className="hero-location app-kicker" data-reveal>
          <i /> BARBER PRIME · POÇOS DE CALDAS
        </div>
        <h1 className="hero-typewriter" data-reveal aria-label="Seu melhor estilo começa aqui.">
          <span aria-hidden="true">
            {firstLine || "\\u00a0"}
            {typedTitle.includes("\\n") && <br />}
            <em>{secondLine}</em>
            <i className="typing-caret" />
          </span>
        </h1>
        <p data-reveal>
          Escolha seu serviço, reserve seu horário e viva uma experiência feita
          para você.
        </p>
        <div className="hero-actions" data-reveal>
          <Link className="button app-main-cta" href="#agendamento">
            Agendar agora <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero-app-info" data-reveal>
          <span><Star size={14} fill="currentColor" /> Atendimento personalizado</span>
          <span><CalendarDays size={14} /> Com horário marcado</span>
        </div>
      </div>
      <div className="hero-app-card" data-reveal>
        <span className="hero-app-card-icon"><MapPin size={16} /></span>
        <span><b>Barber Prime</b><small>Poços de Caldas · MG</small></span>
        <span className="hero-open">Aberto hoje</span>
      </div>
    </section>
  );
}
