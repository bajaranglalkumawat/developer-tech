import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Services = () => (
  <div className="min-h-screen bg-gray-50">
    <SEO
      title="Services | Developer Tech - Website Developer in Jaipur"
      description="Services by Developer Tech include affordable web design, ecommerce website development and full-stack web development in India."
      keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
      canonical="https://www.developer-tech.com/services"
    />

    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Web Development Services in India</h1>
      <p className="mb-4">At Developer Tech, our services are built to help companies of all sizes. We specialize in affordable web design, performance consulting, and ecommerce website development. Our experts provide modern React apps, secure backend APIs, and strong SEO foundations so your business gets more visibility. As a website developer in Jaipur, we also support localized digital marketing strategy with an eye toward conversions.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Core Services</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Custom Website Design & Development</li>
        <li>eCommerce Website Development (Shopify, WooCommerce, custom)</li>
        <li>Single Page Application (React, Vue, Angular)</li>
        <li>Backend APIs and Integration (Node.js, Express, Python)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-3">SEO and Performance</h2>
      <p className="mb-4">Our team adds metadata, schema markup, and speed optimizations to every build. This helps Google rank your website strongly for keywords like "web development services in India" and "website developer in Jaipur" while keeping pages fast and accessible.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">More About This Page</h2>
      <p className="mb-4">To get started, check our <Link className="text-blue-600 underline" to="/packages">Packages</Link> or connect directly via the <Link className="text-blue-600 underline" to="/contact">Contact</Link> page. We maintain a transparent process and deliver budget-conscious solutions with strong ROI.</p>

      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" alt="Team planning web development services" className="w-full rounded-lg" />
    </main>
  </div>
);

export default Services;
