import * as React from "react";
import "./mainbody.css";
import Income from "../tracking/income";
import ButtonFlex from "./buttonflex";

export default function MainBody({ trackingArray }) {
  return (
    <div className="mainbody">
      <ButtonFlex />
      {trackingArray.map((item) => (
        <Income
          key={item._id}
          id={item._id}
          name={item.name}
          current={item.current}
          target={item.target}
        />
      ))}
    </div>
  );
}
