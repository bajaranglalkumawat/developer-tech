import { Router } from "express";
import { AdminUser } from "../../models/AdminUser";
import { signToken } from "../../utils/jwt";
import { validateBody, z } from "../../middleware/validate";
import { env } from "../../config/env";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/login", validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminUser.findOne({ email: email.toLowerCase() });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = signToken({ userId: String(user._id), email: user.email, role: user.role });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
});

router.post("/bootstrap", async (_req, res) => {
  const existing = await AdminUser.countDocuments();
  if (existing > 0) {
    res.status(409).json({ message: "Admin already initialized" });
    return;
  }

  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    res.status(400).json({ message: "ADMIN_EMAIL and ADMIN_PASSWORD are required in environment" });
    return;
  }

  const admin = await AdminUser.create({
    email: env.ADMIN_EMAIL.toLowerCase(),
    password: env.ADMIN_PASSWORD,
    name: "Developer Tech Admin",
    role: "superadmin",
  });

  res.status(201).json({ id: admin._id, email: admin.email });
});

export default router;
