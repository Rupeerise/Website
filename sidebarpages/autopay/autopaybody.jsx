import React from "react";
import "./autopaybody.css";
import { useSelector } from "react-redux";
import IndividualAutoPay from "./individualautopay";

export default function AutopayBody() {
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);

  const filteredTagArray = tagArray.filter(
    (tag) => tag.autopayArray && tag.autopayArray.length > 0
  );
  const filteredLoanArray = loanArray.filter(
    (loan) => loan.autopayArray && loan.autopayArray.length > 0
  );

  const Autopays = [
    ...filteredTagArray.flatMap((tag) => tag.autopayArray),
    ...filteredLoanArray.flatMap((loan) => loan.autopayArray),
  ];

  return (
    <div className="autopay-container">
      <div className="autopay-header">
        <h1>AutoPay</h1>
        <button className="autopay-button">Add AutoPay</button>
      </div>
      <div className="autopay-list">
        {Autopays.map((autopay) => (
          <IndividualAutoPay autopay={autopay} key={autopay._id} />
        ))}
      </div>
    </div>
  );
}
