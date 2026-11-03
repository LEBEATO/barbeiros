"use client";

import Link from "next/link";
import { CalendarDays, Home, Images, Scissors } from "lucide-react";

const items = [
  { label: "Início", href: "#inicio", Icon: Home },
  { label: "Serviços", href: "#servicos", Icon: Scissors },
  { label: "Agenda", href: "#agendamento", Icon: CalendarDays, primary: true },
  { label: "Galeria", href: "#galeria", Icon: Images },
];

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação rápida">
      {items.map(({ label, href, Icon, primary }) => (
        <Link key={label} href={href} className={primary ? "mobile-nav-item primary" : "mobile-nav-item"}>
          <Icon size={primary ? 21 : 19} strokeWidth={primary ? 2.5 : 2} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
