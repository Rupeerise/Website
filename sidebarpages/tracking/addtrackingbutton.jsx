import React, { useState } from "react";
import "./addbutton.css";
import AddTracking from "./addtracking";

function AddTrackingButton() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div onClick={handleClick} className="add-tracking-button">
        Add Tracking
      </div>
      {showPopup && (
        <div className={`tracking-popup ${showPopup ? "" : "hide"}`}>
          <AddTracking closePopup={closePopup} />
        </div>
      )}
    </div>
  );
}

export default AddTrackingButton;
