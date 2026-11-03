"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Star } from "lucide-react";
import { whatsapp } from "@/lib/utils";

export default function Hero({ video }: { video: boolean }) {
  return (
    <section className="hero hero-redesign" id="inicio">
      <div className="hero-photo" aria-hidden="true" />
      {video && (
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-content hero-content-redesign">
        <div className="hero-location" data-reveal>
          <i /> BARBEARIA PREMIUM · POÇOS DE CALDAS
        </div>
        <h1 data-reveal>
          O corte que
          <br />
          combina com
          <br />
          <em>a sua presença.</em>
        </h1>
        <p data-reveal>
          Precisão, cuidado e personalidade em cada detalhe.
          <br className="desktop-break" /> Seu horário começa aqui.
        </p>
        <div className="hero-actions" data-reveal>
          <Link className="button" href={whatsapp()}>
            Agendar meu horário <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="#servicos">
            Ver serviços <ArrowDown size={16} />
          </Link>
        </div>
        <div className="hero-signature" data-reveal>
          <span className="stars">★★★★★</span>
          <span>Atendimento que respeita o seu tempo.</span>
        </div>
      </div>
      <div className="hero-meta" aria-label="Serviços disponíveis">
        <span>CORTE</span><i /> <span>BARBA</span><i /> <span>ACABAMENTO</span>
      </div>
      <Link
        className="scroll-hint"
        href="#servicos"
        aria-label="Explorar serviços"
      >
        <ArrowDown size={16} />
        <span>CONHEÇA A BARBER PRIME</span>
      </Link>
      <div className="hero-rating">
        <Star size={15} />
        <span>O CLÁSSICO, DO SEU JEITO.</span>
      </div>
    </section>
  );
}
