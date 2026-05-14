import mongoose, { Schema } from "mongoose";

export type ProjectRequestStatus = "pending" | "in-progress" | "completed" | "cancelled";

export interface ProjectRequestDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  title: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
  status: ProjectRequestStatus;
  adminNote?: string;
}

const projectRequestSchema = new Schema<ProjectRequestDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    projectType: { type: String, required: true, trim: true },
    budget: { type: String, required: true, trim: true },
    timeline: { type: String, required: true, trim: true },
    details: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    adminNote: { type: String, trim: true },
  },
  { timestamps: true },
);

export const ProjectRequest =
  (mongoose.models.ProjectRequest as mongoose.Model<ProjectRequestDocument>) ||
  mongoose.model<ProjectRequestDocument>("ProjectRequest", projectRequestSchema);
