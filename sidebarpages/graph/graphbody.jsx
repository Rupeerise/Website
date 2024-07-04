import * as React from "react";
import "./mainbody.css";
import Mainchart from "./mainchart";
import Pichart from "./pichart";
import { useSelector } from "react-redux";
import GraphDates from "./graphdates";

export default function GraphBody() {
  const tagArray = useSelector((state) => state.tagArray.value);
  const trackingArray = [];
  const names = tagArray.map((item) => item.name);

  const paymentArray = useSelector((state) => state.paymentArray.value);

  for (let i = 0; i < tagArray.length; i++) {
    let current = 0;
    let target = 0;
    for (let j = 0; j < paymentArray.length; j++) {
      if (paymentArray[j].tagid._id == tagArray[i]._id) {
        current += paymentArray[j].amount;
      }
    }
    trackingArray.push(current);
  }

  // console.log(trackingArray);
  const current = trackingArray;
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
      <GraphDates />
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
    </div>
  );
}
