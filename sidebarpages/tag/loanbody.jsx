import React, { useState } from "react";
import "./loanbody.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loangraph from "./loangraph";
import PastPaymentCard from "../passbook/pastpaymentcard";
import UpdateLoan from "./updateloan";
import { deleteLoan } from "../../store/loanArraySlice";

function Loanbody() {
  const loanArray = useSelector((state) => state.loanArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const { id } = useParams();
  const loan = loanArray.find((loan) => loan._id === id);
  const payments = paymentArray.filter((payment) => payment.loanid?._id === id);

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteLoan(id));
    window.location.href = "/tag";
  };

  return (
  
         <div className="loan-body-main">
            <div className="loan-details">
              <div className="loan-info-header">
                <h2>{loan.name}</h2>
                <div className="loan-amount-interest">
                  <span>Amount: ₹{loan.amount}</span>
                  <span>Interest Rate: {loan.interestRate}%</span>
                </div>
               </div>
              </div>

              <div className="loan-buttons">
                <button className="edit-btn" onClick={() => setIsUpdateModalVisible(true)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>

              {isUpdateModalVisible && (
                <UpdateLoan id={id} setIsUpdateModalVisible={setIsUpdateModalVisible} />
              )}

              <div className="loangraph-wrapper">
                <Loangraph id={id} />
              </div>

              {/* <div className="loan-tabs">
                <button className="tab active">Paid</button>
                <button className="tab">Remaining</button>
              </div> */}

              <div className="loanbody-payments">
                {payments.map((payment) => (
                  <PastPaymentCard key={payment._id} payment={payment} />
                ))}
              </div>
            
          </div>
        
      
  );
}

export default Loanbody;
