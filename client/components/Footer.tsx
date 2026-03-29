import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="text-xl font-bold mb-3">Developer Tech</h3>
        <p>Web Development Services in India from Jaipur-based experts.</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link className="hover:text-blue-300" to="/">Home</Link></li>
          <li><Link className="hover:text-blue-300" to="/services">Services</Link></li>
          <li><Link className="hover:text-blue-300" to="/about">About</Link></li>
          <li><Link className="hover:text-blue-300" to="/team">Team</Link></li>
          <li><Link className="hover:text-blue-300" to="/packages">Packages</Link></li>
          <li><Link className="hover:text-blue-300" to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Contact</h3>
        <p>Jaipur, Rajasthan, India</p>
        <p>Email: hello@developer-tech.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400 text-center">
      Web Development Services in India | Website Developer Jaipur | Affordable Web Design
    </div>
  </footer>
);

export default Footer;
