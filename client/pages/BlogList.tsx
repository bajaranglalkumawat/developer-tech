import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const BlogList = () => {
  const { data, isLoading } = useQuery({ queryKey: ["public-blogs"], queryFn: async () => (await fetch("/api/blogs/public")).json() });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <SEO title="Blog | Developer Tech" description="Latest Developer Tech insights and guides." keywords="developer blog, web development" canonical="https://developertech.in/blog" type="website" />
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      {isLoading ? <div className="animate-pulse">Loading posts...</div> : (
        <div className="grid gap-4">
          {data.items.map((post: any) => (
            <article key={post._id} className="rounded-xl border p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{post.category}</p>
              <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <Link className="mt-3 inline-block text-sm font-semibold text-blue-600" to={`/blog/${post.slug}`}>Read article</Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default BlogList;
