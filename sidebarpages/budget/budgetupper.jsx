import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGraphType } from "../../store/budgetSlice";

export default function BudgetUpper() {
  const graphType = useSelector((state) => state.budget.graphType);
  const graphTypeEnum = useSelector((state) => state.budget.graphTypeEnum);
  const dispatch = useDispatch();
  const changeGraphType = (graphType) => {
    dispatch(setGraphType(graphType));
  };
  const [selectedValue, setSelectedValue] = useState(graphType);

  return (
    <div>
      <div style={styles.horizontalPickerContainer}>
        {graphTypeEnum.map((graphType) => (
          <button
            key={graphType}
            style={{
              ...styles.horizontalPickerItem,
              ...(selectedValue === graphType
                ? styles.selectedHorizontalPickerItem
                : {}),
            }}
            onClick={() => {
              setSelectedValue(graphType);
              changeGraphType(graphType);
            }}
          >
            <span
              style={{
                ...styles.horizontalPickerText,
                ...(selectedValue === graphType
                  ? styles.selectedHorizontalPickerText
                  : {}),
              }}
            >
              {graphType === "paid" ? "Expense" : "Income"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  horizontalPickerContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "5px",
    marginVertical: "5px",
  },
  horizontalPickerItem: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    marginHorizontal: "5px",
    border: "none",
    cursor: "pointer",
  },
  selectedHorizontalPickerItem: {
    backgroundColor: "#007AFF",
  },
  horizontalPickerText: {
    color: "#000",
  },
  selectedHorizontalPickerText: {
    color: "#fff",
  },
};
