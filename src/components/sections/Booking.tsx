import Link from "next/link";
import { CalendarDays, Clock, Check } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import BookingForm from "@/components/booking/BookingForm";
import { ServiceData } from "@/types";
import { whatsapp } from "@/lib/utils";
export default function Booking({ services }: { services: ServiceData[] }) {
  return (
    <section className="section" id="agendamento">
      <div className="container booking-grid">
        <div data-reveal>
          <SectionTitle
            eyebrow="05 / RESERVE SEU MOMENTO"
            title="Seu próximo capítulo começa na cadeira."
          >
            Escolha seu serviço, encontre o melhor horário e deixe o resto com a
            gente.
          </SectionTitle>
          <div className="booking-benefits">
            <span>
              <CalendarDays />
              Agendamento simples e rápido
            </span>
            <span>
              <Clock />
              Seu tempo respeitado
            </span>
            <span>
              <Check />
              Confirmação pela nossa equipe
            </span>
          </div>
          <p>Prefere conversar?</p>
          <Link href={whatsapp()} className="text-link gold">
            Agende pelo WhatsApp ↗
          </Link>
        </div>
        <div className="booking-panel" data-reveal>
          <h3>Vamos cuidar do seu estilo.</h3>
          <p>Preencha os dados abaixo para solicitar seu horário.</p>
          <BookingForm services={services} />
        </div>
      </div>
    </section>
  );
}
