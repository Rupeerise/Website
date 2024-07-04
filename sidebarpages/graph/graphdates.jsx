import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setMonthStartAndEnd,
} from "../../store/graphSlice";
import "./graphdates.css";

export default function GraphDates() {
  let startdate = useSelector((state) => state.graph.startdate);
  let enddate = useSelector((state) => state.graph.enddate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMonthStartAndEnd());
  }, []);

  return (
    <div className="graphdates">
      <div>
        <label htmlFor="startdate">Start Date:</label>
        <input
          type="date"
          id="startdate"
          name="startdate"
          value={startdate}
          onChange={(e) => {
            dispatch(setStartDate(e.target.value));
          }}
        />
      </div>
      <div>
        <label htmlFor="enddate">End Date:</label>
        <input
          type="date"
          id="enddate"
          name="enddate"
          value={enddate}
          onChange={(e) => {
            dispatch(setEndDate(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
