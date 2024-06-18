import React from "react";
import TrackingObject from "./Trackingobject";
import AddTrackingButton from "./addtrackingbutton";
import "./tracking.css";

function TrackingBody({ tagArray }) {
  console.log(tagArray);
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
    </div>
  );
}

export default TrackingBody;