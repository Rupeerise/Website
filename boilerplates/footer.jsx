import React from "react";
import "./footer.css";

export default function footer() {
  return (
    <div className="footer">
      <div className="footer-col">
        <h1 className="footer-col-title">Links</h1>
        <p className="footer-col-container">Login</p>
        <p className="footer-col-container">Pricing</p>
        <p className="footer-col-container">Support</p>
        <p className="footer-col-container">FAQ</p>
      </div>
      <div className="footer-col">
        <h1 className="footer-col-title">Contact</h1>
        <p className="footer-col-container">Email:</p>
      </div>
      <div className="footer-col">
        <h1 className="footer-col-title">Legal</h1>
        <p className="footer-col-container">Terms of Service</p>
        <p className="footer-col-container">Privacy Policy</p>
      </div>
    </div>
  );
}
