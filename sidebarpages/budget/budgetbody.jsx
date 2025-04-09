import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IndividualBudget from "./individualbudget";
import IndividualLoanBudget from "./individualloanbudget";
import BudgetGraph from "./budgetgraph";
import GraphLoader from "./graphloader";
import NoBudgetDisplay from "./nobudgetdisplay";
import "./budgetbody.css";

export default function BudgetBody() {
  const [isBudgetLoading, setIsBudgetLoading] = useState(true);
  const [showGraph, setShowGraph] = useState(true);

  const graphType = useSelector((state) => state.budget.graphType);
  const tagStatus = useSelector((state) => state.tagArray.status);
  const loanStatus = useSelector((state) => state.loanArray.status);

  const allTags = useSelector((state) => state.tagArray.value);
  const allLoans = useSelector((state) => state.loanArray.value);

  let tagArray = [...allTags];
  let loanArray = [...allLoans];

  // Filter data based on graph type
  if (graphType === "paid") {
    tagArray = tagArray.filter((tag) => tag.tagType === "expense");
    loanArray = loanArray.filter(
      (loan) =>
        loan.tagType === "loan" ||
        loan.tagType === "emi" ||
        loan.tagType === "investment"
    );
  }

  if (graphType === "received") {
    tagArray = tagArray.filter((tag) => tag.tagType === "income");
    loanArray = loanArray.filter(
      (loan) => loan.tagType === "investment" || loan.tagType === "loan"
    );
  }

  useEffect(() => {
    if (tagStatus === "loading" || loanStatus === "loading") {
      setIsBudgetLoading(true);
    } else if (tagStatus === "success" && loanStatus === "success") {
      setIsBudgetLoading(false);
    }
  }, [tagStatus, loanStatus]);

  useEffect(() => {
    if (tagArray.length === 0 && loanArray.length === 0) {
      setShowGraph(false);
    } else {
      setShowGraph(true);
    }
  }, [tagArray, loanArray]);

  return (
    <div className="budget-body">
      {isBudgetLoading ? (
        <GraphLoader />
      ) : !showGraph ? (
        <NoBudgetDisplay />
      ) : (
        <div className="budget-content">
          <div className="budget-graph-section">
            <BudgetGraph />
          </div>
          
          <div className="budget-items-section">
            {tagArray.map((tag) => (
              <IndividualBudget tag={tag} key={tag._id} />
            ))}
            {loanArray.map((loan) => (
              <IndividualLoanBudget loan={loan} key={loan._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}