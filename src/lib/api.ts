import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import { verifyToken, cookieName } from "./auth";
export async function protect() {
  if (!(await verifyToken((await cookies()).get(cookieName)?.value || "")))
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}
export function failure(e: unknown) {
  if (e instanceof ZodError)
    return NextResponse.json({ error: e.issues[0].message }, { status: 400 });
  if (e instanceof SyntaxError)
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  if (typeof e === "object" && e !== null && "code" in e && e.code === 11000)
    return NextResponse.json(
      { error: "Registro duplicado ou horário indisponível." },
      { status: 409 },
    );
  return NextResponse.json(
    { error: "Serviço indisponível. Tente novamente ou fale pelo WhatsApp." },
    { status: 503 },
  );
}
export function sameOrigin(req: Request) {
  return (
    !req.headers.get("origin") ||
    req.headers.get("origin") === new URL(req.url).origin
  );
}
