import * as React from "react";
import "./mainbody.css";
import Income from "../tracking/income";
import ButtonFlex from "./buttonflex";
import Mainchart from "./mainchart";
import Pichart from "./pichart";

export default function MainBody({ trackingArray }) {
  const names = trackingArray.map((item) => item.name);
  const current = trackingArray.map((item) => item.current);
  const target = trackingArray.map((item) => item.target);

  const [displayInfo, setDisplayInfo] = React.useState("current"); // default to 'current'

  const handleButtonClick = (infoType) => {
    if (infoType === "current") {
      setDisplayInfo("current");
    } else if (infoType === "target") {
      setDisplayInfo("target");
    }
  };

  return (
    <div className="mainbody">
      <ButtonFlex />
      <div
        className=""
        style={{ height: "20rem", width: "30rem", display: "inline-block" }}
      >
        <Mainchart labels={names} current={current} target={target} />
      </div>
      <button onClick={() => handleButtonClick("current")}>Current</button>
      <button onClick={() => handleButtonClick("target")}>Target</button>
      <div
        className=""
        style={{ height: "20rem", width: "30rem", display: "inline-block" }}
      >
        <Pichart
          labels={names}
          current={current}
          target={target}
          displayInfo={displayInfo}
        />
      </div>
      {trackingArray.map((item) => (
        <Income
          key={item._id}
          id={item._id}
          name={item.name}
          current={item.current}
          target={item.target}
          secondaryTracking={item.secondaryTracking}
        />
      ))}
    </div>
  );
}
