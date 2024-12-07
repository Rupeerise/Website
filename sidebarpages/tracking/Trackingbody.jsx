import React from "react";
import TrackingObject from "./Trackingobject";
import AddTrackingButton from "./addtrackingbutton";
import "./tracking.css";
import { useSelector } from "react-redux";
import IndividualLoan from "./individualloan";

function TrackingBody() {
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);
  return (
    <div className="trackingbody">
      <AddTrackingButton />
      {tagArray && tagArray.length > 0 ? (
        tagArray.map((trackingObject) => (
          <TrackingObject
            key={trackingObject._id}
            trackingObject={trackingObject}
          />
        ))
      ) : (
        <div>No tracking data available.</div>
      )}
      {loanArray && loanArray.length > 0 ? (
        loanArray.map((loanObject) => (
          <IndividualLoan key={loanObject._id} loanObject={loanObject} />
        ))
      ) : (
        <div>No loan data available.</div>
      )}
    </div>
  );
}

export default TrackingBody;
