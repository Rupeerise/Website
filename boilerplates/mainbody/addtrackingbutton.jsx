import React, { useState } from "react";
import "./addbutton.css";
import AddTracking from "../tracking/addtracking";

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
      <div onClick={handleClick} className="add-button">
        Add Tracking
      </div>
      {showPopup && (
        <div className={`popup ${showPopup ? "" : "hide"}`}>
          <AddTracking closePopup={closePopup} />
        </div>
      )}
    </div>
  );
}

export default AddTrackingButton;
