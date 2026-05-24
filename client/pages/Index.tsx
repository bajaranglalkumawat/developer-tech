import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Packages from "@/components/Packages";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Trust from "@/components/Trust";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import StatsProof from "@/components/StatsProof";

function BlogPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ["public-blogs-preview"],
    queryFn: async () => (await fetch("/api/blogs/public?page=1&limit=2")).json(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-400">From the blog</p>
          <h2 className="text-3xl font-bold">Read our latest short stories</h2>
          <p className="text-slate-400">Discover quick design and development tips from the Developer Tech team.</p>
        </div>
        {isLoading ? (
          <div className="animate-pulse rounded-3xl border border-white/10 bg-slate-900 p-8">Loading blog posts...</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {data?.items?.map((post: any) => (
              <article key={post._id} className="rounded-3xl border border-white/10 bg-slate-900 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_20px_60px_rgba(34,211,238,0.18)]">
                {post.featuredImage ? (
                  <div className="h-48 overflow-hidden rounded-t-3xl">
                    <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                ) : (
                  <div className="h-48 rounded-t-3xl bg-slate-800" />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300 max-h-20 overflow-hidden">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.24em] text-cyan-400">Blog</span>
                    <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-cyan-300 transition hover:text-white">
                      Read story →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-10">
          <Link to="/blog" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            View all blog posts
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <SEO
        title="Developer Tech | Website Developer in Jaipur"
        description="Affordable web design and full-stack web development from Jaipur. We build fast, SEO-friendly React and Express apps for businesses across India."
        keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
        canonical="https://developertech.in/"
      />
      <div className="min-h-screen bg-transparent">
        <Header />
        <main>
          <Hero />
          <StatsProof />
          <Services />
          <Team />
          <About />
          <Trust />
          <BlogPreview />
          <Packages />
          <Contact />
        </main>

        <footer className="bg-slate-950 px-4 py-16 text-slate-300 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="animate-slide-up">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fd4a53b0ff269456c929711c56b0aa51a%2F671a297411b946ff807e974cafd8f3eb?format=webp&width=800&height=1200"
                    alt="Developer Tech Logo"
                    className="h-12 w-12 rounded-2xl border border-cyan-300/40 object-cover"
                  />
                  <h3 className="text-2xl font-bold text-white">
                    Developer Tech
                  </h3>
                </div>
                <p className="text-slate-400">
                  Building modern, scalable web applications for your success
                </p>
                <p className="mt-2 text-slate-400">Location: Jaipur, India</p>
              </div>

              <div className="animate-slide-up animation-delay-100">
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: "Home", id: "home" },
                    { label: "Services", id: "services" },
                    { label: "About Us", id: "about" },
                    { label: "Team", id: "team" },
                    { label: "Packages", id: "packages" },
                    { label: "Blog", to: "/blog" },
                    { label: "Contact", id: "contact" },
                    { label: "Privacy Policy", to: "/privacy-policy" },
                    { label: "Terms & Conditions", to: "/terms-and-conditions" },
                  ].map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link to={item.to} className="transition-colors hover:text-cyan-300">
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() =>
                            document
                              .getElementById(item.id!)
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="transition-colors hover:text-cyan-300"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-slide-up animation-delay-200">
                <h4 className="mb-4 text-lg font-semibold text-white">
                  Tech Stack
                </h4>
                <ul className="space-y-2 text-slate-400">
                  <li>React.js</li>
                  <li>Node.js & Express</li>
                  <li>MongoDB</li>
                  <li>Tailwind CSS</li>
                  <li>Cloud Computing</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in border-t border-white/10 pt-8 text-center text-slate-500">
              Copyright 2024 Developer Tech. All rights reserved.
            </div>
          </div>
        </footer>

        <WhatsAppButton />
      </div>
    </>
  );
}
