import React from "react";
import { useSelector } from "react-redux";
import IndividualBudget from "./individualbudget";
import IndividualLoanBudget from "./individualloanbudget";
import BudgetUpper from "./budgetupper";
import BudgetGraph from "./budgetgraph";
import "./budget.css";

export default function BudgetBody() {
  let tagArray = useSelector((state) => state.tagArray.value);
  let loanArray = useSelector((state) => state.loanArray.value);
  const graphType = useSelector((state) => state.budget.graphType);

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

  return (
    <div className="budgetbody-container">
      <BudgetUpper />
      <BudgetGraph />
      {tagArray.map((tag) => (
        <IndividualBudget tag={tag} key={tag._id} />
      ))}
      {loanArray.map((loan) => (
        <IndividualLoanBudget loan={loan} key={loan._id} />
      ))}
    </div>
  );
}
