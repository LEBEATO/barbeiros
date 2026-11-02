import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { protect, failure, sameOrigin } from "@/lib/api";
import { isValidObjectId } from "mongoose";
import { z } from "zod";
import Appointment from "@/models/Appointment";
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await protect();
  if (denied) return denied;
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) return new NextResponse(null, { status: 400 });
    const data = z
      .object({ status: z.enum(["confirmed", "completed", "cancelled"]) })
      .parse(await req.json());
    await db();
    const item = await Appointment.findById(id);
    if (!item) return new NextResponse(null, { status: 404 });
    if (["completed", "cancelled"].includes(item.status))
      return NextResponse.json(
        { error: "Agendamento encerrado." },
        { status: 409 },
      );
    item.status = data.status;
    await item.save();
    return NextResponse.json(item);
  } catch (e) {
    return failure(e);
  }
}
