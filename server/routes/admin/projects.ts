import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { validateBody, z } from "../../middleware/validate";
import { ProjectRequest } from "../../models/ProjectRequest";

const router = Router();
const ProjectRequestModel = ProjectRequest as any;

const updateSchema = z.object({
  status: z.enum(["pending", "in-progress", "completed", "cancelled"]),
  adminNote: z.string().trim().optional(),
});

router.get("/", requireAuth, async (req, res, next) => {
  try {
    if (req.user?.role !== "superadmin" && req.user?.role !== "editor") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 30);
    const status = String(req.query.status ?? "");
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const items = await ProjectRequestModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await ProjectRequestModel.countDocuments(filter);

    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", requireAuth, validateBody(updateSchema), async (req, res, next) => {
  try {
    if (req.user?.role !== "superadmin" && req.user?.role !== "editor") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const updated = await ProjectRequestModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Project request not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    if (req.user?.role !== "superadmin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const deleted = await ProjectRequestModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Project request not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
