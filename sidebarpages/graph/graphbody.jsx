import React, { useEffect } from "react";
import "./mainbody.css";
import Mainchart from "./mainchart";
import Pichart from "./pichart";
import { useSelector } from "react-redux";
import GraphDates from "./graphdates";

export default function GraphBody() {
  const tagArray = useSelector((state) => state.tagArray.value);
  const startdate = useSelector((state) => state.graph.startdate);
  const enddate = useSelector((state) => state.graph.enddate);
  const paymentType = useSelector((state) => state.graph.paymentType);
  // console.log(paymentType);

  const current = [];
  const names = tagArray.map((item) => item.name);

  let paymentArray = useSelector((state) => state.paymentArray.value);
  paymentArray = paymentArray.filter((item) => {
    return new Date(item.date) >= new Date(startdate) &&
      new Date(item.date) <= new Date(enddate)
      ? item
      : null;
  });

  for (let i = 0; i < tagArray.length; i++) {
    let currentnow = 0;
    for (let j = 0; j < paymentArray.length; j++) {
      if (
        paymentArray[j].tagid._id == tagArray[i]._id &&
        paymentArray[j].paymentType == paymentType
      ) {
        currentnow += paymentArray[j].amount;
      }
    }
    current.push(currentnow);
  }

  // console.log(trackingArray);
  const thismonth = new Date(startdate).getMonth();
  const thisyear = new Date(startdate).getFullYear();
  const target = [];
  const ifstartandendaremonth = () => {
    const teststartdate = new Date(startdate);
    const testenddate = new Date(enddate);
    if (teststartdate.getDate() != 1) {
      return false;
    }
    if (
      testenddate.getDate() !=
      new Date(
        testenddate.getFullYear(),
        testenddate.getMonth() + 1,
        0
      ).getDate()
    ) {
      return false;
    }
    if (teststartdate.getMonth() != testenddate.getMonth()) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const ifmonth = ifstartandendaremonth();
    if (ifmonth) {
      for (let i = 0; i < tagArray?.length; i++) {
        let targetnow = 0;
        for (let j = 0; j < tagArray[i].targets?.length; j++) {
          if (
            tagArray[i].targets[j].month == thismonth &&
            tagArray[i].targets[j].year == thisyear
          ) {
            targetnow = tagArray[i].targets[j].amount;
          }
        }
        target.push(targetnow);
      }
    } else {
      for (let i = 0; i < tagArray?.length; i++) {
        target.push(0);
      }
    }
  }),
    [startdate, tagArray];

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
