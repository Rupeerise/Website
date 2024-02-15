import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import "./incomemore.css";

function Incomemore({ id }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <IconButton onClick={toggleMenu}>
        <MoreVertIcon style={{ fontSize: "1.5rem", marginLeft: "0.3rem" }} />
      </IconButton>
      {showMenu && (
        <div className="income-three-dot-menu">
          <div className="income-three-dot-item">Add subtracking</div>
          <div className="income-three-dot-item">Delete</div>
        </div>
      )}
    </div>
  );
}

export default Incomemore;
