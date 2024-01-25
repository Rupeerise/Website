import React from "react";
import "./info.css";
import Logo from "../boilerplates/logo";
import Personal from "../boilerplates/personal";
import Bussiness from "../boilerplates/bussiness";
import SearchBar from "../boilerplates/searchbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Info() {
  return(
    <>
      <span className="navbar">
        <Logo />
        <Personal />
        <Bussiness />
        <SearchBar />
        
        <div className="info-profile">
          <a href="/login" className="info-signin">Sign In</a>
          <AccountCircleIcon className="info-profile-icon" fontSize="large" />
        </div>
      </span>
    </>
  )
}