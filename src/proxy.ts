import { NextRequest, NextResponse } from "next/server";
import { verifyToken, cookieName } from "@/lib/auth";
export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (!(await verifyToken(req.cookies.get(cookieName)?.value || "")))
    return NextResponse.redirect(new URL("/admin/login", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
