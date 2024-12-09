import React from "react";
import "./loanbody.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loangraph from "./loangraph";
import PastPaymentCard from "../passbook/pastpaymentcard";

function Loanbody() {
  const loanArray = useSelector((state) => state.loanArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);
  console.log(loanArray);
  const { id } = useParams();
  const loan = loanArray.find((loan) => loan._id === id);

  const payments = paymentArray.filter((payment) => payment.loanid?._id === id);

  return (
    <div className="loanbody">
      {loan && (
        <>
          <div className="">
            <h1 className="loan_tag">{loan?.name}</h1>
            <h2>Amount : {loan?.amount}</h2>
            <h2>Interest Rate : {loan?.interestRate}</h2>
            <Loangraph id={id} />
          </div>

          <div className="loanbody-payments">
            {payments.map((payment) => (
              <PastPaymentCard key={payment._id} payment={payment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Loanbody;
