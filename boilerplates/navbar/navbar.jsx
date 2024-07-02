import * as React from "react";
import Personal from "./personal";
import Bussiness from "./bussiness";
import "./navbar.css";
import SearchBar from "./searchbar";
import { useState } from "react";
import Profile from "./profile";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

export default function Navbar() {
  return (
    <span className="navbar">
      <Profile />
    </span>
  );
}
