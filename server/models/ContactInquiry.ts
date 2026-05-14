import mongoose, { Schema } from "mongoose";

export interface ContactInquiryDocument extends mongoose.Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType: string;
  isRead: boolean;
}

const contactInquirySchema = new Schema<ContactInquiryDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export const ContactInquiry =
  mongoose.models.ContactInquiry || mongoose.model<ContactInquiryDocument>("ContactInquiry", contactInquirySchema);

