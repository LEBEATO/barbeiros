import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "BARBER PRIME | Seu estilo começa aqui",
  description:
    "Cortes precisos, barba impecável e uma experiência feita para você.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
