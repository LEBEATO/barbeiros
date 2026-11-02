import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { protect, failure, sameOrigin } from "@/lib/api";
import { isValidObjectId } from "mongoose";
import { serviceSchema } from "@/lib/validation";
import Service from "@/models/Service";
async function change(
  req: Request,
  params: Promise<{ id: string }>,
  remove = false,
) {
  const denied = await protect();
  if (denied) return denied;
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) return new NextResponse(null, { status: 400 });
    const data = remove ? undefined : serviceSchema.parse(await req.json());
    await db();
    const item = remove
      ? await Service.findByIdAndDelete(id)
      : await Service.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        });
    return item
      ? NextResponse.json(item)
      : new NextResponse(null, { status: 404 });
  } catch (e) {
    return failure(e);
  }
}
export function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return change(req, params);
}
export function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return change(req, params, true);
}
