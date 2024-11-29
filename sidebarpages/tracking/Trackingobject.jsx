import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTagArray } from "../../store/tagArraySlice";
import ProgressBar from "../../boilerplates/progressbar";
import { useNavigate } from "react-router-dom";

function TrackingObject({ trackingObject }) {
  const targets = trackingObject?.targets;

  const currency = useSelector((state) => state.currency.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const currenttarget = targets.find(
    (target) => target.month === month && target.year === year
  );
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/tag/" + trackingObject?._id);
  };

  const thismonth = paymentArray.filter(
    (payment) =>
      payment.tagid?._id === trackingObject?._id &&
      new Date(payment.date).getMonth() === month &&
      new Date(payment.date).getFullYear() === year
  );
  const thisMonthTotal = thismonth.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );
  const [textColor, setTextColor] = useState("black");

  // Function to determine if a color is light or dark
  const isColorLight = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  // Update the text color once the color is available
  useEffect(() => {
    if (trackingObject?.color) {
      setTextColor(isColorLight(trackingObject?.color) ? "black" : "white");
    }
  }, [trackingObject?.color]);
  return (
    <div
      className="trackingobject"
      key={trackingObject._id}
      onClick={onClick}
      style={{
        backgroundColor: trackingObject?.color,
        cursor: "pointer",
        color: textColor,
      }}
    >
      <div className="trackingobjecttop">
        <div>{trackingObject?.name}</div>
        <div>This month : {thisMonthTotal}</div>
      </div>
      <div className="trackingobjectbottom">
        <div>Type: {trackingObject?.tagType}</div>
        <div>Target: {currenttarget ? currenttarget.amount : 0}</div>
      </div>
    </div>
  );
}

export default TrackingObject;
