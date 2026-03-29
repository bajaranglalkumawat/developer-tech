import SEO from "@/components/SEO";

const Contact = () => (
  <div className="min-h-screen bg-gray-50">
    <SEO
      title="Contact | Developer Tech - Website Developer Jaipur"
      description="Get in touch with Developer Tech for web development services in India, including affordable web design and ecommerce website development from Jaipur."
      keywords="web development services in India, website developer in Jaipur, affordable web design, ecommerce website development"
      canonical="https://www.developer-tech.com/contact"
    />

    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Reach out for a free consultation on your web development project. As a website developer in Jaipur, we deliver personalized solutions for businesses searching for web development services in India.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Office</h2>
      <p className="mb-4">Developer Tech, Jaipur, Rajasthan, India.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Email & Phone</h2>
      <p className="mb-4">Email: contact@developer-tech.com</p>
      <p className="mb-4">Phone: +91 98765 43210</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Quick Contact Form</h2>
      <p className="mb-4">Use this form to start planning your affordable web design or ecommerce website development requirements.</p>

      <form className="grid gap-4">
        <label className="flex flex-col text-sm font-medium">
          Name
          <input className="mt-1 p-2 border rounded-lg" placeholder="Your Name" aria-label="Name" />
        </label>
        <label className="flex flex-col text-sm font-medium">
          Email
          <input className="mt-1 p-2 border rounded-lg" type="email" placeholder="Your Email" aria-label="Email" />
        </label>
        <label className="flex flex-col text-sm font-medium">
          Message
          <textarea className="mt-1 p-2 border rounded-lg" rows={5} placeholder="Tell us about your project" aria-label="Message" />
        </label>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Send Message</button>
      </form>

      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80" alt="Contact Developer Tech in Jaipur" className="w-full rounded-lg mt-6" />
    </main>
  </div>
);

export default Contact;
