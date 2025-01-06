import React, { useEffect } from "react";
import "./graphbody.css";
import Mainchart from "./mainchart";
import GraphDates from "./graphdates";
import Pichart from "./pichart";

export default function GraphBody() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mainbody">
      <GraphDates />
      <Mainchart />
      <Pichart />
    </div>
  );
}
