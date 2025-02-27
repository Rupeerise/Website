import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./individualautopay.css";
import SellIcon from "@mui/icons-material/Sell";

export default function IndividualAutoPay({ autopay }) {
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);

  const tag = tagArray.find((tag) => tag._id === autopay.tagid);
  const loan = loanArray.find((loan) => loan._id === autopay.loanid);

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div key={autopay._id} className="individual-autopay-container">
      <div className="individual-autopay-upper">
        <span className="individual-autopay-title">Name: {autopay?.name}</span>
        <span>Amount: {autopay?.amount}</span>
      </div>
      <div className="individual-autopay-lower">
        <span>Timeperiod: {autopay?.timePeriod}</span>
        <div className="individual-autopay-tag">
          <SellIcon style={{ color: tag?.color || loan?.color || "#000000" }} />
          <span>{tag?.name || loan?.name}</span>
        </div>
      </div>
      <button
        className="individual-autopay-button"
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </button>
      {isModalVisible && (
        <div className="modal">
          <button onClick={() => setIsModalVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
