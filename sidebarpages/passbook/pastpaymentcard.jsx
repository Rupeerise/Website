import React, { useState } from "react";
import "./pastpaymentcard.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SellIcon from "@mui/icons-material/Sell";
import EditPayment from "./editpayment";

const PastPaymentCard = ({ payment }) => {
  // Convert the date to a more readable format
  const date = new Date(payment.date).toLocaleDateString("en-GB");

  // Convert the amount to Indian Rupees format
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(payment.amount);

  const [popup, setPopup] = useState(false);

  const closePopup = () => {
    setPopup(false);
  };

  const openPopup = () => {
    setPopup(true);
  };

  return (
    <div className="past-payment">
      <div className="past-payment-left">
        <div className="past-payment-details">
          <p className="past-payment-amount">
            {payment.paymentType}: {amount}
          </p>
          <p className="past-payment-date">on {date}</p>
        </div>
        <div className="past-payment-tag">
          <SellIcon className="sell-icon" />
          <p className="past-payment-tag-name">
            {payment.tagid?.name || payment.loanid?.name}
          </p>
        </div>
      </div>
      <div className="past-payment-right" onClick={openPopup}>
        <div className="past-payment-morevert">
          <MoreVertIcon />
        </div>
      </div>
      {popup && <EditPayment closePopup={closePopup} payment={payment} />}
    </div>
  );
};

export default PastPaymentCard;
