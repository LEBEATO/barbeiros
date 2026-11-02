"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scissors, ArrowLeft, LockKeyhole } from "lucide-react";
export default function Login() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <main className="login-page">
      <Link href="/" className="login-back">
        <ArrowLeft size={16} /> Voltar ao site
      </Link>
      <div className="login-card">
        <div className="login-logo">
          <Scissors size={36} />
          <span>
            BARBER <b>PRIME</b>
          </span>
        </div>
        <span className="eyebrow">ÁREA ADMINISTRATIVA</span>
        <h1>Bem-vindo de volta.</h1>
        <p>Acesse para cuidar do seu negócio.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            const data = new FormData(e.currentTarget);
            try {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.get("email"),
                  password: data.get("password"),
                }),
              });
              if (res.ok) {
                router.replace("/admin/dashboard");
                router.refresh();
              } else setError((await res.json()).error);
            } catch {
              setError("Falha de conexão. Tente novamente.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <label>
            E-mail
            <input
              name="email"
              required
              type="email"
              autoComplete="username"
              placeholder="admin@barberprime.com"
            />
          </label>
          <label>
            Senha
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Sua senha"
            />
          </label>
          <button className="button" disabled={busy}>
            {busy ? "Entrando..." : "Entrar no painel"}{" "}
            <LockKeyhole size={16} />
          </button>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </form>
        <small>Acesso exclusivo à administração.</small>
      </div>
    </main>
  );
}
