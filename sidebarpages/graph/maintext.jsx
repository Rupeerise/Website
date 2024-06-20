import React from "react";
import "./maintext.css";
import { useSelector } from "react-redux";

function Maintext() {
  const user = useSelector((state) => state.user);
  let budget = 1000;
  return (
    <>
      <div className="maintext">Your daily budget : {budget}</div>
      <div className="maintext">Emi : {budget}</div>
    </>
  );
}

export default Maintext;
