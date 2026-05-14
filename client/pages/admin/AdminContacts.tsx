import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";

const AdminContacts = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-contacts"], queryFn: () => apiFetch<any>("/api/admin/contacts") });

  const mark = useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) =>
      apiFetch(`/api/admin/contacts/${id}/read`, { method: "PATCH", body: JSON.stringify({ isRead }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
  });

  const del = useMutation({
    mutationFn: (id: string) => apiFetch(`/api/admin/contacts/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
  });

  if (isLoading) return <div className="animate-pulse">Loading inquiries...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact Inquiries</h1>
        <a href="/api/admin/contacts/export/csv" target="_blank" rel="noreferrer"><Button variant="outline">Export CSV</Button></a>
      </div>
      {data.items.map((item: any) => (
        <div key={item._id} className="rounded-lg border p-3">
          <p className="font-semibold">{item.name} ({item.email})</p>
          <p className="text-sm">{item.serviceType}</p>
          <p className="mt-2 text-sm text-muted-foreground">{item.message}</p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" onClick={() => mark.mutate({ id: item._id, isRead: !item.isRead })}>{item.isRead ? "Mark unread" : "Mark read"}</Button>
            <Button variant="destructive" onClick={() => del.mutate(item._id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminContacts;
