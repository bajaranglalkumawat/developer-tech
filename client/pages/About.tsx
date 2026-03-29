import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const About = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="About | Developer Tech - Affordable Web Design Experts"
      description="Developer Tech is a part of Jaipur web development community, offering affordable web design and technical expertise for businesses in India."
      keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
      canonical="https://www.developer-tech.com/about"
    />

    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Developer Tech</h1>
      <p className="mb-4">Developer Tech is a team of skilled artisans focused on building digital products with heart. Located in Jaipur, we understand how to blend creative design with technical discipline for affordable web design and high-functional applications. As a trusted website developer in Jaipur, we offer strategy-oriented planning, sprint-based development and careful quality audits to ensure fast and reliable project execution.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
      <p className="mb-4">Our mission is to provide web development services in India that are transparent, scalable, and customer-first. We believe strong product design and structured code are the backbone of long-term growth for businesses and eCommerce brands alike.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Local Roots, Global Reach</h2>
      <p className="mb-4">Even though we’re based in Jaipur, our clients are worldwide. We ship full-stack solutions, including ecommerce website development and responsive web apps, while keeping costs down through efficient processes.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Next Steps</h2>
      <p className="mb-4">Discover service pricing at <Link className="text-blue-600 underline" to="/packages">Packages</Link> and meet our expert developers on the <Link className="text-blue-600 underline" to="/team">Team</Link> page. Ready for a quote? Visit <Link className="text-blue-600 underline" to="/contact">Contact</Link>.</p>

      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80" alt="About developer tech team collaboration" className="w-full rounded-lg" />
    </main>
  </div>
);

export default About;
