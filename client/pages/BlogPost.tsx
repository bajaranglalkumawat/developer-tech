import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["public-blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/public/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  if (isLoading) return <div className="mx-auto max-w-3xl p-4 animate-pulse">Loading article...</div>;

  return (
    <main className="mx-auto max-w-3xl p-4">
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        keywords={`${data.category}, ${data.tags.join(", ")}`}
        canonical={`https://developertech.in/blog/${data.slug}`}
        image={data.featuredImage ? `https://developertech.in${data.featuredImage}` : undefined}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: data.title,
          description: data.metaDescription,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          author: { "@type": "Person", name: data.authorName },
        }}
      />
      <div className="animate-slide-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-slate-950">{data.title}</h1>
          {data.featuredImage && (
            <img src={data.featuredImage} alt={data.title} className="w-full rounded-3xl object-cover" />
          )}
          {data.excerpt && <p className="text-base leading-7 text-slate-600">{data.excerpt}</p>}
        </div>
        <article className="prose prose-slate max-w-none pt-6 text-slate-700" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </main>
  );
};

export default BlogPost;
