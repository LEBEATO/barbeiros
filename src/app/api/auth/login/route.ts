import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { failure, sameOrigin } from "@/lib/api";
import { signToken, cookieName } from "@/lib/auth";
import User from "@/models/User";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  try {
    const data = z
      .object({
        email: z.email().max(200),
        password: z.string().min(1).max(128),
      })
      .parse(await req.json());
    await db();
    const user = await User.findOne({
      email: data.email.toLowerCase(),
      role: "admin",
    });
    if (!user || !(await compare(data.password, user.passwordHash)))
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    const res = NextResponse.json({ success: true });
    res.cookies.set(cookieName, await signToken(String(user._id)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 28800,
    });
    return res;
  } catch (e) {
    return failure(e);
  }
}
