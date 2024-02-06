import React from "react";
import ProgressBar from "../progressbar";
import "./incomebottom.css";

function IncomeBottom({ current, target }) {
  // Get the current date
  const currentDate = new Date();

  // Get the current day of the month (1-31)
  const currentDay = currentDate.getDate();

  // Get the total number of days in the current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Calculate the progress value
  const progressValue = currentDay / daysInMonth;
  let idealValue = parseInt(target * progressValue);
  return (
    <div>
      <ProgressBar value={progressValue * 100} color={"#35e865"} />
      <div className="income-bottom-text">
        <div className="income-bottom-text-left">
          <div className="income-bottom-text-left-title">Current:</div>
          <div className="income-bottom-text-left-value">{current}</div>
        </div>
        <div className="income-bottom-text-right">
          <div className="income-bottom-text-right-title">Ideal Value:</div>
          <div className="income-bottom-text-right-value">{idealValue}</div>
        </div>
      </div>
    </div>
  );
}

export default IncomeBottom;
