import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export async function connectDb() {
  if (isConnected) return;
  await mongoose.connect(env.MONGODB_URI);
  isConnected = true;
}
