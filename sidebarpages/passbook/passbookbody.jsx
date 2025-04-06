import React, { useState, useEffect } from "react";
import "./passbookbody.css";
import AddPayment from "./addpayment";
import PastPaymentCard from "./pastpaymentcard";
import { getPaymentArray } from "../../store/paymentArraySlice";
import { useDispatch, useSelector } from "react-redux";

const PassbookBody = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const dispatch = useDispatch();
  const paymentArray = useSelector((state) => state.paymentArray.value);

  useEffect(() => {
    dispatch(getPaymentArray());
  }, [dispatch]);

  const startOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() + (6 - day);
    return new Date(date.setDate(diff));
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const segregatePayments = (payments) => {
    const futurePayments = [];
    const pastPayments = {};

    payments.forEach((payment) => {
      const paymentDate = new Date(payment.date);
      const currentDate = new Date();
      if (paymentDate > currentDate) {
        futurePayments.push(payment);
      } else {
        const weekStart = startOfWeek(new Date(paymentDate));
        const weekEnd = endOfWeek(new Date(paymentDate));
        const week = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
        if (!pastPayments[week]) {
          pastPayments[week] = [];
        }
        pastPayments[week].push(payment);
      }
    });

  // Sort future payments in ascending order (oldest first)
  futurePayments.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Sort past payments in each week from most recent to oldest
  Object.keys(pastPayments).forEach((week) => {
    pastPayments[week].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // Sort weeks in descending order (most recent first)
  const sortedPastPayments = Object.keys(pastPayments)
    .sort((a, b) => {
      const dateA = new Date(a.split(" - ")[1]); // End date of week
      const dateB = new Date(b.split(" - ")[1]);
      return dateB - dateA;
    })
    .reduce((acc, key) => {
      acc[key] = pastPayments[key];
      return acc;
    }, {});

  return { futurePayments, pastPayments: sortedPastPayments };
  };

  const { futurePayments, pastPayments } = segregatePayments(paymentArray);

  return (
    <div className="passbookpage-body">
      <div className="add-payment">
        <div className="add-payment-content">Passbook</div>
        <div
          className="passbookpage-addpayment"
          onClick={() => setShowAddPayment(true)}
        >
          Add new payment
        </div>
        {showAddPayment && (
          <AddPayment closePopup={() => setShowAddPayment(false)} />
        )}
      </div>
      <h2 className="passbookpage-text">Payments</h2>
      <div className="passbook-main">
        {futurePayments.length > 0 && (
          <>
            <h3>Future Payments</h3>
            {futurePayments.map((payment) => (
              <PastPaymentCard key={payment._id} payment={payment} />
            ))}
          </>
        )}
        {Object.keys(pastPayments).map((week) => (
          <div key={week} style={{ width: `100%` }}>
            <h3>{`${week}`}</h3>
            {pastPayments[week].map((payment) => (
              <PastPaymentCard key={payment._id} payment={payment} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassbookBody;
