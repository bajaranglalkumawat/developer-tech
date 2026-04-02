import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { handleDemo } from "./routes/demo";
import { handleQuerySubmit } from "./routes/query";

dotenv.config();

export function createServer() {
  const app = express();
  const spaDir = path.join(process.cwd(), "dist", "spa");

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(spaDir, { extensions: ["html"] }));

  app.get("/robots.txt", (_req, res) => {
    res.sendFile(path.join(spaDir, "robots.txt"));
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.sendFile(path.join(spaDir, "sitemap.xml"));
  });

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
