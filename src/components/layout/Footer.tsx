import Link from "next/link";
import { Scissors, Camera } from "lucide-react";
import { whatsapp } from "@/lib/utils";
export default function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <Link className="brand" href="#inicio">
          <Scissors />
          <span>
            BARBER <b>PRIME</b>
            <small>TRADIÇÃO NO CUIDADO. ATITUDE NO ESTILO.</small>
          </span>
        </Link>
        <div>
          <Link href="https://instagram.com" aria-label="Instagram (exemplo)">
            <Camera size={18} />
          </Link>
          <Link href={whatsapp()}>WhatsApp</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 BARBER PRIME. Todos os direitos reservados.</span>
        <Link href="/admin/login">Área administrativa ↗</Link>
      </div>
    </footer>
  );
}
