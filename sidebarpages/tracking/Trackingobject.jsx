import React from "react";
import ProgressBar from "../../boilerplates/progressbar";

function TrackingObject({ trackingObject }) {
  const { id, name, current, target } = trackingObject;

  return (
    <div className="trackingobject" key={id}>
      <div className="trackingobjecttop">
        <div>
          {name} : {current}
        </div>
        <div>Target : {target}</div>
      </div>
      <div className="tracking-progressbar">
        <ProgressBar value={(current * 100) / target} />
      </div>
    </div>
  );
}

export default TrackingObject;
