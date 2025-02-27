import Navbar from "../boilerplates/navbar/navbar";
import Footer from "../boilerplates/footer";
import "./home.css";
import "./termsofservice.css";

export default function Termsofservice() {
  return (
    <>
      <Navbar />
      <div className="tos-body">
        <h1 className="tos-heading">Terms of Service</h1>
        <p className="tos-paragraph">Last Updated: 13-feb-2025 </p>

        <h2 className="tos-subheading">1. Acceptance of Terms</h2>
        <p className="tos-paragraph">
          By using our personal finance app, you agree to comply with and be
          bound by these Terms of Service. If you do not agree, please do not
          use the service.
        </p>

        <h2 className="tos-subheading">2. Use of the Service</h2>
        <p className="tos-paragraph">
          You may use the app to track payments, tag transactions, and view
          insights. You agree not to misuse or manipulate data in any
          unauthorized way.
        </p>

        <h2 className="tos-subheading">3. User Data & Privacy</h2>
        <p className="tos-paragraph">
          Your financial data is stored securely and will not be shared without
          your consent. Please refer to our Privacy Policy for more details.
        </p>

        <h2 className="tos-subheading">4. Account Security</h2>
        <p className="tos-paragraph">
          You are responsible for maintaining the security of your account
          credentials. We are not liable for any unauthorized access to your
          account.
        </p>

        <h2 className="tos-subheading">5. Limitations of Liability</h2>
        <p className="tos-paragraph">
          We do not guarantee the accuracy of financial insights provided. Use
          the app at your own discretion, and we are not responsible for any
          financial decisions made based on the app’s data.
        </p>

        <h2 className="tos-subheading">6. Modifications to Terms</h2>
        <p className="tos-paragraph">
          We reserve the right to update these terms at any time. Continued use
          of the app after changes indicates your acceptance of the revised
          terms.
        </p>

        <h2 className="tos-subheading">7. Contact Information</h2>
        <p className="tos-paragraph">
          If you have any questions about these terms, please contact us at
          [Your Contact Email].
        </p>
      </div>
      <Footer />
    </>
  );
}
