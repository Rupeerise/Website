import React, { useState } from "react";
import "./sidebar.css";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalculateIcon from "@mui/icons-material/Calculate";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArchiveIcon from "@mui/icons-material/Archive";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const icons = [
    { key: "1", Icon: AnalyticsIcon, label: "Graphs", path: "/" },
    {
      key: "2",
      Icon: ImportContactsIcon,
      label: "Payments",
      path: "/payments",
    },
    { key: "3", Icon: TableChartIcon, label: "Tracking", path: "/tag" },
    {
      key: "4",
      Icon: CalculateIcon,
      label: "Calculators",
    },
    { key: "5", Icon: AccountBalanceWalletIcon, label: "Budget" },
    { key: "6", Icon: CalendarMonthIcon, label: "Calendar" },
  ];
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <ul className="sidenav-list">
          {icons.map(({ Icon, label, path }, index) => (
            <li key={index}>
              <Link
                to={path}
                style={{ textDecoration: "none", color: "inherit" }}
                className={`sidenav-list-item ${isOpen ? "open" : ""}`}
              >
                <Icon fontSize="inherit" />
                <p className="sidenav-label">{label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
