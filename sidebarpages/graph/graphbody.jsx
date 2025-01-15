import React, { useEffect, useState } from "react";
import "./graphbody.css";
import Mainchart from "./mainchart";
import GraphDates from "./graphdates";
import Pichart from "./pichart";
import { useSelector } from "react-redux";

export default function GraphBody() {
  const [isGraph, setIsGraph] = useState(true);
  let startdate = useSelector((state) => state.graph.startdate);
  let enddate = useSelector((state) => state.graph.enddate);
  let graphType = useSelector((state) => state.graph.graphType);
  useEffect(() => {
    setIsGraph(true);
  }, [startdate, enddate, graphType]);
  return (
    <div className="mainbody">
      <GraphDates />
      {isGraph ? (
        <div className="graphcontainer">
          <Mainchart setIsGraph={setIsGraph} />
          <Pichart />
        </div>
      ) : (
        <div className="no-graph">
          There is no graph to display for this range
        </div>
      )}
    </div>
  );
}
