import * as React from "react";
import "./income.css";
import ProgressBar from "./progressbar";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Income({ name, current, target }) {
  const progressValue = (current / target) * 100;

  return (
    <div className="income-card">
      <div className="income-card-title">
        <div className="income-card-title-name">{name} :</div>
        <div className="income-card-title-value">{target}</div>
        <EditRoundedIcon style={{ fontSize: "1.5rem", marginLeft: "auto" }} />
        <MoreVertIcon style={{ fontSize: "1.5rem", marginLeft: "0.3rem" }} />
      </div>
      <ProgressBar value={progressValue} />
      <button className="income-card-button">Show all</button>
    </div>
  );
}
