"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowDown, Star, Scissors } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { whatsapp } from "@/lib/utils";
const Scene = dynamic(() => import("@/components/three/Scene3D"), {
  ssr: false,
});
export default function Hero({ video }: { video: boolean }) {
  const desktop = useMediaQuery(
    "(min-width: 1000px) and (prefers-reduced-motion: no-preference) and (hover: hover)",
  );
  const capable =
    typeof navigator !== "undefined" &&
    navigator.hardwareConcurrency >= 4 &&
    !(navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
  return (
    <section className="hero" id="inicio">
      {video && (
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-art" aria-hidden="true">
        <div className="arch">
          <Scissors strokeWidth={0.5} />
          <span>EST. 2016</span>
        </div>
      </div>
      <div className="container hero-content">
        <div className="eyebrow" data-reveal>
          <i /> TRADIÇÃO NO CUIDADO. ATITUDE NO ESTILO.
        </div>
        <h1 data-reveal>
          Seu estilo
          <br />
          começa <em>aqui.</em>
        </h1>
        <p data-reveal>
          Cortes precisos, barba impecável e uma
          <br className="desktop-break" /> experiência feita para você.
        </p>
        <div className="hero-actions" data-reveal>
          <Link className="button" href={whatsapp()}>
            Agendar pelo WhatsApp <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href="#servicos">
            Conhecer serviços <ArrowDown size={16} />
          </Link>
        </div>
        <div className="hero-proof">
          <div className="stars">★★★★★</div>
          <span>Seu tempo. Seu estilo. Seu lugar.</span>
        </div>
      </div>
      <div className="hero-caption">
        <span>O CLÁSSICO NUNCA SAI DE ESTILO.</span>
        <b>01 — BARBER PRIME</b>
      </div>
      {desktop && capable && (
        <div className="hero-3d">
          <Scene />
        </div>
      )}
      <Link
        className="scroll-hint"
        href="#servicos"
        aria-label="Explorar serviços"
      >
        <ArrowDown size={16} />
        <span>EXPLORE A EXPERIÊNCIA</span>
      </Link>
      <div className="hero-rating">
        <Star size={15} />
        <span>CUIDADO QUE VOCÊ SENTE.</span>
      </div>
    </section>
  );
}
