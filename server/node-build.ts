import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "./index";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "../spa");

// Serve static files and essential crawl files
app.use(express.static(distPath));

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").sendFile(path.join(distPath, "robots.txt"));
});

app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml").sendFile(path.join(distPath, "sitemap.xml"));
});

// Handle React Router - serve index.html for all non-API routes
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
