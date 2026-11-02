import { z } from "zod";
import { today } from "./utils";
export const serviceSchema = z.object({
  name: z.string().trim().min(3).max(100),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .max(100),
  description: z.string().trim().min(10).max(500),
  duration: z.number().int().min(10).max(240),
  price: z.number().min(0).max(10000),
  active: z.boolean(),
});
export const bookingSchema = z
  .object({
    customerName: z
      .string()
      .trim()
      .min(3, "Informe seu nome completo")
      .max(100),
    whatsapp: z.string().regex(/^[+\d ()-]{10,20}$/, "WhatsApp inválido"),
    email: z.union([z.email(), z.literal("")]).optional(),
    serviceId: z.string().min(1, "Selecione um serviço"),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((v) => v >= today(), "Escolha uma data futura"),
    time: z.string().regex(/^(09|10|11|12|13|14|15|16|17|18):[03]0$/),
    notes: z.string().max(1000).optional(),
  })
  .refine(
    (v) => {
      const d = new Date(v.date + "T" + v.time + ":00-03:00");
      return (
        !Number.isNaN(d.valueOf()) &&
        d > new Date() &&
        d.toISOString().slice(0, 10) === v.date
      );
    },
    { message: "Data e horário devem estar no futuro", path: ["date"] },
  );
export const contactSchema = z.object({
  name: z.string().trim().min(3).max(100),
  email: z.email(),
  whatsapp: z.string().max(20).optional(),
  message: z.string().trim().min(10).max(2000),
});
