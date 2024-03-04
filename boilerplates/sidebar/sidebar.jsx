import * as React from "react";
import "./sidebar.css";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import GridViewIcon from "@mui/icons-material/GridView";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function Sidebar() {
  return (
    <>
      <div className="sidenav"></div>

      <div className="sidenav-container">
        <ul>
          <li>
            <GridViewIcon fontSize="inherit" />
          </li>
          <li>
            <AssessmentIcon fontSize="inherit" />
          </li>
          <li>
            <SettingsIcon fontSize="inherit" />
          </li>
          <li>
            <AccountBalanceWalletIcon fontSize="inherit" />
          </li>
        </ul>
      </div>
    </>
  );
}
