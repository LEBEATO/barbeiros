"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Scissors, Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
const links = [
  ["Início", "inicio"],
  ["Serviços", "servicos"],
  ["Experiência", "experiencia"],
  ["Galeria", "galeria"],
  ["Contato", "contato"],
];
export default function Header() {
  const menuRef = useRef<HTMLElement>(null);
  const mobile = useMediaQuery("(max-width: 850px)");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(scrollY > 20);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open || !mobile) return;
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.from(menuRef.current, {
          y: -8,
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
    });
    menuRef.current?.querySelector("a")?.focus();
    return () => ctx.revert();
  }, [open, mobile]);
  return (
    <header className={scrolled ? "header scrolled" : "header"}>
      <Link href="/#inicio" className="brand">
        <Scissors />
        <span>
          BARBER <b>PRIME</b>
          <small>BARBEARIA & ESTILO</small>
        </span>
      </Link>
      <nav
        ref={menuRef}
        id="mobile-navigation"
        inert={mobile && !open}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.getElementById("menu-toggle")?.focus();
          }
        }}
        className={open ? "nav open" : "nav"}
        aria-label="Principal"
      >
        {links.map(([label, id]) => (
          <Link key={id} href={"/#" + id} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/#agendamento" className="button header-book">
        Agendar horário <ArrowUpRight size={16} />
      </Link>
      <button
        id="menu-toggle"
        aria-controls="mobile-navigation"
        className="menu-toggle"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
