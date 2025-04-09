import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTarget } from "../../store/tagArraySlice";
import "./individualbudget.css";

export default function IndividualBudget({ tag }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  
  const target = tag.targets.find(
    (target) =>
      target.month === new Date().getMonth() &&
      target.year === new Date().getFullYear()
  )?.amount;

  const [form, setForm] = useState({
    amount: target ? target.toString() : "0",
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    _id: tag.targets.find(
      (target) =>
        target.month === new Date().getMonth() &&
        target.year === new Date().getFullYear()
    )?._id,
    tagid: tag._id,
  });

  const handleSave = () => {
    dispatch(updateTarget(form));
    setIsEditing(false);
  };

  return (
    <div className="individualbudget-container" key={tag._id}>
      <h2 className="individualbudget-title">{tag?.name}</h2>
      
      <div className="individualbudget-right-section">
        {isEditing ? (
          <div className="individualbudget-edit-container">
            <input
              type="number"
              className="individualbudget-input"
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              value={form.amount}
              onBlur={handleSave}
              placeholder="Enter Target Amount"
              autoFocus
            />
          </div>
        ) : (
          <div className="individualbudget-value">
            ${form.amount}
          </div>
        )}
        
        <button 
          className="individualbudget-edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}