import * as React from "react";
import Navbar from "./navbar";
import CurrentDate from "./currentdate";
import AddTracking from "./addtracking";
import AddPayment from "./addpayment";

export default function Boilerplate({ username }) {
  return (
    <>
      <Navbar username={username} />
      <AddPayment />
      <AddTracking />
      <CurrentDate />
    </>
  );
}
