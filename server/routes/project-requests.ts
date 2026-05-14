import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody, z } from "../middleware/validate";
import { ProjectRequest } from "../models/ProjectRequest";
import { User } from "../models/User";

const router = Router();
const ProjectRequestModel = ProjectRequest as any;

const projectRequestSchema = z.object({
  title: z.string().trim().min(3, "Project title is required"),
  projectType: z.string().trim().min(2, "Project type is required"),
  budget: z.string().trim().min(1, "Budget is required"),
  timeline: z.string().trim().min(1, "Timeline is required"),
  details: z.string().trim().min(10, "Please share a few project details"),
});

router.get("/", requireAuth, async (req, res, next) => {
  try {
    if (req.user?.role !== "user") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const items = await ProjectRequestModel.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ items });
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAuth, validateBody(projectRequestSchema), async (req, res, next) => {
  try {
    if (req.user?.role !== "user") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const user = await User.findById(req.user.userId).lean();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const item = await ProjectRequestModel.create({
      userId: req.user.userId,
      name: user.name,
      email: user.email,
      ...req.body,
    });

    res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
});

export default router;
