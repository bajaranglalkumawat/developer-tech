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

  if (isLoading) return <div className="mx-auto max-w-5xl p-6 animate-pulse">Loading article...</div>;

  return (
    <main className="mx-auto max-w-4xl p-6">
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
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{data.category}</p>
      <article className="prose mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
};

export default BlogPost;
