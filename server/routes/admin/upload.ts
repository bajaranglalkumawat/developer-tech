import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { requireAuth } from "../../middleware/auth";

const router = Router();
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only images are allowed"));
    cb(null, true);
  },
});

router.post("/", requireAuth, upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: "File upload failed" });
    return;
  }

  res.status(201).json({ url: `/uploads/${file.filename}`, name: file.filename, size: file.size });
});

router.get("/library", requireAuth, (_req, res) => {
  const files = fs
    .readdirSync(uploadDir)
    .map((name) => {
      const stat = fs.statSync(path.join(uploadDir, name));
      return { name, url: `/uploads/${name}`, createdAt: stat.birthtime };
    })
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

  res.json({ items: files });
});

export default router;
