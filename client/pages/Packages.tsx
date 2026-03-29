import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Packages = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Packages | Developer Tech - Affordable Web Design Plans"
      description="Developer Tech offers affordable web design packages for freelancers and businesses, with ecommerce website development and custom web development services."
      keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
      canonical="https://www.developer-tech.com/packages"
    />

    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Affordable Web Design Packages</h1>
      <p className="mb-4">Our packages are created for startups, small businesses, and enterprises that need dependable web development services in India. These plans include responsive design, SEO-friendly architecture, and optional advanced features for ecommerce website development. We make upfront pricing and exact deliverables available so you can choose a tailored package without surprises.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Starter Package</h2>
      <p className="mb-4">Great for new brands, includes up to 5 pages, basic SEO, mobile optimization, and 2 weeks of support.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Growth Package</h2>
      <p className="mb-4">Includes dynamic content support, blog integration, speed optimization, and ecommerce store setup for small online shops.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Enterprise Package</h2>
      <p className="mb-4">For established organizations needing API integrations, multi-channel commerce, custom workflows, and dedicated support.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Book a Consultation</h2>
      <p className="mb-4">Need a custom quote? Use our <Link className="text-blue-600 underline" to="/contact">Contact</Link> page to schedule and we’ll evaluate your scope, including ecommerce website development, custom middleware, and data migrations.</p>

      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" alt="Pricing packages for web development" className="w-full rounded-lg" />
    </main>
  </div>
);

export default Packages;
