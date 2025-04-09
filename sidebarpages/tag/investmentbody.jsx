import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./investmentbody.css";
import InvestmentGraph from "./investmentgraph";
import { deleteLoan } from "../../store/loanArraySlice";
import UpdateLoan from "./updateloan";

function InvestmentBody() {
  const investmentArray = useSelector((state) => state.loanArray.value);
  const { id } = useParams();
  const investment = investmentArray.find(
    (investment) => investment._id === id
  );
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteLoan(id));
    window.location.href = "/tag";
  };
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  if (investment) {
    return (
      <div className="investmentbody">
        <div className="investment_tag">{investment.name}</div>
        

        <div className="loan-buttons">
        <div className="edit-btn" onClick={() => setIsUpdateModalVisible(true)}>
          Edit
        </div>
        <div className="delete-btn" onClick={handleDelete}>
          Delete
        </div>
        </div>


        {isUpdateModalVisible && (
          <UpdateLoan
            id={id}
            setIsUpdateModalVisible={setIsUpdateModalVisible}
          />
        )}
         
         <div className="investmentgraph-wrapper">
                 <InvestmentGraph id={id} />
          </div>
        
      </div>
    );
  } else {
    return (
      <div className="investmentbody">
        <h1 className="investment_tag">Investment Not Found</h1>
      </div>
    );
  }
}

export default InvestmentBody;
