import React from "react";
import TrackingObject from "./Trackingobject";

function TrackingBody({ trackingArray }) {
  return (
    <div className="trackingbody">
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
