import React, { useState, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import AddSecondaryTracking from "./AddSecondaryTracking";
import "./incomemore.css";

function Incomemore({ id, name }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAddSecondaryTracking, setShowAddSecondaryTracking] =
    useState(false);
  const menuRef = useRef();

  const toggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  const hideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const handleAddSecondaryTrackingClick = () => {
    setShowAddSecondaryTracking(true);
    setShowMenu(false);
  };

  const closePopup = () => {
    setShowAddSecondaryTracking(false);
  };

  React.useEffect(() => {
    document.addEventListener("click", hideMenu);
    return () => {
      document.removeEventListener("click", hideMenu);
    };
  }, []);

  return (
    <div>
      <IconButton onClick={toggleMenu}>
        <MoreVertIcon style={{ fontSize: "1.5rem", marginLeft: "0.3rem" }} />
      </IconButton>
      {showMenu && (
        <div className="income-three-dot-menu" ref={menuRef}>
          <div
            className="income-three-dot-item"
            onClick={handleAddSecondaryTrackingClick}
          >
            Add subtracking
          </div>
          <div className="income-three-dot-item">Delete</div>
        </div>
      )}
      {showAddSecondaryTracking && (
        <AddSecondaryTracking id={id} name={name} closePopup={closePopup} />
      )}
    </div>
  );
}

export default Incomemore;
