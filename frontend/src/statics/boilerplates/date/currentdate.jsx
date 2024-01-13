import * as React from "react";
import "./currentdate.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function CurrentDate() {
  return (
    <>
      <div className="datecontainer">
        <CalendarMonthIcon fontSize="large" className="datecontainer-icon" />
      </div>
    </>
  );
}
