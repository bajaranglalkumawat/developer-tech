export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Blog {
  _id: string;
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
  publishedAt?: string;
  createdAt: string;
}

export interface ContactInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType: string;
  isRead: boolean;
  createdAt: string;
}
