import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiFetch } from "@/lib/admin-api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminBlogCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = new URLSearchParams(location.search).get("id");
  const [form, setForm] = useState<any>({ title: "", excerpt: "", content: "", metaTitle: "", metaDescription: "", category: "", tags: "", featuredImage: "", isPublished: false });

  useEffect(() => {
    if (!blogId) return;
    apiFetch<any>("/api/blogs").then((result) => {
      const found = result.items.find((item: any) => item._id === blogId);
      if (found) setForm({ ...found, tags: found.tags.join(", ") });
    });
  }, [blogId]);

  const uploadImage = async (file?: File) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const data = await apiFetch<{ url: string }>("/api/admin/upload", { method: "POST", body: fd });
    setForm((prev: any) => ({ ...prev, featuredImage: data.url }));
    toast.success("Image uploaded");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...form, tags: String(form.tags).split(",").map((t) => t.trim()).filter(Boolean) };
    if (blogId) {
      await apiFetch(`/api/blogs/${blogId}`, { method: "PUT", body: JSON.stringify(payload) });
      toast.success("Blog updated");
    } else {
      await apiFetch("/api/blogs", { method: "POST", body: JSON.stringify(payload) });
      toast.success("Blog created");
    }
    navigate("/admin/blogs");
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <h1 className="text-2xl font-bold">{blogId ? "Edit Blog" : "Create Blog"}</h1>
      <Input placeholder="Title" value={form.title} onChange={(e) => setForm((p: any) => ({ ...p, title: e.target.value }))} required />
      <Textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm((p: any) => ({ ...p, excerpt: e.target.value }))} required />
      <ReactQuill value={form.content} onChange={(value) => setForm((p: any) => ({ ...p, content: value }))} />
      <Input placeholder="Meta title" value={form.metaTitle} onChange={(e) => setForm((p: any) => ({ ...p, metaTitle: e.target.value }))} required />
      <Textarea placeholder="Meta description" value={form.metaDescription} onChange={(e) => setForm((p: any) => ({ ...p, metaDescription: e.target.value }))} required />
      <Input placeholder="Category" value={form.category} onChange={(e) => setForm((p: any) => ({ ...p, category: e.target.value }))} required />
      <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm((p: any) => ({ ...p, tags: e.target.value }))} />
      <Input placeholder="Featured Image URL" value={form.featuredImage} onChange={(e) => setForm((p: any) => ({ ...p, featuredImage: e.target.value }))} />
      <Input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((p: any) => ({ ...p, isPublished: e.target.checked }))} /> Publish now</label>
      <Button>{blogId ? "Update" : "Create"} Blog</Button>
    </form>
  );
};

export default AdminBlogCreate;
