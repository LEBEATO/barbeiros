import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { protect, failure } from "@/lib/api";
import { bookingSchema } from "@/lib/validation";
import Appointment from "@/models/Appointment";
import Service from "@/models/Service";
export async function GET() {
  const denied = await protect();
  if (denied) return denied;
  try {
    await db();
    return NextResponse.json(
      await Appointment.find().sort({ createdAt: -1 }).lean(),
    );
  } catch (e) {
    return failure(e);
  }
}
export async function POST(req: Request) {
  try {
    const data = bookingSchema.parse(await req.json());
    await db();
    const service = await Service.findOne({
      $or: [
        { slug: data.serviceId },
        ...(/^[a-f\d]{24}$/i.test(data.serviceId)
          ? [{ _id: data.serviceId }]
          : []),
      ],
      active: true,
    });
    if (!service)
      return NextResponse.json(
        { error: "Serviço indisponível." },
        { status: 400 },
      );
    const [h, m] = data.time.split(":").map(Number);
    const start = h * 60 + m;
    const slots = Array.from(
      { length: Math.ceil(service.duration / 10) },
      (_, i) => String(start + i * 10),
    );
    if (start + service.duration > 1140)
      return NextResponse.json(
        { error: "O serviço deve terminar até 19h." },
        { status: 400 },
      );
    await Appointment.init();
    const item = await Appointment.create({
      ...data,
      serviceId: service._id,
      serviceName: service.name,
      slots,
    });
    return NextResponse.json(
      {
        id: item.id,
        message: "Solicitação recebida! Aguarde nossa confirmação.",
      },
      { status: 201 },
    );
  } catch (e) {
    return failure(e);
  }
}
