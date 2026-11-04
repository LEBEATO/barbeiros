"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Ellipsis, Home, LockKeyhole, MapPin, MessageCircle, Scissors, X } from "lucide-react";
import { whatsapp } from "@/lib/utils";

const items = [
  { label: "Início", href: "#inicio", Icon: Home },
  { label: "Serviços", href: "#servicos", Icon: Scissors },
  { label: "Agendar", href: "#agendamento", Icon: CalendarDays, primary: true },
];

export default function MobileBottomNav() {
  const [open, setOpen] = useState(false);
  const moreButton = useRef<HTMLButtonElement>(null);
  const firstOption = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstOption.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        moreButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      {open && (
        <>
          <button
            type="button"
            className="mobile-more-backdrop"
            aria-label="Fechar menu de opções"
            onClick={() => setOpen(false)}
          />
          <div className="mobile-more-menu" id="mobile-more-menu" aria-label="Mais opções">
            <div className="mobile-more-heading">
              <strong>Mais opções</strong>
              <button type="button" aria-label="Fechar menu" onClick={() => { setOpen(false); moreButton.current?.focus(); }}>
                <X size={20} />
              </button>
            </div>
            <Link ref={firstOption} href="#agendamento" onClick={() => setOpen(false)}>
              <MapPin size={20} /> Agendamento e contato
            </Link>
            <a href={whatsapp("Olá! Gostaria de falar com a barbearia.")} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              <MessageCircle size={20} /> WhatsApp
            </a>
            <Link href="/admin" onClick={() => setOpen(false)}>
              <LockKeyhole size={20} /> Área do barbeiro
            </Link>
          </div>
        </>
      )}
      <nav className="mobile-bottom-nav" aria-label="Navegação rápida">
        {items.map(({ label, href, Icon, primary }) => (
          <Link key={label} href={href} className={primary ? "mobile-nav-item primary" : "mobile-nav-item"} onClick={() => setOpen(false)}>
            <Icon size={primary ? 21 : 19} strokeWidth={primary ? 2.5 : 2} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
        <button
          ref={moreButton}
          type="button"
          className="mobile-nav-item"
          aria-expanded={open}
          aria-controls="mobile-more-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <Ellipsis size={22} aria-hidden="true" />
          <span>Mais</span>
        </button>
      </nav>
    </>
  );
}
