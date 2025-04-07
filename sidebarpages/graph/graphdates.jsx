import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setMonthStartAndEnd,
  setGraphType,
  setWeekStartAndEnd,
  setLastMonthStartAndEnd,
  setYearStartAndEnd,
} from "../../store/graphSlice";
import {
  isCurrentMonth,
  isCurrentWeek,
  isLastMonth,
  isCurrentYear,
} from "../../utilities/dateutilities";
import "./graphdates.css";

export default function GraphDates() {
  const enums = ["Current Month", "Current Week", "Last Month", "Current Year"];
  const [selectedValue, setSelectedValue] = useState("Current Month");
  let startdate = useSelector((state) => state.graph.startdate);
  let enddate = useSelector((state) => state.graph.enddate);
  let graphType = useSelector((state) => state.graph.graphType);

  startdate = new Date(startdate);
  enddate = new Date(enddate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMonthStartAndEnd());
  }, [dispatch]);

  const setDates = (value) => {
    setSelectedValue(value);
    switch (value) {
      case "Current Week":
        dispatch(setWeekStartAndEnd());
        break;
      case "Current Month":
        dispatch(setMonthStartAndEnd());
        break;
      case "Last Month":
        dispatch(setLastMonthStartAndEnd());
        break;
      case "Current Year":
        dispatch(setYearStartAndEnd());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isCurrentMonth(startdate, enddate)) {
      setSelectedValue("Current Month");
    } else if (isCurrentWeek(startdate, enddate)) {
      setSelectedValue("Current Week");
    } else if (isLastMonth(startdate, enddate)) {
      setSelectedValue("Last Month");
    } else if (isCurrentYear(startdate, enddate)) {
      setSelectedValue("Current Year");
    } else {
      setSelectedValue("none");
    }
  }, [startdate, enddate]);

  const handleDateChange = (e, isStartDate) => {
    const date = new Date(e.target.value);
    if (isStartDate) {
      dispatch(setStartDate(date.toISOString()));
    } else {
      dispatch(setEndDate(date.toISOString()));
    }
  };

  return (
    <div className="graphdates-container">
      <div className="horizontal-picker-container">
        {enums.map((item) => (
          <button
            key={item}
            className={`horizontal-picker-item ${
              selectedValue === item ? "selected-horizontal-picker-item" : ""
            }`}
            onClick={() => setDates(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="date-picker-container">
        <div>
        <label htmlFor="startdate">Start Date:</label>
          <input
           type="date"
           id="startdate"
           name="startdate"
           value={startdate.toISOString().split("T")[0]}
           onChange={(e) => handleDateChange(e, true)}
           onClick={(e) => e.target.showPicker && e.target.showPicker()} // 💡 Forces calendar open on some browsers
          />
        </div>
        <div>
          <label htmlFor="enddate">End Date:</label>
          <input
            type="date"
            id="enddate"
            name="enddate"
            value={enddate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(e, false)}
            onClick={(e) => e.target.showPicker && e.target.showPicker()} 
          />
        </div>
      </div>
      <div className="horizontal-picker-container">
        {["paid", "received"].map((item) => (
          <button
            key={item}
            className={`horizontal-picker-item ${
              graphType === item ? "selected-horizontal-picker-item" : ""
            }`}
            onClick={() => dispatch(setGraphType(item))}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
