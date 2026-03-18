import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleDemo } from "./routes/demo";
import { handleQuerySubmit } from "./routes/query";

dotenv.config();

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get("/api/ping", (_req, res) => {
    res.status(200).json({ message: process.env.PING_MESSAGE ?? "pong" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/query", handleQuerySubmit);

  return app;
}
