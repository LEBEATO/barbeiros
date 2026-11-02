import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { failure } from "@/lib/api";
import { contactSchema } from "@/lib/validation";
import Contact from "@/models/Contact";
export async function POST(req: Request) {
  try {
    const data = contactSchema.parse(await req.json());
    await db();
    await Contact.create(data);
    return NextResponse.json(
      { message: "Mensagem recebida. Retornaremos em breve." },
      { status: 201 },
    );
  } catch (e) {
    return failure(e);
  }
}
