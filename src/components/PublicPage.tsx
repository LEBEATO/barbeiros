"use client";
import { useEffect, useState } from "react";
import { services as initial } from "@/data/services";
import { ServiceData } from "@/types";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Experience from "./sections/Experience";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Booking from "./sections/Booking";
import Contact from "./sections/Contact";
export default function PublicPage({ video }: { video: boolean }) {
  const [services, setServices] = useState<ServiceData[]>(initial);
  const ref = useGsapReveal();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/services", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return (
    <main id="conteudo" ref={ref}>
      <Hero video={video} />
      <div className="ticker">
        <span>PRECISÃO NO CORTE</span>
        <i>✦</i>
        <span>PERSONALIDADE NO ESTILO</span>
        <i>✦</i>
        <span>EXCELÊNCIA NO CUIDADO</span>
        <i>✦</i>
        <span>BARBER PRIME</span>
      </div>
      <Services services={services} />
      <Experience />
      <Gallery />
      <Testimonials />
      <Booking services={services} />
      <Contact />
    </main>
  );
}
