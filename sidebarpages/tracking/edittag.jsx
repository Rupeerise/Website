import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { months } from "../../utilities/months";
import { useSelector } from "react-redux";
import "./tagfullinfo.css";
import { years } from "../../utilities/years";
import { addTarget, updateTarget } from "../../store/tagArraySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EditTag() {
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
    (target) => target.month === thismonth && target.thisyear
  )?._id;

  const [form, setForm] = useState({
    amount: amount.toString(),
    month: thismonth,
    year: thisyear,
    _id: _id,
    tagid: id,
  });
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
    navigate(`/tag/${id}`);
  };

  return (
    <div>
      <h1>Edit Tag</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </label>
        <label>
          Month:
          <select name="month" value={form.month} onChange={handleChange}>
            {months.map((month, index) => (
              <option key={month.value} value={month.value}>
                {month.month}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <select name="year" value={form.year} onChange={handleChange}>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
