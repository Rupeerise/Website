import React from "react";
import TrackingObject from "./Trackingobject";
import AddTrackingButton from "./addtrackingbutton";
import "./tracking.css";

function TrackingBody({ trackingArray }) {
  return (  
    <div className="trackingbody">
      <AddTrackingButton />
      {trackingArray && trackingArray.length > 0 ? (
  trackingArray.map((trackingObject) => (
    <TrackingObject
      key={trackingObject._id}
      trackingObject={trackingObject}
    />
  ))
) : (
  <div>No tracking data available.</div>
)}
    </div>
  );
}

export default TrackingBody;