import { Scissors, ShieldCheck, Armchair, Coffee } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
export default function Experience() {
  return (
    <section className="section experience" id="experiencia">
      <div className="container experience-grid">
        <div className="experience-art" data-reveal>
          <div className="mirror">
            <Armchair size={140} strokeWidth={0.6} />
          </div>
          <span className="photo-caption">SEU MOMENTO DE PAUSA.</span>
          <div className="experience-stamp">
            <Scissors />
            <span>
              FEITO COM
              <br />
              <b>EXCELÊNCIA</b>
            </span>
          </div>
        </div>
        <div data-reveal>
          <SectionTitle
            eyebrow="02 / A EXPERIÊNCIA PRIME"
            title="Mais do que um corte."
          >
            <span>Um ritual de cuidado. Um momento só seu.</span>
          </SectionTitle>
          <p className="experience-copy">
            Acreditamos que um bom corte vai além do espelho. É sobre como você
            se sente ao sair da cadeira. Por isso, cada detalhe foi pensado para
            transformar sua visita em uma experiência.
          </p>
          <div className="perks">
            <span>
              <ShieldCheck />
              Precisão e atenção individual
            </span>
            <span>
              <Coffee />
              Café, conversa e um ambiente acolhedor
            </span>
          </div>
          <div className="stats">
            <div>
              <strong>+10</strong>
              <span>anos de experiência*</span>
            </div>
            <div>
              <strong>+5 mil</strong>
              <span>clientes atendidos*</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>atendimento premium*</span>
            </div>
          </div>
          <small className="demo-note">
            *Indicadores ilustrativos. Substitua pelos dados da barbearia.
          </small>
        </div>
      </div>
    </section>
  );
}
