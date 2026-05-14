import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { Blog } from "../../models/Blog";
import { ContactInquiry } from "../../models/ContactInquiry";

const router = Router();
const BlogModel = Blog as any;
const ContactModel = ContactInquiry as any;

router.get("/stats", requireAuth, async (_req, res) => {
  const [blogCount, contactCount, recentBlogs, recentContacts] = await Promise.all([
    BlogModel.countDocuments(),
    ContactModel.countDocuments(),
    BlogModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    ContactModel.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  res.json({
    analytics: {
      totalBlogs: blogCount,
      totalContacts: contactCount,
    },
    recentBlogs,
    recentContacts,
  });
});

export default router;
