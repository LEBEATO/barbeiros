"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { whatsapp } from "@/lib/utils";

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
        <div className="hero-location hero-atelier-kicker" data-reveal>
          <i /> POÇOS DE CALDAS, MG · DESDE 2018
        </div>
        <h1 data-reveal>
          Estilo com
          <br />
          identidade,
          <br />
          <em>sem personagem.</em>
        </h1>
        <p data-reveal>
          Corte, barba e conversa boa. Um atendimento feito para o seu rosto,
          <br className="desktop-break" /> sua rotina e o jeito que você quer se sentir.
        </p>
        <div className="hero-actions" data-reveal>
          <Link className="button" href={whatsapp()}>
            Reservar horário <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="#servicos">
            Ver serviços <ArrowDown size={16} />
          </Link>
        </div>
        <div className="hero-signature hero-atelier-note" data-reveal>
          <span>01</span>
          <span>Seu tempo aqui é bem usado.</span>
        </div>
      </div>
      <div className="hero-meta" aria-label="Serviços disponíveis">
        <span>CORTE</span><i /> <span>BARBA</span><i /> <span>RITUAL PRIME</span>
      </div>
      <Link
        className="scroll-hint"
        href="#servicos"
        aria-label="Explorar serviços"
      >
        <ArrowDown size={16} />
        <span>CONHEÇA A BARBER PRIME</span>
      </Link>
      <div className="hero-atelier-side" aria-hidden="true">BARBER PRIME / 21° SUL</div>
    </section>
  );
}
