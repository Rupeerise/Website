import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-col">
        <h1 className="footer-col-title">Links</h1>
        <p className="footer-col-container">Login</p>
        <p className="footer-col-container">Pricing</p>
        <p className="footer-col-container">Support</p>
        <a className="footer-col-container" href="/faq">
          FAQ
        </a>
      </div>
      <div className="footer-col">
        <h1 className="footer-col-title">Contact</h1>
        <p className="footer-col-container">Email:</p>
      </div>
      <div className="footer-col">
        <h1 className="footer-col-title">Legal</h1>
        <a className="footer-col-container" href="/termsofservice">
          Terms of Service
        </a>
        <a className="footer-col-container" href="/privacypolicy">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
