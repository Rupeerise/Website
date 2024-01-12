import * as React from "react";
import Logo from "./navbarcomponents/Logo";
import Personal from "./navbarcomponents/personal";
import Bussiness from "./navbarcomponents/bussiness";
import "../../../public/navbar.css";
import SearchBar from "./navbarcomponents/searchbar";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <span style={{ color: "red" }} class="navbar">
      <Logo />
      <Personal />
      <Bussiness />
      <SearchBar />
      <SearchIcon />
    </span>
  );
}
