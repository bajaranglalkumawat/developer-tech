import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderKanban, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const statuses = ["pending", "in-progress", "completed", "cancelled"];

const AdminProjects = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => apiFetch<any>("/api/admin/projects"),
  });

  const update = useMutation({
    mutationFn: ({ id, status, adminNote }: { id: string; status: string; adminNote?: string }) =>
      apiFetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, adminNote }),
      }),
    onSuccess: () => {
      toast.success("Project updated");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });

  const del = useMutation({
    mutationFn: (id: string) => apiFetch(`/api/admin/projects/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });

  if (isLoading) return <div className="animate-pulse">Loading project requests...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Project Requests</h1>
          <p className="text-sm text-muted-foreground">
            Manage requests submitted from user dashboards.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
          {data.total ?? data.items.length} total
        </span>
      </div>

      {data.items.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No project requests yet.
        </div>
      ) : null}

      {data.items.map((item: any) => (
        <div key={item._id} className="rounded-lg border p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FolderKanban className="h-4 w-4 text-cyan-600" />
                <h2 className="font-bold">{item.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.name} ({item.email})
              </p>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                <span className="rounded-md bg-slate-50 px-3 py-2">Type: {item.projectType}</span>
                <span className="rounded-md bg-slate-50 px-3 py-2">Budget: {item.budget}</span>
                <span className="rounded-md bg-slate-50 px-3 py-2">Timeline: {item.timeline}</span>
              </div>
            </div>

            <div className="w-full md:w-48">
              <Select
                value={item.status}
                onValueChange={(status) =>
                  update.mutate({ id: item._id, status, adminNote: item.adminNote ?? "" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-line rounded-md bg-slate-50 p-3 text-sm">
            {item.details}
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
            <Textarea
              defaultValue={item.adminNote ?? ""}
              placeholder="Admin note for this request"
              onBlur={(event) =>
                update.mutate({
                  id: item._id,
                  status: item.status,
                  adminNote: event.currentTarget.value,
                })
              }
            />
            <Button
              variant="destructive"
              onClick={() => del.mutate(item._id)}
              className="md:self-start"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProjects;
