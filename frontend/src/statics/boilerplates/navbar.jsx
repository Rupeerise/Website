import * as React from "react";
import Logo from "./navbarcomponents/Logo";
import Personal from "./navbarcomponents/personal";
import Bussiness from "./navbarcomponents/bussiness";
import "./navbar.css";
import SearchBar from "./navbarcomponents/searchbar";
import SearchResultList from "./navbarcomponents/searchresultlist";
import {useState} from "react";

export default function Navbar() {
  const [results, setResults] = useState([]);
  return (
    <span style={{ color: "red" }} className="navbar">
      <Logo />
      <Personal />
      <Bussiness />
      <SearchBar setResults = {setResults}/>
      {/* <SearchResultList results={results} /> */}
    </span>
  );
}
