import { Schema, models, model } from "mongoose";
const schema = new Schema(
  { name: String, email: String, whatsapp: String, message: String },
  { timestamps: true },
);
export default models.Contact || model("Contact", schema);
