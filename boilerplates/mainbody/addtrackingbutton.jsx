import React from "react";
import "./addbutton.css";

function AddTrackingButton() {
  const handleClick = () => {
    window.location.href = "/addTracking";
  };

  return (
    <div onClick={handleClick} className="add-button">
      Add Tracking
    </div>
  );
}

export default AddTrackingButton;
