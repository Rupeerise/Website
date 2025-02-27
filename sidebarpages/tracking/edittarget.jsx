import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { months } from "../../utilities/months";
import { useSelector, useDispatch } from "react-redux";
import "./edittarget.css";
import { years } from "../../utilities/years";
import { addTarget, updateTarget } from "../../store/tagArraySlice";

export default function EditTarget({ closeEditTarget }) {
  const { id } = useParams();
  const tagArray = useSelector((state) => state.tagArray.value);
  const tag = tagArray.find((tag) => tag._id === id);

  const thismonth = new Date().getMonth();
  const thisyear = new Date().getFullYear();

  const targets = tag?.targets || [];

  const amount =
    targets.find(
      (target) => target.month === thismonth && target.year === thisyear
    )?.amount ?? 0;

  const _id = targets.find(
    (target) => target.month === thismonth && target.year === thisyear
  )?._id;

  const [form, setForm] = useState({
    amount: amount.toString(),
    month: thismonth,
    year: thisyear,
    _id: _id,
    tagid: id,
  });

  const formRef = useRef(null);

  const getamount = () => {
    const month = form.month;
    const year = form.year;
    const amount =
      targets.find((target) => target.month == month && target.year == year)
        ?.amount ?? 0;
    const _id = targets.find(
      (target) => target.month == month && target.year == year
    )?._id;
    setForm((prevForm) => ({
      ...prevForm,
      amount: amount.toString(),
      _id: _id,
    }));
  };

  useEffect(() => {
    getamount();
  }, [form.month, form.year]);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form._id) {
      dispatch(updateTarget(form));
    } else {
      dispatch(addTarget(form));
    }
    closeEditTarget();
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeEditTarget();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="edit-target-container" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <div className="edit-target-header">Edit Target</div>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            className="edit-target-input-box"
            value={form.amount}
            onChange={handleChange}
          />
        </label>
        <label>
          Month:
          <select
            name="month"
            className="edit-target-input-box"
            value={form.month}
            onChange={handleChange}
          >
            {months.map((month, index) => (
              <option key={month.value} value={month.value}>
                {month.month}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <select
            name="year"
            className="edit-target-input-box"
            value={form.year}
            onChange={handleChange}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <div className="target-button-container">
          <button type="submit" className="edit-target-button-form">
            Submit
          </button>
          <button
            type="button"
            onClick={closeEditTarget}
            className="close-target-button"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
