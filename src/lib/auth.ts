import { SignJWT, jwtVerify } from "jose";
import { requiredEnv } from "./env";
export const cookieName = "barber_session";
const key = () => new TextEncoder().encode(requiredEnv("JWT_SECRET"));
export async function signToken(id: string) {
  if (requiredEnv("JWT_SECRET").length < 32) throw new Error("Segredo curto");
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(id)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(key());
}
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin" && !!payload.sub;
  } catch {
    return false;
  }
}
