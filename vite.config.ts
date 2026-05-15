import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer as createApiServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [path.resolve(__dirname)],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
  },

  build: {
    outDir: "dist/spa",
    target: "es2018",

    // chunk warning limit
    chunkSizeWarningLimit: 1000,
  },

  plugins: [
    react(),

    // only run express middleware in development
    process.env.NODE_ENV !== "production" && {
      name: "express-api-middleware",
      configureServer(server) {
        server.middlewares.use(createApiServer());
      },
    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});