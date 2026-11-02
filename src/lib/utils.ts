export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const whatsapp = (
  message = "Olá! Gostaria de agendar um horário na BARBER PRIME.",
) =>
  "https://wa.me/" +
  (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5535999999999") +
  "?text=" +
  encodeURIComponent(message);
export const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
