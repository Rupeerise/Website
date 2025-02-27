import React, { useState } from "react";
import "./sidebar.css";
import StyleIcon from "@mui/icons-material/Style";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BookIcon from "@mui/icons-material/Book";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function MySidebar({ collapsed }) {
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

  return (
    <>
      <Sidebar collapsed={collapsed}>
        <Menu>
          {icons.map((icon) => (
            <MenuItem
              key={icon.key}
              component={<Link to={icon.path} />}
              icon={<icon.Icon />}
            >
              {icon.label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </>
  );
}
