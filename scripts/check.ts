import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  bookingSchema,
  contactSchema,
  serviceSchema,
} from "../src/lib/validation";
import { signToken, verifyToken } from "../src/lib/auth";

async function check() {
  const booking = {
    customerName: "Cliente Exemplo",
    whatsapp: "(35) 99999-9999",
    email: "",
    serviceId: "corte-masculino",
    date: "2099-01-05",
    time: "10:00",
    notes: "",
  };
  assert.equal(bookingSchema.safeParse(booking).success, true);
  assert.equal(
    bookingSchema.safeParse({ ...booking, date: "2020-01-01" }).success,
    false,
  );
  assert.equal(
    bookingSchema.safeParse({ ...booking, date: "2099-02-31" }).success,
    false,
  );
  assert.equal(
    bookingSchema.safeParse({ ...booking, whatsapp: "abc" }).success,
    false,
  );
  assert.equal(
    bookingSchema.safeParse({ ...booking, time: "23:00" }).success,
    false,
  );
  assert.equal(
    bookingSchema.safeParse({ ...booking, email: "inválido" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      name: "Teste",
      email: "teste@exemplo.com",
      message: "Quero conhecer os serviços.",
    }).success,
    true,
  );
  assert.equal(
    contactSchema.safeParse({ name: "Teste", email: "inválido", message: "oi" })
      .success,
    false,
  );
  assert.equal(
    serviceSchema.safeParse({
      name: "Corte",
      slug: "corte",
      description: "Um corte completo.",
      duration: 40,
      price: -1,
      active: true,
    }).success,
    false,
  );
  const previous = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = randomBytes(48).toString("hex");
    const token = await signToken("test-admin");
    assert.equal(await verifyToken(token), true);
    assert.equal(await verifyToken(token + "invalid"), false);
    assert.equal(await verifyToken(""), false);
  } finally {
    if (previous === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previous;
  }
  console.log("12 verificações de validação e autenticação passaram.");
}
check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
