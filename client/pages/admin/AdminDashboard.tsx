import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/admin-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => apiFetch<any>("/api/admin/dashboard/stats"),
  });

  if (isLoading) return <div className="animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card><CardHeader><CardTitle>Total Blogs</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{data.analytics.totalBlogs}</CardContent></Card>
        <Card><CardHeader><CardTitle>Total Contacts</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{data.analytics.totalContacts}</CardContent></Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Recent Blog Posts</CardTitle></CardHeader><CardContent className="space-y-2">{data.recentBlogs.map((item: any) => <p key={item._id}>{item.title}</p>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Recent Inquiries</CardTitle></CardHeader><CardContent className="space-y-2">{data.recentContacts.map((item: any) => <p key={item._id}>{item.name} - {item.serviceType}</p>)}</CardContent></Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
