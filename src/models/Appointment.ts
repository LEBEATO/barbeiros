import { Schema, models, model } from "mongoose";
const schema = new Schema(
  {
    customerName: String,
    whatsapp: String,
    email: String,
    serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
    serviceName: String,
    date: String,
    time: String,
    notes: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    slots: [String],
  },
  { timestamps: true },
);
schema.index(
  { date: 1, slots: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["pending", "confirmed", "completed"] },
    },
  },
);
export default models.Appointment || model("Appointment", schema);
