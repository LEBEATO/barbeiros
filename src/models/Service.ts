import { Schema, models, model } from "mongoose";
const schema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    description: String,
    duration: Number,
    price: Number,
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export default models.Service || model("Service", schema);
