import React from "react";
import { Link } from "react-router-dom";
import "./calculator.css";
import CalculatorCard from "./Calculatorcard";

const cardValues = [
  {
    title: "SIP",
    content:
      "Calculate wealth gained by investing in SIP. Compare returns with inflation.",
    footer: "footer",
    path: "/calculator/sip",
  },
  {
    title: "Lumpsum",
    content:
      "Calculate wealth gained by investing in Lumpsum amount. Compare returns with inflation.",
    footer: "footer",
    path: "/calculator/lumpsum",
  },
  {
    title: "FD",
    content:
      "Calculate wealth gained by investing in Fixed Deposit. Compare returns with inflation.",
    footer: "footer",
    path: "/calculator/fd",
  },
];

function CalculatorBody() {
  return (
    <div className="calculatorbody">
      {cardValues.map((card, index) => (
        <Link to={card.path} key={index}>
          <CalculatorCard
            title={card.title}
            content={card.content}
            footer={card.footer}
          />
        </Link>
      ))}
    </div>
  );
}

export default CalculatorBody;
