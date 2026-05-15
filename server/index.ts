import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";
import { handleDemo } from "./routes/demo";
import { handleQuerySubmit } from "./routes/query";
import authRoutes from "./routes/admin/auth";
import blogRoutes from "./routes/admin/blogs";
import contactAdminRoutes from "./routes/admin/contacts";
import uploadRoutes from "./routes/admin/upload";
import dashboardRoutes from "./routes/admin/dashboard";
import projectAdminRoutes from "./routes/admin/projects";
import publicContactRoutes from "./routes/contact";
import projectRequestRoutes from "./routes/project-requests";
import userAuthRoutes from "./routes/user-auth";
import { generateSitemapXml } from "./utils/sitemap";

dotenv.config();

export function createServer() {
  const app = express();
  const spaDir = path.join(process.cwd(), "dist", "spa");
  const publicDir = path.join(process.cwd(), "public");

  app.disable("x-powered-by");
  app.use(cors());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(mongoSanitize());
  app.use(xss());

  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use("/uploads", express.static(path.join(publicDir, "uploads")));
  app.use(express.static(spaDir, { extensions: ["html"] }));

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\nSitemap: ${env.SITE_URL}/sitemap.xml`);
  });

  app.get("/sitemap.xml", async (_req, res, next) => {
    try {
      const xml = await generateSitemapXml();
      res.type("application/xml").send(xml);
    } catch (error) {
      next(error);
    }
  });

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get("/api/ping", (_req, res) => {
    res.status(200).json({ message: process.env.PING_MESSAGE ?? "pong" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/query", handleQuerySubmit);

  app.use("/api/auth", authRoutes);
  app.use("/api/user-auth", userAuthRoutes);
  app.use("/api/project-requests", projectRequestRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/contacts", publicContactRoutes);
  app.use("/api/admin/contacts", contactAdminRoutes);
  app.use("/api/admin/projects", projectAdminRoutes);
  app.use("/api/admin/upload", uploadRoutes);
  app.use("/api/admin/dashboard", dashboardRoutes);

  app.use(errorHandler);

  return app;
}
