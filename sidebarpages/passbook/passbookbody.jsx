import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentArray } from "../../store/paymentArraySlice";
import AddPayment from "./addpayment";
import PastPaymentCard from "./pastpaymentcard";
import "./passbookbody.css";

const PassbookBody = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const dispatch = useDispatch();
  const paymentArray = useSelector((state) => state.paymentArray.value);

  useEffect(() => {
    dispatch(getPaymentArray());
  }, [dispatch]);

  const getWeekRange = (date) => {
    const start = new Date(date);
    const end = new Date(date);
    const day = start.getDay();
    start.setDate(start.getDate() - day + (day === 0 ? -6 : 1));
    end.setDate(start.getDate() + 6);
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const segregatePayments = (payments) => {
    const now = new Date();
    const futurePayments = [];
    const pastPayments = {};

    payments.forEach((payment) => {
      const date = new Date(payment.date);
      if (date > now) {
        futurePayments.push(payment);
      } else {
        const week = getWeekRange(date);
        if (!pastPayments[week]) pastPayments[week] = [];
        pastPayments[week].push(payment);
      }
    });

    futurePayments.sort((a, b) => new Date(a.date) - new Date(b.date));
    Object.values(pastPayments).forEach((list) =>
      list.sort((a, b) => new Date(b.date) - new Date(a.date))
    );

    const sortedPast = Object.keys(pastPayments)
      .sort((a, b) => new Date(b.split(" - ")[1]) - new Date(a.split(" - ")[1]))
      .reduce((acc, key) => {
        acc[key] = pastPayments[key];
        return acc;
      }, {});

    return { futurePayments, pastPayments: sortedPast };
  };

  const { futurePayments, pastPayments } = segregatePayments(paymentArray);

  return (
    <div className="passbook-body">
      <div className="passbook-header">
        <h2 className="passbook-title">Passbook</h2>
        <button
          className="add-payment-btn"
          onClick={() => setShowAddPayment(true)}
        >
          Add new payment
        </button>
      </div>

      {showAddPayment && (
        <AddPayment closePopup={() => setShowAddPayment(false)} />
      )}

      <h3 className="section-title">Payments</h3>
      <div className="payment-list">
        {futurePayments.length > 0 && (
          <>
            <h4 className="subsection-title">Future Payments</h4>
            {futurePayments.map((payment) => (
              <PastPaymentCard key={payment._id} payment={payment} />
            ))}
          </>
        )}
        {Object.entries(pastPayments).map(([week, list]) => (
          <div key={week} className="week-group">
            <h4 className="subsection-title">{week}</h4>
            {list.map((payment) => (
              <PastPaymentCard key={payment._id} payment={payment} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassbookBody;
