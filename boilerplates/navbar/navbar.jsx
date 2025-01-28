import * as React from "react";
import "./navbar.css";
import Profile from "./profile";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

export default function Navbar() {
  return (
    <span className="navbar">
      <Profile />
    </span>
  );
}
