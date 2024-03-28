import React from "react";

function CalculatorCard({ title, content, footer }) {
  return (
    <div className="calculatorcard">
      <div className="calculatorcardtitle">{title}</div>
      <div className="calculatorcardcontent">{content}</div>
      <div className="calculatorcardfooter">{footer}</div>
    </div>
  );
}

export default CalculatorCard;
