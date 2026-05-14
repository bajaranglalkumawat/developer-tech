import mongoose, { Schema } from "mongoose";

export interface BlogDocument extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  authorName: string;
}

const blogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    metaTitle: { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    authorName: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

blogSchema.index({ title: "text", excerpt: "text", tags: "text", category: "text" });

export const Blog = (mongoose.models.Blog as mongoose.Model<BlogDocument>) || mongoose.model<BlogDocument>("Blog", blogSchema);

