import { RequestHandler } from "express";
import { z, ZodTypeAny } from "zod";

export function validateBody<T extends ZodTypeAny>(schema: T): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten() });
      return;
    }
    req.body = parsed.data;
    next();
  };
}

export { z };
