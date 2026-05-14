import { Router } from "express";
import { User } from "../models/User";
import { requireAuth } from "../middleware/auth";
import { validateBody, z } from "../middleware/validate";
import { signToken } from "../utils/jwt";

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function userResponse(user: { _id: unknown; email: string; name: string; status: string }) {
  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    status: user.status,
  };
}

router.post("/register", validateBody(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      res.status(409).json({ message: "Account already exists" });
      return;
    }

    const user = await User.create({ name, email: normalizedEmail, password });
    const token = signToken({ userId: String(user._id), email: user.email, role: "user" });

    res.status(201).json({ token, user: userResponse(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (user.status !== "active") {
      res.status(403).json({ message: "Account is disabled" });
      return;
    }

    const token = signToken({ userId: String(user._id), email: user.email, role: "user" });
    res.json({ token, user: userResponse(user) });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    if (req.user?.role !== "user") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ user: userResponse(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
