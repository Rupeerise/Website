import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGraphType } from "../../store/budgetSlice";
import "./budget.css";

export default function BudgetUpper() {
  const graphType = useSelector((state) => state.budget.graphType);
  const graphTypeEnum = useSelector((state) => state.budget.graphTypeEnum);
  const dispatch = useDispatch();
  const changeGraphType = (graphType) => {
    dispatch(setGraphType(graphType));
  };
  const [selectedValue, setSelectedValue] = useState(graphType);

  return (
    <div className="budgetupper-horizontalPickerContainer">
      {graphTypeEnum.map((graphType) => (
        <button
          key={graphType}
          className={`budgetupper-horizontalPickerItem ${
            selectedValue === graphType
              ? "budgetupper-selectedHorizontalPickerItem"
              : ""
          }`}
          onClick={() => {
            setSelectedValue(graphType);
            changeGraphType(graphType);
          }}
        >
          <span
            className={`budgetupper-horizontalPickerText ${
              selectedValue === graphType
                ? "budgetupper-selectedHorizontalPickerText"
                : ""
            }`}
          >
            {graphType === "paid" ? "Expense" : "Income"}
          </span>
        </button>
      ))}
    </div>
  );
}
