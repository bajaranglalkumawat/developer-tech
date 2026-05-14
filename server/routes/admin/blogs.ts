import { Router } from "express";
import { Blog } from "../../models/Blog";
import { requireAuth } from "../../middleware/auth";
import { validateBody, z } from "../../middleware/validate";
import { createSlug } from "../../utils/slug";

const router = Router();

const blogSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  featuredImage: z.string().optional(),
  metaTitle: z.string().min(3),
  metaDescription: z.string().min(10),
  category: z.string().min(2),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
});

router.get("/public", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const skip = (page - 1) * limit;
  const posts = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean();
  const total = await Blog.countDocuments({ isPublished: true });
  res.json({ items: posts, total, page, pages: Math.ceil(total / limit) });
});

router.get("/public/:slug", async (req, res) => {
  const post = await Blog.findOne({ slug: req.params.slug, isPublished: true }).lean();
  if (!post) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  res.json(post);
});

router.get("/", requireAuth, async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const skip = (page - 1) * limit;
  const query = q ? { $text: { $search: q } } : {};
  const items = await Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  const total = await Blog.countDocuments(query);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

router.post("/", requireAuth, validateBody(blogSchema), async (req, res) => {
  const slug = createSlug(req.body.title);
  const exists = await Blog.findOne({ slug });
  if (exists) {
    res.status(409).json({ message: "A blog with same title already exists" });
    return;
  }

  const post = await Blog.create({
    ...req.body,
    slug,
    authorName: req.user?.email,
    publishedAt: req.body.isPublished ? new Date() : undefined,
  });

  res.status(201).json(post);
});

router.put("/:id", requireAuth, validateBody(blogSchema), async (req, res) => {
  const slug = createSlug(req.body.title);
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      slug,
      publishedAt: req.body.isPublished ? new Date() : undefined,
    },
    { new: true },
  );

  if (!updated) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await Blog.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  res.status(204).send();
});

export default router;
