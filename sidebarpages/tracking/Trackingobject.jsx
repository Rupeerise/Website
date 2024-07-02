import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTagArray } from "../../store/tagArraySlice";
import ProgressBar from "../../boilerplates/progressbar";
import { useNavigate } from "react-router-dom";

function TrackingObject({ trackingObject }) {
  const targets = trackingObject.targets;

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const currenttarget = targets.find(
    (target) => target.month === month && target.year === year
  );
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/tag/" + trackingObject._id);
  };
  return (
    <div className="trackingobject" key={trackingObject._id} onClick={onClick}>
      <div className="trackingobjecttop">
        <div>{trackingObject.name}</div>
        <div>This month : 3000</div>
      </div>
      <div className="trackingobjectbottom">
        <div>Type: {trackingObject.tagType}</div>
        <div>Target: {currenttarget ? currenttarget.amount : 0}</div>
      </div>
    </div>
  );
}

export default TrackingObject;
