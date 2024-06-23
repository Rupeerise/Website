import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTagArray } from "../../store/tagArraySlice";
import ProgressBar from "../../boilerplates/progressbar";

function TrackingObject({ trackingObject }) {
  const { _id, name, current, target, type } = trackingObject;

  const tagArray = useSelector((state) => state.tagArray);
  console.log(tagArray);

  return (
    <div className="trackingobject" key={_id}>
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
        <button onClick={() => window.location.href = "/tag/" + _id}>Edit</button>
      </div>
    </div>
  );
}

export default TrackingObject;