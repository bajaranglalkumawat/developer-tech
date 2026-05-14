import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface AdminUserDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: "superadmin" | "editor";
  comparePassword: (password: string) => Promise<boolean>;
}

const adminUserSchema = new Schema<AdminUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["superadmin", "editor"], default: "superadmin" },
  },
  { timestamps: true },
);

adminUserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminUserSchema.methods.comparePassword = function comparePassword(password: string) {
  return bcrypt.compare(password, this.password);
};

export const AdminUser = (mongoose.models.AdminUser as mongoose.Model<AdminUserDocument>) || mongoose.model<AdminUserDocument>("AdminUser", adminUserSchema);

