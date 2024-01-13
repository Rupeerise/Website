import * as React from "react";
import Logo from "./navbarcomponents/Logo";
import Personal from "./navbarcomponents/personal";
import Bussiness from "./navbarcomponents/bussiness";
import "./navbar.css";
import SearchBar from "./navbarcomponents/searchbar";
import { useState } from "react";
import Profile from "./navbarcomponents/profile";

export default function Navbar() {
  const [results, setResults] = useState([]);
  return (
    <span style={{ color: "red" }} className="navbar">
      <Logo />
      <Personal />
      <Bussiness />
      <SearchBar setResults={setResults} />
      <Profile />
    </span>
  );
}
