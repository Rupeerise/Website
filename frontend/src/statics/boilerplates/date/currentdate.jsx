import * as React from "react";
import "./currentdate.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function CurrentDate() {
  let datenow = new Date();
  let dateout = datenow.toString().split(" ")[2];
  console.log();
  return (
    <>
      <div className="datecontainer">
        <CalendarMonthIcon fontSize="large" className="datecontainer-icon" />
        <p>
          {datenow.toString().split(" ")[2]} {datenow.toString().split(" ")[1]}
        </p>
      </div>
    </>
  );
}
