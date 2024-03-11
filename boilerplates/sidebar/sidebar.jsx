import * as React from "react";
import "./sidebar.css";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArchiveIcon from "@mui/icons-material/Archive";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const icons = [
    { key: "1", Icon: AnalyticsIcon, label: "Graphs", path: "/" },
    {
      key: "2",
      Icon: ImportContactsIcon,
      label: "Passbook",
      path: "/passbook",
    },
    { key: "3", Icon: SettingsIcon, label: "Settings Icon" },
    {
      key: "4",
      Icon: AccountBalanceWalletIcon,
      label: "Account Balance Wallet Icon",
    },
    { key: "5", Icon: AccountBalanceIcon, label: "Account Balance Icon" },
    { key: "6", Icon: ArchiveIcon, label: "Archive Icon" },
  ];

  return (
    <div className="sidebar">
      <div>
        <ul className="sidenav-list">
          {icons.map(({ Icon, label, path }) => (
            <li className="sidenav-list-item">
              <Link
                to={path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Icon fontSize="inherit" />
                {isOpen && <p>{label}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
