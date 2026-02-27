import React from "react";
import "../pages/packages.css";// make sure path is correct

const Packages: React.FC = () => {
  return (
    <section id="packages" className="pricing-section scroll-mt-24">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>Our Website Development Packages</h2>
          <p>Choose the perfect plan to grow your business online.</p>
        </div>

        <div className="pricing-cards">

          {/* BASIC PLAN */}
          <div className="pricing-card">
            <div className="card-header">
              <h3>BASIC PLAN</h3>
              <p className="plan-desc">Starter Website</p>
              <div className="price">
                <span className="currency">₹</span>9,999
              </div>
              <p className="best-for">
                Best for small businesses & startups.
              </p>
            </div>

            <div className="card-body">
              <ul className="features">
                <li>✔ 5 Pages (Home, About, Services, Gallery, Contact)</li>
                <li>✔ Mobile Responsive Design</li>
                <li>✔ Clean & Professional Layout</li>
                <li>✔ Contact Form</li>
                <li>✔ WhatsApp Integration</li>
                <li>✔ Basic SEO Setup</li>
                <li>⏱ Delivery in 7 Days</li>
                <li>🎧 7 Days Free Support</li>
                <li className="info-note">
                  ℹ Note: Domain & Hosting not included
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <a
                href="https://wa.me/919828920866"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Choose Plan
              </a>
            </div>
          </div>

          {/* STANDARD PLAN */}
          <div className="pricing-card popular">
            <div className="popular-badge">MOST POPULAR</div>

            <div className="card-header">
              <h3>STANDARD PLAN</h3>
              <p className="plan-desc">Business Growth</p>
              <div className="price">
                <span className="currency">₹</span>19,999
              </div>
              <p className="best-for">
                Best for growing businesses that want more visibility.
              </p>
            </div>

            <div className="card-body">
              <ul className="features">
                <li>✔ 8–10 Pages Website</li>
                <li>✔ Custom Modern Design</li>
                <li>✔ Fully Responsive (Mobile + Tablet)</li>
                <li>✔ WhatsApp & Call Integration</li>
                <li>✔ On-Page SEO Optimization</li>
                <li>✔ Speed Optimization</li>
                <li>✔ Google Map Integration</li>
                <li>✔ Social Media Integration</li>
                <li>✔ 1 Month Free Support</li>
                <li>⏱ Delivery in 10–12 Days</li>
                <li className="bonus">
                  🎁 Bonus: Free Google My Business Setup
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <a
                href="https://wa.me/919828920866"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* PREMIUM PLAN */}
          <div className="pricing-card">
            <div className="card-header">
              <h3>PREMIUM PLAN</h3>
              <p className="plan-desc">Advanced Business Website</p>
              <div className="price">
                <span className="currency">₹</span>39,999
                <span className="range"> - ₹49,999</span>
              </div>
              <p className="best-for">
                Best for serious brands, hotels, and established businesses.
              </p>
            </div>

            <div className="card-body">
              <ul className="features">
                <li>✔ Fully Custom Design</li>
                <li>✔ Unlimited Pages</li>
                <li>✔ Advanced UI/UX</li>
                <li>✔ SEO-Optimized Structure</li>
                <li>✔ High-Speed Optimization (90+ target)</li>
                <li>✔ Lead Capture System</li>
                <li>✔ Blog Setup</li>
                <li>✔ Admin Panel (if required)</li>
                <li>✔ Payment Gateway Integration</li>
                <li>✔ 3 Months Free Maintenance</li>
                <li>⏱ Delivery in 15–20 Days</li>
                <li className="bonus">
                  🎁 Bonus: 1 Month Basic SEO Service Free
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <a
                href="https://wa.me/919828920866"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Choose Plan
              </a>
            </div>
          </div>
        </div>

        {/* ADD-ONS */}
        <div className="addons-section">
          <h3>Additional Services</h3>
          <div className="addons-grid">

            <div className="addon-card">
              <h4>Hosting Setup</h4>
              <p>₹3,000 /year</p>
            </div>

            <div className="addon-card">
              <h4>Website Maintenance</h4>
              <p>₹2,000 /month</p>
            </div>

            <div className="addon-card">
              <h4>SEO Services</h4>
              <p>₹5,000 /month</p>
            </div>

            <div className="addon-card">
              <h4>Landing Page</h4>
              <p>₹4,999</p>
            </div>

            <div className="addon-card">
              <h4>E-commerce Website</h4>
              <p>Starting ₹30,000</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Packages;

