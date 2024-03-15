import React from "react";
import TrackingObject from "./Trackingobject";
import AddTrackingButton from "./addtrackingbutton";

function TrackingBody({ trackingArray }) {
  return (
    <div className="trackingbody">
      <AddTrackingButton />
      {trackingArray.map((trackingObject) => (
        <TrackingObject
          key={trackingObject._id}
          trackingObject={trackingObject}
        />
      ))}
    </div>
  );
}

export default TrackingBody;
