import { NextResponse } from "next/server";
import { cookieName } from "@/lib/auth";
import { sameOrigin } from "@/lib/api";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  const res = NextResponse.json({ success: true });
  res.cookies.delete(cookieName);
  return res;
}
