import { Router } from "express";
import { validateBody, z } from "../middleware/validate";
import { ContactInquiry } from "../models/ContactInquiry";

const router = Router();
const ContactModel = ContactInquiry as any;

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  serviceType: z.string().min(2),
});

router.post("/", validateBody(contactSchema), async (req, res) => {
  const inquiry = await ContactModel.create(req.body);
  res.status(201).json({ success: true, inquiryId: inquiry._id });
});

export default router;
