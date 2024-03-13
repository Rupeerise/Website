import * as React from "react";
import "./sidebar.css";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SettingsIcon from "@mui/icons-material/Settings";
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
    { key: "3", Icon: SettingsIcon, label: "Tracking" },
    {
      key: "4",
      Icon: CalculateIcon,
      label: "Calculators",
    },
    { key: "5", Icon: AccountBalanceWalletIcon, label: "Budget" },
    { key: "6", Icon: CalendarMonthIcon, label: "Calendar" },
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
