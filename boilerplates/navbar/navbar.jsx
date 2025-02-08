import * as React from "react";
import "./navbar.css";
import Profile from "./profile";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

export default function Navbar({ setCollapsed, collapsed }) {
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <span className="navbar">
      {setCollapsed && (
        <button onClick={handleCollapse}>
          <DensityMediumIcon />
        </button>
      )}
      <Profile />
    </span>
  );
}
