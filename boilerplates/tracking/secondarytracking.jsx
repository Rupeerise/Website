import React from "react";
import "./secondarytracking.css";
import ProgressBar from "../progressbar";

function SecondaryTracking({ name, current, target }) {
  return (
    <>
      <div className="secondaryTracking">
        <div className="secondaryTracking-item">
          <div className="secondaryTracking-item-title">{name}:</div>
          <div className="secondaryTracking-item-value">current:{current}</div>
          <div className="secondaryTracking-item-target">target:{target}</div>
        </div>
        <ProgressBar value={(current / target) * 100} />
      </div>
    </>
  );
}

export default SecondaryTracking;
