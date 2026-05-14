import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { ContactInquiry } from "../../models/ContactInquiry";
import { toCsv } from "../../utils/csv";

const router = Router();
const ContactModel = ContactInquiry as any;

router.get("/", requireAuth, async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);
  const skip = (page - 1) * limit;
  const items = await ContactModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  const total = await ContactModel.countDocuments();
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

router.patch("/:id/read", requireAuth, async (req, res) => {
  const updated = await ContactModel.findByIdAndUpdate(
    req.params.id,
    { isRead: Boolean(req.body.isRead) },
    { new: true },
  );
  if (!updated) {
    res.status(404).json({ message: "Inquiry not found" });
    return;
  }
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await ContactModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Inquiry not found" });
    return;
  }
  res.status(204).send();
});

router.get("/export/csv", requireAuth, async (_req, res) => {
  const records = await ContactModel.find().sort({ createdAt: -1 }).lean();
  const csv = toCsv(
    records.map((record) => ({
      Name: record.name,
      Email: record.email,
      Phone: record.phone ?? "",
      Message: record.message,
      ServiceType: record.serviceType,
      Read: record.isRead ? "Yes" : "No",
      Date: new Date(record.createdAt).toISOString(),
    })),
  );

  res.header("Content-Type", "text/csv");
  res.attachment("contact-inquiries.csv");
  res.send(csv);
});

export default router;
