import React from "react";
import "./info.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Navbar from "../boilerplates/navbar/navbar";

export default function Info() {
  return (
    <>
      <span className="navbar">
        <Navbar />

        <div className="info-profile">
          <a href="/login" className="info-signin">
            Sign In
          </a>
          <AccountCircleIcon className="info-profile-icon" fontSize="large" />
        </div>
      </span>
    </>
  );
}
