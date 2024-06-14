import React from "react";
import ProgressBar from "../../boilerplates/progressbar";

function TrackingObject({ trackingObject }) {
  const { id, name, current, target, type } = trackingObject;

  return (
    <div className="trackingobject" key={id}>
      <div className="trackingobjecttop">
        <div>
          {name} : {current}
        </div>
        <div>Target : {target}</div>
      </div>
      <div>
        <div>
          Type: {type} 
        </div>
      </div>
      <div className="tracking-progressbar">
        <ProgressBar value={(current * 100) / target} />
      </div>
      <div>
        <button className="tracking-edit">Edit</button>
        <button className="tracking-delete">Delete</button>
      </div>
    </div>
  );
}

export default TrackingObject;
