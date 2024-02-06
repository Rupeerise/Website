import React, { useState } from "react";
import "./addbutton.css";
import AddPayment from "../addpayment";

function AddPaymentButton() {
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
        Add Payment
      </div>
      {showPopup && (
        <div className={`popup ${showPopup ? "" : "hide"}`}>
          <AddPayment closePopup={closePopup} />
        </div>
      )}
    </div>
  );
}

export default AddPaymentButton;
