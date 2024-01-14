import * as React from "react";
import "./income.css";
import ProgressBar from "./progressbar";

export default function Income() {
  const progressValue = 60;
  return (
    <div className="income-card">
      <div className="income-card-title">
        <div className="income-card-title-name">Income :</div>
        <div className="income-card-title-value">100000</div>
      </div>
      <div className="income-card-content">
        <ProgressBar value={progressValue} />
      </div>
    </div>
  );
}
