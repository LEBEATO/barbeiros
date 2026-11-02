import { ServiceData } from "@/types";
export const services: ServiceData[] = [
  {
    _id: "corte-masculino",
    slug: "corte-masculino",
    name: "Corte masculino",
    description:
      "Técnica, personalidade e um acabamento à altura do seu estilo.",
    duration: 40,
    price: 65,
    active: true,
  },
  {
    _id: "barba-completa",
    slug: "barba-completa",
    name: "Barba completa",
    description: "Toalha quente, desenho preciso e cuidado em cada detalhe.",
    duration: 30,
    price: 45,
    active: true,
  },
  {
    _id: "corte-barba",
    slug: "corte-barba",
    name: "Corte + barba",
    description: "O ritual completo. Seu visual em perfeita harmonia.",
    duration: 70,
    price: 100,
    active: true,
  },
  {
    _id: "acabamento",
    slug: "acabamento",
    name: "Acabamento",
    description: "Os pequenos detalhes que fazem toda a diferença.",
    duration: 20,
    price: 25,
    active: true,
  },
];
