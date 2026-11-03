"use client";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Star } from "lucide-react";

export default function Hero({ video }: { video: boolean }) {
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
        <h1 data-reveal>
          Seu melhor estilo<br />
          <em>começa aqui.</em>
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
