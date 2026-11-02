"use client";
import { useState } from "react";
import { Scissors, Armchair, UserRound, Expand, Combine } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Modal from "@/components/ui/Modal";
import { gallery } from "@/data/gallery";
const icons = [Scissors, UserRound, Combine, Armchair];
export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <section id="galeria" className="section">
      <div className="container">
        <div data-reveal className="section-heading">
          <SectionTitle
            eyebrow="03 / NOSSA GALERIA"
            title="Estilo que fala por si."
          />
          <p>
            Cada detalhe conta uma história.
            <br />A próxima pode ser a sua.
          </p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, i) => {
            const Icon = icons[i];
            return (
              <button
                key={item.title}
                className={"gallery-item gallery-" + i}
                onClick={() => setIndex(i)}
                aria-label={"Ampliar " + item.title}
                data-reveal
              >
                <Icon className="gallery-icon" strokeWidth={0.5} />
                <span className="gallery-expand">
                  <Expand size={16} />
                </span>
                <div>
                  <small>{item.category}</small>
                  <h3>{item.title}</h3>
                </div>
              </button>
            );
          })}
        </div>
        <p className="demo-note">
          Galeria conceitual · espaços preparados para suas fotografias.
        </p>
      </div>
      {index !== null && (
        <Modal title={gallery[index].title} onClose={() => setIndex(null)}>
          <div className={"gallery-preview gallery-" + index}>
            {(() => {
              const Icon = icons[index];
              return <Icon size={180} strokeWidth={0.5} />;
            })()}
          </div>
          <p className="demo-note">
            Imagem ilustrativa. Adicione as fotos reais em
            public/images/gallery.
          </p>
        </Modal>
      )}
    </section>
  );
}
