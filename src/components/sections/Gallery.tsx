import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Scissors } from "lucide-react";

const styles = [
  { title: "Low Taper Fade", category: "CORTE", description: "Degradê baixo, laterais limpas e acabamento preciso.", image: "/images/styles/low-taper-fade.webp" },
  { title: "Textured Crop", category: "CORTE", description: "Textura no topo e fade suave para um visual moderno.", image: "/images/styles/textured-crop.webp" },
  { title: "Barba Completa", category: "BARBA", description: "Toalha quente, navalha e contorno definido para sua barba.", image: "/images/styles/barba-completa.webp" },
  { title: "Barba Alinhada", category: "BARBA", description: "Desenho de precisão para uma barba curta sempre em ordem.", image: "/images/styles/barba-alinhada.webp" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="style-showcase" aria-label="Estilos em destaque">
      <div className="container">
        <header className="style-showcase-head" data-reveal>
          <span className="app-eyebrow"><Scissors size={14} /> ESTILOS EM DESTAQUE</span>
          <div>
            <h2>Seu visual,<br /><em>do seu jeito.</em></h2>
            <p>Veja alguns dos cortes e cuidados de barba que você pode pedir na Barber Prime.</p>
          </div>
        </header>
        <div className="style-card-grid">
          {styles.map((style) => (
            <article key={style.title} className="style-card" data-reveal>
              <div className="style-card-image">
                <Image src={style.image} alt={`${style.title} realizado na Barber Prime`} fill sizes="(max-width: 700px) 100vw, 50vw" />
                <span className="style-card-category">{style.category}</span>
              </div>
              <div className="style-card-content">
                <h3>{style.title}</h3>
                <p>{style.description}</p>
                <Link href="#agendamento" className="style-card-link">Quero esse estilo <ArrowUpRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
