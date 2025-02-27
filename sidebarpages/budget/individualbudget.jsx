import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTarget } from "../../store/tagArraySlice";
import "./budget.css";

export default function IndividualBudget({ tag }) {
  const target = tag.targets.find(
    (target) =>
      target.month === new Date().getMonth() &&
      target.year === new Date().getFullYear()
  )?.amount;
  const dispatch = useDispatch();

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

  return (
    <div className="individualbudget-container" key={tag._id}>
      <h2 className="individualbudget-title">{tag?.name}</h2>
      <input
        type="number"
        className="individualbudget-input"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        value={form.amount}
        onBlur={() => dispatch(updateTarget(form))}
      />
    </div>
  );
}
