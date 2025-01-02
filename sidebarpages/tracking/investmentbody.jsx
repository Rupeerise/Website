import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./investmentbody.css";
import InvestmentGraph from "./investmentgraph";

function InvestmentBody() {
  const investmentArray = useSelector((state) => state.loanArray.value);
  const { id } = useParams();
  const investment = investmentArray.find(
    (investment) => investment._id === id
  );
  if (investment) {
    return (
      <div className="investmentbody">
        <InvestmentGraph id={id} />
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
