import React, { useState } from "react";
import "./sidebar.css";
import StyleIcon from "@mui/icons-material/Style";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BookIcon from "@mui/icons-material/Book";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const icons = [
    { key: "1", Icon: EqualizerIcon, label: "Graphs", path: "/" },
    {
      key: "2",
      Icon: BookIcon,
      label: "Payments",
      path: "/payments",
    },
    { key: "3", Icon: StyleIcon, label: "Tags", path: "/tag" },
    {
      key: "4",
      Icon: AccountBalanceWalletIcon,
      label: "Budget",
      path: "/budget",
    },
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
                <Icon fontSize="inherit" className="sidenav-icon" />
                <span className="sidenav-label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
