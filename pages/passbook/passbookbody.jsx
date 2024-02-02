import React from "react";
import Passbooklisting from "./passbooklisting";

export default function PassbookBody({ PassbookArray }) {
  return (
    <div>
      {PassbookArray.map((payment, index) => (
        <Passbooklisting key={index} payment={payment} />
      ))}
    </div>
  );
}
