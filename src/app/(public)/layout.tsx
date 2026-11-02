import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link className="skip" href="#conteudo">
        Pular para conteúdo
      </Link>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
