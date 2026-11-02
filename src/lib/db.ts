import mongoose from "mongoose";
import { requiredEnv } from "./env";
let connection: Promise<typeof mongoose> | undefined;
export async function db() {
  if (!connection)
    connection = mongoose
      .connect(requiredEnv("MONGODB_URI"), { serverSelectionTimeoutMS: 5000 })
      .catch((e) => {
        connection = undefined;
        throw e;
      });
  return connection;
}
