import React, { useEffect, useState } from "react";
import "./graphbody.css";
import Mainchart from "./mainchart";
import GraphDates from "./graphdates";
import Pichart from "./pichart";
import { useSelector } from "react-redux";
import GraphLoader from "./graphloader";
import Nographdisplay from "./nographdisplay";
import { processGraphData } from "./graphfunction";

function GraphBody() {
  const [isGraph, setIsGraph] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const loanArray = useSelector((state) => state.loanArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const tagArray = useSelector((state) => state.tagArray.value);
  let startdate = useSelector((state) => state.graph.startdate);
  let enddate = useSelector((state) => state.graph.enddate);
  let graphType = useSelector((state) => state.graph.graphType);
  let loanStatus = useSelector((state) => state.loanArray.status);
  let paymentStatus = useSelector((state) => state.paymentArray.status);
  let tagStatus = useSelector((state) => state.tagArray.status);

  const {
    labelsPaid,
    dataPaid,
    colorsPaid,
    labelsReceived,
    dataReceived,
    colorsReceived,
  } = processGraphData({
    tagArray,
    graphType,
    loanArray,
    paymentArray,
    startdate,
    enddate,
  });

  useEffect(() => {
    if (
      loanStatus === "success" &&
      paymentStatus === "success" &&
      tagStatus === "success"
    ) {
      setIsLoading(false);
    }
    if (
      loanStatus === "loading" ||
      paymentStatus === "loading" ||
      tagStatus === "loading"
    ) {
      setIsLoading(true);
    }
  }, [loanStatus, paymentStatus, tagStatus]);

  useEffect(() => {
    if (labelsPaid.length === 0 && graphType == "paid") {
      setIsGraph(false);
    } else if (labelsReceived.length === 0 && graphType == "received") {
      setIsGraph(false);
    } else {
      setIsGraph(true);
    }
  }, [labelsPaid, labelsReceived]);

  return (
    <div className="mainbody">
      <GraphDates />
      {isLoading ? (
        <div className="graphcontainer">
          <GraphLoader />
        </div>
      ) : isGraph ? (
        <div className="graphcontainer">
          <Mainchart />
          <Pichart />
        </div>
      ) : (
        <Nographdisplay />
      )}
    </div>
  );
}

export default  GraphBody;