import * as React from "react";
import { useState } from "react";
import "./sidebar.css";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import GridViewIcon from "@mui/icons-material/GridView";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArchiveIcon from '@mui/icons-material/Archive';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sidebar">
      <DensityMediumIcon onClick={() => setIsOpen(!isOpen)} />
      {!isOpen && (
        <div>
          <ul className="sidenav-list">
            <li className="sidenav-list-item">
              <GridViewIcon fontSize="inherit" />
            </li>
            <li className="sidenav-list-item">
              <AssessmentIcon fontSize="inherit" />
            </li>
            <li className="sidenav-list-item">
              <SettingsIcon fontSize="inherit" />
            </li>
            <li className="sidenav-list-item">
              <AccountBalanceWalletIcon fontSize="inherit" />
            </li>
            <li className="sidenav-list-item">
              <AccountBalanceIcon fontSize="inherit" />
            </li>
            <li className="sidenav-list-item">
              <ArchiveIcon fontSize="inherit" />
            </li>
          </ul>
        </div>
      )}
      {isOpen && (
        <div>
          <ul className="sidenav-list">
            <li className="sidenav-list-item">
              <GridViewIcon fontSize="inherit" /> <p>Grid Icon</p>
            </li>
            <li className="sidenav-list-item">
              <AssessmentIcon fontSize="inherit" /> <p>Assessment Icon</p>
            </li>
            <li className="sidenav-list-item">
              <SettingsIcon fontSize="inherit" /> <p>Settings Icon</p>
            </li>
            <li className="sidenav-list-item">
              <AccountBalanceWalletIcon fontSize="inherit" /> <p>Account Balance Wallet Icon</p>
            </li>
            <li className="sidenav-list-item">
              <AccountBalanceIcon fontSize="inherit" /> <p>Account Balance Icon</p>
            </li>
            <li className="sidenav-list-item">
              <ArchiveIcon fontSize="inherit" /> <p>Archive Icon</p>
            </li>
          </ul>
        </div>
      )
      }
    </div>
  );
}
