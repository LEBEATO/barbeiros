import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/lib/utils";
export default function WhatsAppButton() {
  return (
    <Link
      className="floating-wa"
      href={whatsapp()}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
    >
      <MessageCircle size={23} />
    </Link>
  );
}
