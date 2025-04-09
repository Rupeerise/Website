import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./sidebar.css";

const menuItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/payments", label: "Payments", icon: "💸" },
  { path: "/tag", label: "Categories", icon: "🏷️" },
  { path: "/budget", label: "Budget", icon: "💰" },
  { path: "/autopay", label: "AutoPay", icon: "⏱️" },
];

function MySidebar({ collapsed }) {
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 70 }
  };

  return (
    <motion.div
      className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
      variants={sidebarVariants}
      initial={collapsed ? "collapsed" : "expanded"}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="sidebar-header">
        {!collapsed && <h3 className="sidebar-title">FinApp</h3>}
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div className="sidebar-menu-item" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              <motion.div
                className="sidebar-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.div>
              
              <span className="sidebar-label">{item.label}</span>
              <div className="hover-effect"></div>
            </NavLink>
          </div>
        ))}
      </nav>
    </motion.div>
  );
}

export default MySidebar;