import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { protect, failure, sameOrigin } from "@/lib/api";
import { serviceSchema } from "@/lib/validation";
import Service from "@/models/Service";
import { services } from "@/data/services";
export async function GET(req: Request) {
  const admin = new URL(req.url).searchParams.get("all") === "1";
  if (admin) {
    const denied = await protect();
    if (denied) return denied;
  }
  try {
    await db();
    return NextResponse.json(
      await Service.find(admin ? {} : { active: true }).lean(),
    );
  } catch (e) {
    if (admin) return failure(e);
    return NextResponse.json(services, {
      headers: { "X-Data-Source": "demo" },
    });
  }
}
export async function POST(req: Request) {
  const denied = await protect();
  if (denied) return denied;
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  try {
    const data = serviceSchema.parse(await req.json());
    await db();
    return NextResponse.json(await Service.create(data), { status: 201 });
  } catch (e) {
    return failure(e);
  }
}
