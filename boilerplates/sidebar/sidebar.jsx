import React, { useState } from "react";
import "./sidebar.css";
import StyleIcon from "@mui/icons-material/Style";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
