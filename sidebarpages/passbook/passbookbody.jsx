import React, { useState } from "react";
import "./passbookbody.css";
import AddPayment from "./addpayment";
import PastPaymentCard from "./pastpaymentcard";
import { getPaymentArray } from "../../store/paymentArraySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PassbookBody = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const dispatch = useDispatch();
  const paymentArray = useSelector((state) => state.paymentArray.value);
  useEffect(() => {
    dispatch(getPaymentArray());
  }, [dispatch]);
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
        {paymentArray.map((payment) => (
          <PastPaymentCard key={payment._id} payment={payment} />
        ))}
      </div>
    </div>
  );
};

export default PassbookBody;
