import * as React from "react";
import "./profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Profile() {
  return (
    <div className="navbar-profile">
      <AccountCircleIcon className="navbar-profile-icon" fontSize="large" />
      <div className="navbar-profile-name">Profile Name</div>
    </div>
  );
}
