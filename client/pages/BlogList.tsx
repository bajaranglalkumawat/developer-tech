import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const BlogList = () => {
  const { data, isLoading } = useQuery({ queryKey: ["public-blogs"], queryFn: async () => (await fetch("/api/blogs/public")).json() });

  return (
    <main className="mx-auto max-w-4xl p-4">
      <SEO title="Blog | Developer Tech" description="Latest Developer Tech insights and guides." keywords="developer blog, web development" canonical="https://developertech.in/blog" type="website" />
      <div className="mb-8 space-y-2 animate-fade-in">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-500">Blog</p>
        <h1 className="text-3xl font-semibold text-slate-950">Latest Posts</h1>
        <p className="max-w-xl text-sm leading-6 text-slate-600">Quick, actionable web development stories with clean design and compact summaries.</p>
      </div>
      {isLoading ? (
        <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">Loading posts...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.items.map((post: any) => (
            <article key={post._id} className="animate-slide-up group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              {post.featuredImage ? (
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <div className="h-44 bg-slate-100" />
              )}
              <div className="space-y-3 p-4">
                <h2 className="text-lg font-semibold text-slate-950 leading-6">{post.title}</h2>
                <p className="text-sm leading-6 text-slate-600 max-h-20 overflow-hidden">{post.excerpt}</p>
                <div className="flex items-center justify-between gap-2 pt-2">
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Read</span>
                  <Link to={`/blog/${post.slug}`} className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800">
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default BlogList;
