import SEO from "@/components/SEO";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Privacy Policy | Developer Tech"
      description="Privacy policy of Developer Tech. Learn how we collect, use, and protect your personal information."
      keywords="privacy policy, data protection, Developer Tech"
      canonical="https://developertech.in/privacy-policy"
    />

    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">Last Updated: May 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-4">
          Developer Tech ("we," "us," "our," or "Company") operates the developertech.in website
          and related services. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website and use our services.
        </p>
        <p className="text-gray-700">
          Please read this privacy policy carefully. If you do not agree with our policies and
          practices, please do not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <h3 className="text-xl font-semibold mb-2">2.1 Personal Information</h3>
        <p className="text-gray-700 mb-4">
          We may collect the following personal information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Name and contact information (email, phone, address)</li>
          <li>Account credentials and passwords</li>
          <li>Professional information (company, position, industry)</li>
          <li>Payment information (credit card, bank details)</li>
          <li>Communication records and correspondence</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">2.2 Automatically Collected Information</h3>
        <p className="text-gray-700 mb-4">
          When you visit our website, we automatically collect:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Device information (browser type, operating system, device ID)</li>
          <li>IP address and location data</li>
          <li>Pages visited and time spent on pages</li>
          <li>Cookies and similar tracking technologies</li>
          <li>Analytics data about your usage patterns</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">We use collected information for:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Providing and improving our services</li>
          <li>Processing transactions and sending related information</li>
          <li>Sending promotional emails and updates (with your consent)</li>
          <li>Responding to your inquiries and customer support</li>
          <li>Analytics and understanding user behavior</li>
          <li>Complying with legal obligations</li>
          <li>Preventing fraud and securing our services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
        <p className="text-gray-700 mb-4">
          We do not sell, trade, or rent your personal information to third parties. However, we may
          share information with:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Service providers who assist us in operations</li>
          <li>Payment processors for transaction handling</li>
          <li>Legal authorities if required by law</li>
          <li>Business partners with your consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. However,
          no method of transmission over the internet is 100% secure. We cannot guarantee absolute
          security of your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar tracking technologies to enhance your experience. You can
          control cookie settings through your browser preferences. Disabling cookies may affect
          the functionality of our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
        <p className="text-gray-700 mb-4">
          Depending on your location, you may have the following rights:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Right to access your personal information</li>
          <li>Right to correct inaccurate information</li>
          <li>Right to request deletion of your information</li>
          <li>Right to opt-out of marketing communications</li>
          <li>Right to data portability</li>
        </ul>
        <p className="text-gray-700">
          To exercise these rights, please contact us at contact@developertech.in.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
        <p className="text-gray-700">
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices of external sites. Please review their privacy policies before sharing
          personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
        <p className="text-gray-700">
          Our services are not intended for children under 13 years of age. We do not knowingly
          collect personal information from children. If we become aware of such collection, we will
          take appropriate steps to delete the information and notify the parent or guardian.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy periodically. Changes will be effective immediately upon
          posting to the website. Your continued use of our services constitutes acceptance of the
          updated policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p className="text-gray-700 mb-2">
          If you have questions about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <p className="text-gray-700">
          <strong>Developer Tech</strong><br />
          Email: contact@developertech.in<br />
          Website: developertech.in
        </p>
      </section>
    </main>
  </div>
);

export default PrivacyPolicy;
