import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoan } from "../../store/loanArraySlice";
import { HexColorPicker } from "react-colorful";
import "./updateloan.css";

export default function UpdateLoan({ id, setIsUpdateModalVisible }) {
  const loanArray = useSelector((state) => state.loanArray.value);
  const loan = loanArray.find((loan) => loan._id === id);
  const [updatedLoan, setUpdatedLoan] = useState({
    name: loan.name,
    color: loan.color,
    amount: loan.amount,
    interestRate: loan.interestRate,
    _id: loan._id,
  });
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setUpdatedLoan((prevLoan) => ({
      ...prevLoan,
      [field]: value,
    }));
  };
  
  const handleUpdateLoan = () => {
    dispatch(updateLoan(updatedLoan));
    setIsUpdateModalVisible(false);
  };

  return (
    <div className="update-loan-modal">
      <div className="update-loan-content">
        <HexColorPicker
          color={updatedLoan.color}
          onChange={(color) => handleChange("color", color)}
          className="update-loan-color-picker"
        />
        <input
          type="text"
          value={updatedLoan.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Name"
          className="update-loan-input"
        />
        {/* <input
          type="number"
          value={updatedLoan.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Amount"
          className="update-loan-input"
        /> */}
        {["emi", "loan"].includes(loan.type) ? (
          <input
            type="number"
            value={updatedLoan.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="Amount"
            className="update-loan-input"
          />
        ) : (
          <></>
        )}
        <input
          type="number"
          value={updatedLoan.interestRate}
          onChange={(e) => handleChange("interestRate", e.target.value)}
          placeholder="Interest Rate"
          className="update-loan-input"
        />
        <div className="update-loan-buttons">
          <button onClick={handleUpdateLoan} className="update-loan-button">
            Update Loan
          </button>
          <button
            onClick={() => setIsUpdateModalVisible(false)}
            className="update-loan-button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
