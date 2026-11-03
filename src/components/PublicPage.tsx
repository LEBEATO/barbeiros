"use client";
import "@/app/atelier.css";
import "@/app/premium-redesign.css";
import "@/app/mobile-app.css";
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
import MobileBottomNav from "./layout/MobileBottomNav";
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
      <Services services={services} />
      <Experience />
      <Gallery />
      <Testimonials />
      <Booking services={services} />
      <Contact />
      <MobileBottomNav />
    </main>
  );
}
