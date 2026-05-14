import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminBlogs = () => {
  const [q, setQ] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-blogs", q],
    queryFn: () => apiFetch<any>(`/api/blogs?q=${encodeURIComponent(q)}`),
  });

  const del = useMutation({
    mutationFn: (id: string) => apiFetch(`/api/blogs/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Blog deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link to="/admin/blog/create"><Button>Create Blog</Button></Link>
      </div>
      <Input placeholder="Search blogs" value={q} onChange={(e) => setQ(e.target.value)} />
      {isLoading ? <div className="animate-pulse">Loading blogs...</div> : (
        <div className="space-y-3">
          {data.items.map((post: any) => (
            <div key={post._id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
              <div><p className="font-semibold">{post.title}</p><p className="text-sm text-muted-foreground">/{post.slug}</p></div>
              <div className="flex gap-2">
                <Link to={`/admin/blog/create?id=${post._id}`}><Button variant="outline">Edit</Button></Link>
                <Button variant="destructive" onClick={() => del.mutate(post._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
