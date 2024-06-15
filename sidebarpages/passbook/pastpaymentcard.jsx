import React from "react";
import "./pastpaymentcard.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SellIcon from "@mui/icons-material/Sell";

const PastPaymentCard = ({ payment }) => {
  // Convert the date to a more readable format
  const date = new Date(payment.date).toLocaleDateString("en-GB");

  // Convert the amount to Indian Rupees format
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(payment.amount);

  return (
    <div className="past-payment">
      <div className="past-payment-left">
        <div className="past-payment-details">
          <p className="past-payment-amount">Credited: {amount}</p>
          <p className="past-payment-date">on {date}</p>
        </div>
        <div className="past-payment-tag">
          <SellIcon className="sell-icon" />
          <p className="past-payment-tag-name">{payment.name}</p>
        </div>
      </div>
      <div className="past-payment-right">
        <div className="past-payment-morevert">
          <MoreVertIcon />
        </div>
      </div>
    </div>
  );
};

export default PastPaymentCard;
