import * as React from "react";
import "./mainbody.css";
import Income from "./income";

export default function MainBody({ trackingArray }) {
  return (
    <div className="mainbody">
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
