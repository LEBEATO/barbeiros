"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function useGsapReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", ref.current)
          .forEach((el) => {
            gsap.from(el, {
              y: 20,
              opacity: 0,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 93%", once: true },
            });
          });
      });
    }, ref);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);
  return ref;
}
