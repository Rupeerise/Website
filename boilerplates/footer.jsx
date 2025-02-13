import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-col">
        <h1 className="footer-col-title">Links</h1>
        <p className="footer-col-container">Login</p>
        <p className="footer-col-container">Pricing</p>
        <p className="footer-col-container">Support</p>
        <Link className="footer-col-container" to="/faq">
          FAQ
        </Link>
      </div>
      <div className="footer-col">
        <h1 className="footer-col-title">Contact</h1>
        <p className="footer-col-container">
          Email:
          {/* <a href="mailto:admin@vivekwadate.com"> admin@vivekwadate.com </a> */}
        </p>
      </div>
      <div className="footer-col">
        <h1 className="footer-col-title">Legal</h1>
        <Link className="footer-col-container" to="/termsofservice">
          Term of Service
        </Link>
        <Link className="footer-col-container" to="/privacypolicy">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
