import SectionTitle from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/testimonials";
export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <SectionTitle
          eyebrow="04 / QUEM SENTA NA NOSSA CADEIRA"
          title="Confiança que se conquista."
        />
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <article data-reveal key={t.name}>
              <span className="stars" aria-label="5 estrelas">
                ★★★★★
              </span>
              <blockquote>“{t.text}”</blockquote>
              <div className="review-person">
                <span>{t.initials}</span>
                <div>
                  <b>{t.name}</b>
                  <small>{t.service}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="demo-note">
          Depoimentos fictícios para demonstração do layout.
        </p>
      </div>
    </section>
  );
}
