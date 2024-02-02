import * as React from "react";
import "./mainbody.css";
import Income from "./income";
import AddPayment from "./addpayment";
import AddTracking from "./addtracking";

export default function MainBody({ trackingArray }) {
  return (
    <div className="mainbody">
      <AddPayment />
      <AddTracking />
      {trackingArray.map((item) => (
        <Income
          key={item._id}
          name={item.name}
          current={item.current}
          target={item.target}
        />
      ))}
    </div>
  );
}
