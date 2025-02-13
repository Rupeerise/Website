import Navbar from "../boilerplates/navbar/navbar";
import Footer from "../boilerplates/footer";
import "./home.css";
import "./privacypolicy.css";

export default function Privacypolicy() {
  return (
    <>
      <Navbar />
      <div className="privacypolicy-body">
        <h1 className="privacypolicy-heading">Privacy Policy</h1>
        <p className="privacypolicy-paragraph">Last Updated: 13-feb-2025</p>

        <h2 className="privacypolicy-subheading">1. Introduction</h2>
        <p className="privacypolicy-paragraph">
          We value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and
          safeguard your data.
        </p>

        <h2 className="privacypolicy-subheading">2. Information We Collect</h2>
        <p className="privacypolicy-paragraph">
          We collect information you provide, such as name, email, tags and
          financial transactions. We also collect usage data to improve our
          services.
        </p>

        <h2 className="privacypolicy-subheading">
          3. How We Use Your Information
        </h2>
        <p className="privacypolicy-paragraph">
          Your data is used to provide insights, enhance features, and ensure
          security. We do not sell your data to third parties.
        </p>

        <h2 className="privacypolicy-subheading">4. Data Security</h2>
        <p className="privacypolicy-paragraph">
          We implement industry-standard security measures to protect your
          information from unauthorized access.
        </p>

        <h2 className="privacypolicy-subheading">5. Third-Party Services</h2>
        <p className="privacypolicy-paragraph">
          We may use third-party services for analytics and payment processing.
          Their privacy policies apply to their respective services.
        </p>

        <h2 className="privacypolicy-subheading">6. Your Rights</h2>
        <p className="privacypolicy-paragraph">
          You have the right to access, modify, or delete your data. Contact us
          if you wish to exercise these rights.
        </p>

        <h2 className="privacypolicy-subheading">7. Changes to This Policy</h2>
        <p className="privacypolicy-paragraph">
          We may update this policy from time to time. Continued use of the
          service implies acceptance of the revised policy.
        </p>

        <h2 className="privacypolicy-subheading">8. Contact Information</h2>
        <p className="privacypolicy-paragraph">
          For any questions regarding this Privacy Policy, please contact us at
          [Your Contact Email].
        </p>
      </div>
      <Footer />
    </>
  );
}
