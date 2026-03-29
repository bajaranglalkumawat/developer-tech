import SEO from "@/components/SEO";

const Team = () => (
  <div className="min-h-screen bg-gray-50">
    <SEO
      title="Team | Developer Tech - Website Developer in Jaipur"
      description="Meet the Developer Tech team from Jaipur, delivering web development services in India and affordable web design with professional expertise."
      keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
      canonical="https://www.developer-tech.com/team"
    />

    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Our Expert Web Development Team</h1>
      <p className="mb-4">Our team brings together business analysts, UI/UX designers, frontend and backend engineers, QA specialists, and SEO strategists. As a trusted website developer in Jaipur, we invest in continuous training and modern tooling. We build websites that are both beautiful and functional, with a strong emphasis on results for clients who need proven web development services in India.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">What We Care About</h2>
      <p className="mb-4">Every project gets a dedicated project manager, clear milestones, and daily communication. We plan for affordability while preserving quality, especially on ecommerce website development. Transparent reporting is core to trust and long-term growth.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Our Culture</h2>
      <p className="mb-4">We value collaboration, experimentation, and accountability. As a team, we want clients to feel they are working with a reliable partner. We achieve this via agile workflows and shared product ownership.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Connect with the Team</h2>
      <p className="mb-4">Explore our <a className="text-blue-600 underline" href="/services">Services</a> for what each team member contributes, and head to <a className="text-blue-600 underline" href="/contact">Contact</a> to speak with us directly.</p>

      <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80" alt="Developer team collaborating in Jaipur" className="w-full rounded-lg" />
    </main>
  </div>
);

export default Team;
