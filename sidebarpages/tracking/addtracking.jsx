import * as React from "react";
import "./addtracking.css";
import { addTag } from "../../store/tagArraySlice";
import { useDispatch } from "react-redux";

export default function AddTracking({ closePopup }) {
  const [form, setForm] = React.useState({
    name: "",
    target: "",
    tagType: "income",
    timePeriod: 0,
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(addTag(form));
    setForm({ name: "", target: "" });
  };

  return (
    <div className="add-tracking-container">
      <form onSubmit={handleSubmit}>
        <div className="add-tracking-header">Add new Tracking</div>
        <input
          type="text"
          name="name"
          className="add-tracking-input-box"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="target"
          className="add-tracking-input-box"
          placeholder="target per month"
          value={form.target}
          onChange={handleChange}
        />
        <select
          name="tagType"
          className="add-tracking-input-box"
          value={form.tagType}
          onChange={handleChange}
        >
          <option value="income">income</option>
          <option value="variable expense">variable expense</option>
          <option value="emi">emi</option>
          <option value="loan">loan</option>
          <option value="investment">investment</option>
        </select>
        <div className="tracking-button-container">
          <button type="submit" className="add-tracking-button-form">
            Add Tracking
          </button>
          <button
            type="button"
            onClick={closePopup}
            className="close-tracking-button"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
