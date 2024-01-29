import * as React from "react";
import Logo from "./logo";
import Personal from "./personal";
import Bussiness from "./bussiness";
import "./navbar.css";
import SearchBar from "./searchbar";
import { useState } from "react";
import Profile from "./profile";

export default function Navbar({ username }) {
  const [results, setResults] = useState([]);
  return (
    <span className="navbar">
      <Logo />
      <Personal />
      <Bussiness />
      <SearchBar setResults={setResults} />
      <Profile username={username} />
    </span>
  );
}
