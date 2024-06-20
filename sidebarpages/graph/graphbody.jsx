import * as React from "react";
import "./mainbody.css";
import Mainchart from "./mainchart";
import Pichart from "./pichart";
import Maintext from "./maintext";
import { useSelector } from "react-redux";

export default function GraphBody() {
  const user = useSelector((state) => state.user);
  let trackingArray = [];
  if (user && user.trackingArray) {
    trackingArray = user.trackingArray;
  }
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
      <div className="charts">
        <div className="barchart">
          <Mainchart labels={names} current={current} target={target} />
        </div>
        <div className="pichartcontainer">
          <div className="pichart">
            <Pichart
              labels={names}
              current={current}
              target={target}
              displayInfo={displayInfo}
            />
          </div>
          <button
            onClick={() => handleButtonClick("current")}
            className="pichartbutton"
            style={
              displayInfo === "current"
                ? { backgroundColor: "#34eb34", color: "black" }
                : {}
            }
          >
            Current
          </button>
          <button
            onClick={() => handleButtonClick("target")}
            className="pichartbutton"
            style={
              displayInfo === "target"
                ? { backgroundColor: "#34eb34", color: "black" }
                : {}
            }
          >
            Target
          </button>
        </div>
      </div>
      <Maintext />
    </div>
  );
}
