import * as React from "react";
import Navbar from "./navbar/navbar";
import CurrentDate from "./currentdate";

export default function Boilerplate({ setCollapsed, collapsed }) {
  return (
    <>
      <Navbar setCollapsed={setCollapsed} collapsed={collapsed} />
    </>
  );
}
