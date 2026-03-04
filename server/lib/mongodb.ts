import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB_NAME,
  });

  isConnected = true;
}
