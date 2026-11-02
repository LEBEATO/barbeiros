import mongoose from "mongoose";
import { hash } from "bcryptjs";
import { db } from "../src/lib/db";
import { requiredEnv } from "../src/lib/env";
import User from "../src/models/User";
import Service from "../src/models/Service";
import Appointment from "../src/models/Appointment";
import { services } from "../src/data/services";
async function seed() {
  await db();
  const password = requiredEnv("ADMIN_PASSWORD");
  if (password === "troque-esta-senha" || password.length < 12)
    throw new Error("Senha deve ter 12 caracteres ou mais");
  await User.updateOne(
    { email: requiredEnv("ADMIN_EMAIL").toLowerCase() },
    {
      $setOnInsert: {
        name: "Administrador",
        passwordHash: await hash(password, 12),
        role: "admin",
      },
    },
    { upsert: true },
  );
  for (const service of services) {
    const { name, slug, description, duration, price, active } = service;
    await Service.updateOne(
      { slug },
      { $setOnInsert: { name, slug, description, duration, price, active } },
      { upsert: true },
    );
  }
  await Appointment.init();
  console.log("Seed concluído.");
}
seed()
  .catch(() => {
    console.error("Verifique as variáveis e a conexão Atlas.");
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
