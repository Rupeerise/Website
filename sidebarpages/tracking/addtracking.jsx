import * as React from "react";
import "./addtracking.css";
import { addTag } from "../../store/tagArraySlice";
import { useDispatch } from "react-redux";
import { HexColorPicker } from "react-colorful";

export default function AddTracking({ closePopup }) {
  const [form, setForm] = React.useState({
    name: "",
    target: "",
    tagType: "income",
    color: "red",
    timePeriod: 0,
  });

  const dispatch = useDispatch();
  const formRef = React.useRef(null);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleColorChange = (color) => {
    setForm({
      ...form,
      color: color,
    });
    console.log(form.color);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(addTag(form));
    setForm({ name: "", target: "" });
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closePopup();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="add-tracking-container" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <div className="add-tracking-header">Add new Tracking</div>
        <HexColorPicker
          color={form.color}
          onChange={handleColorChange}
          className="add-tracking-color-input"
        />
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
          <option value="expense">expense</option>
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
