import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setMonthStartAndEnd,
  changePaymentType,
  setWeekStartAndEnd,
} from "../../store/graphSlice";
import "./graphdates.css";

export default function GraphDates() {
  let startdate = useSelector((state) => state.graph.startdate);
  let enddate = useSelector((state) => state.graph.enddate);
  let paymentType = useSelector((state) => state.graph.paymentType);

  const enums = ["none", "Current Month", "Current Week"];

  const formatDateToInputValue = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Convert month to 2 digits
    const day = date.getDate().toString().padStart(2, "0"); // Convert day to 2 digits
    return `${year}-${month}-${day}`;
  };

  // Format dates for input value
  startdate = formatDateToInputValue(startdate);
  enddate = formatDateToInputValue(enddate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMonthStartAndEnd());
  }, []);

  const paymentenums = ["credit", "debit"];

  const [filter, setFilter] = useState("Current Month");
  const filterchange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Current Month") {
      dispatch(setMonthStartAndEnd());
    } else if (e.target.value === "Current Week") {
      dispatch(setWeekStartAndEnd());
    }
    setFilter(e.target.value);
  };

  // check if startdate and enddate are month start and end and same for week
  useEffect(() => {
    const teststartdate = new Date(startdate);
    const testenddate = new Date(enddate);
    if (
      testenddate.getDate() ==
        new Date(
          testenddate.getFullYear(),
          testenddate.getMonth() + 1,
          0
        ).getDate() &&
      teststartdate.getDate() == 1 &&
      teststartdate.getMonth() == testenddate.getMonth()
    ) {
      setFilter("Current Month");
    } else if (
      teststartdate.getDate() == testenddate.getDate() - testenddate.getDay() &&
      testenddate.getDate() ==
        teststartdate.getDate() + 6 - teststartdate.getDay()
    ) {
      setFilter("Current Week");
    } else {
      setFilter("none");
    }
  }, [startdate, enddate]);

  return (
    <>
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
      <div className="graphdates">
        <div>
          <label htmlFor="paymentType">Payment Type:</label>
          <select
            id="paymentType"
            name="paymentType"
            value={paymentType}
            onChange={(e) => {
              dispatch(changePaymentType(e.target.value));
            }}
          >
            {paymentenums.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => {
              filterchange(e);
            }}
          >
            {enums.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
