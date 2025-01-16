import React from "react";
import { useSelector } from "react-redux";
import "./budget.css";

export default function IndividualLoanBudget({ loan }) {
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const graphType = useSelector((state) => state.budget.graphType);
  const filteredPayments = paymentArray.filter(
    (payment) => payment.loanid?._id === loan._id
  );

  const paymentsthismonth = filteredPayments.filter(
    (payment) =>
      new Date(payment.date).getMonth() === new Date().getMonth() &&
      new Date(payment.date).getFullYear() === new Date().getFullYear() &&
      payment.paymentType == graphType
  );
  const current = paymentsthismonth.reduce(
    (acc, payment) => acc + payment?.amount,
    0
  );
  return (
    <div className="individualloanbudget-container" key={loan._id}>
      <h2 className="individualloanbudget-title">{loan?.name}</h2>
      <p className="individualloanbudget-target">{current}</p>
    </div>
  );
}
