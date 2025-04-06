import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./tag.css"; // Ensure the correct CSS file is imported

function IndividualLoan({ loanObject }) {
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const thismonth = paymentArray.filter(
    (payment) =>
      payment.loanid?._id === loanObject?._id &&
      new Date(payment.date).getMonth() === month &&
      new Date(payment.date).getFullYear() === year &&
      payment.paymentType === "paid"
  );
  const thisMonthTotal = thismonth.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  const onClick = () => {
    if (loanObject?.tagType === "loan") {
      navigate("/loan/" + loanObject?._id);
    }
    if (loanObject?.tagType === "investment") {
      navigate("/investment/" + loanObject?._id);
    }
  };

  const [textColor, setTextColor] = useState("black");

  // Function to determine if a color is light or dark
  const isColorLight = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  // Update the text color once the color is available
  useEffect(() => {
    if (loanObject?.color) {
      setTextColor(isColorLight(loanObject?.color) ? "black" : "white");
    }
  }, [loanObject?.color]);

  return (
    <div
      className="tagobject"
      key={loanObject._id}
      onClick={onClick}
      style={{
        backgroundColor: loanObject?.color,
        cursor: "pointer",
        color: textColor,
      }}
    >
      <div className="tagobjecttop">
        <div>{loanObject?.name}</div>
        <div>Target: {thisMonthTotal}</div>
      </div>
      <div className="tagobjectbottom">
        <div>Type: {loanObject?.tagType}</div>
        <div>This month: {thisMonthTotal}</div>
      </div>
    </div>
  );
}

export default IndividualLoan;
