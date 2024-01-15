import * as React from "react";
import "./profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Profile() {
  return (
    <>
      <div className="profile-dropdown-container">
        <div className="navbar-profile">
          <AccountCircleIcon className="navbar-profile-icon" fontSize="large" />
          <div className="navbar-profile-name">Profile Name</div>
        </div>
        <div className="dropdown-content">
          <div className="profile-dropdown">Profile</div>
          <div className="profile-dropdown">language</div>
          <div className="profile-dropdown">Mode light/dark</div>
          <div className="profile-dropdown">settings</div>
        </div>
      </div>
    </>
  );
}
