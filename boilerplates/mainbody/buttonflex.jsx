import React from "react";
import AddPaymentButton from "./addpaymentbutton";
import AddTrackingButton from "./addtrackingbutton";
import "./buttonflex.css";

export default function ButtonFlex() {
  return (
    <div className="button-flex">
      <AddPaymentButton />
      <AddTrackingButton />
    </div>
  );
}
