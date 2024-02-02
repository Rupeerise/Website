import React from "react";
import "./passbooklisting.css";

function Passbooklisting({ payment }) {
  const date = new Date(payment.date);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <div className="passbook-listings">
      <div className="passbook-listings-amount">{payment.amount}</div>
      <div>
        <div className="passbook-listings-name">{payment.trackingid.name}</div>
        <div className="passbook-listings-date">{formattedDate}</div>
      </div>
    </div>
  );
}

export default Passbooklisting;
