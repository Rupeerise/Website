import * as React from "react";
import Navbar from "./navbar";
import CurrentDate from "./currentdate";
import AddTracking from "./addtracking";

export default function Boilerplate({ username }) {
  return (
    <>
      <Navbar username={username} />
      <AddTracking />
      <CurrentDate />
    </>
  );
}
