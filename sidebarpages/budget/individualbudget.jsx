import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTarget } from "../../store/tagArraySlice";

export default function IndividualBudget({ tag }) {
  const target = tag.targets.find(
    (target) =>
      target.month === new Date().getMonth() &&
      target.year === new Date().getFullYear()
  )?.amount;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: target.toString(),
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
    <div style={styles.container} key={tag._id}>
      <h2 style={styles.title}>{tag?.name}</h2>
      <input
        type="number"
        style={styles.input}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        value={form.amount}
        onBlur={() => dispatch(updateTarget(form))}
      />
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: "40px",
    margin: "12px",
    borderWidth: "1px",
  },
};
