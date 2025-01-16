import React from "react";
import { useSelector } from "react-redux";

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
    <div style={styles.container} key={loan._id}>
      <h2 style={styles.title}>{loan?.name}</h2>
      <p style={styles.target}>{current}</p>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
  target: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
};
