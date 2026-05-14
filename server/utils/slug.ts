import slugify from "slugify";

export function createSlug(text: string) {
  return slugify(text, { lower: true, strict: true, trim: true });
}
