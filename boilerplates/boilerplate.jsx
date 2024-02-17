import * as React from "react";
import Navbar from "./navbar/navbar";
import CurrentDate from "./currentdate";

export default function Boilerplate({ username }) {
  return (
    <>
      <Navbar username={username} />
      <CurrentDate />
    </>
  );
}
