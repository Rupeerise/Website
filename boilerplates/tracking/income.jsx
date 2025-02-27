import * as React from "react";
import { useState } from "react";
import "./income.css";
import ProgressBar from "../progressbar";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Edittracking from "./edittracking.jsx";
import IncomeBottom from "./incomebottom.jsx";
import Incomemore from "./incomemore.jsx";

export default function Income({
  name,
  current,
  target,
  id,
  secondaryTracking,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const progressValue = (current / target) * 100;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const [showIncomeBottom, setShowIncomeBottom] = useState(false);

  const handleButtonClick = () => {
    setShowIncomeBottom(!showIncomeBottom);
  };

  return (
    <div className="income-card">
      <div className="income-card-title">
        <div className="income-card-title-name">
          {isEditing ? (
            <Edittracking initialName={name} initialTarget={target} id={id} />
          ) : (
            `${name} :`
          )}
        </div>
        {!isEditing && <div className="income-card-title-value">{target}</div>}
        {isEditing ? (
          <CloseRoundedIcon
            style={{ fontSize: "1.5rem", marginLeft: "auto" }}
            onClick={handleCloseClick}
          />
        ) : (
          <EditRoundedIcon
            style={{ fontSize: "1.5rem", marginLeft: "auto" }}
            onClick={handleEditClick}
          />
        )}
        <Incomemore id={id} name={name} />
      </div>
      <ProgressBar value={progressValue} />
      {showIncomeBottom && (
        <IncomeBottom
          current={current}
          target={target}
          secondaryTracking={secondaryTracking}
        />
      )}
      <button className="income-card-button" onClick={handleButtonClick}>
        {showIncomeBottom ? "Close Info" : "Show all"}
      </button>
    </div>
  );
}
