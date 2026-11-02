"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Scissors,
  LayoutDashboard,
  CalendarDays,
  List,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
export default function AdminSidebar() {
  const router = useRouter();
  const path = usePathname();
  return (
    <aside className="admin-sidebar">
      <Link className="brand" href="/">
        <Scissors />
        <span>
          BARBER <b>PRIME</b>
          <small>PAINEL ADMINISTRATIVO</small>
        </span>
      </Link>
      <nav>
        {[
          ["dashboard", "Visão geral", LayoutDashboard],
          ["agendamentos", "Agendamentos", CalendarDays],
          ["servicos", "Serviços", List],
        ].map(([href, label, Icon]) => {
          const I = Icon as typeof Scissors;
          return (
            <Link
              key={String(href)}
              className={path.endsWith(String(href)) ? "active" : ""}
              href={"/admin/" + href}
            >
              <I size={18} />
              {String(label)}
            </Link>
          );
        })}
      </nav>
      <Link href="/">
        Ver site <ArrowUpRight size={16} />
      </Link>
      <button
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          router.replace("/admin/login");
          router.refresh();
        }}
      >
        <LogOut size={17} /> Sair da conta
      </button>
    </aside>
  );
}
