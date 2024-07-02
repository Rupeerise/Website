import * as React from "react";
import "./addpayment.css";
import { addPayment } from "../../store/paymentArraySlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddPayment({ closePopup }) {
  const tagArray = useSelector((state) => state.tagArray.value);
  const currentDate = new Date().toISOString().split("T")[0];

  const [form, setForm] = React.useState({
    _id: tagArray[0]._id,
    amount: "",
    date: currentDate,
    paymentType: "credit",
    isDone: true,
  });

  const paymentTypeenum = ["credit", "debit"];
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPayment(form));
    closePopup();
  };

  return (
    <div className="add-payment-container">
      <form onSubmit={handleSubmit}>
        <div className="add-payment-header">Add new Payment</div>
        <select
          name="_id"
          className="add-payment-input-box"
          value={form.tagid}
          onChange={handleChange}
        >
          {tagArray.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="amount"
          className="add-payment-input-box"
          placeholder="amount"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="add-payment-input-box"
          value={form.date}
          onChange={handleChange}
        />
        <select
          name="paymentType"
          className="add-payment-input-box"
          value={form.paymentType}
          onChange={handleChange}
        >
          {paymentTypeenum.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="payment-button-container">
          <button type="submit" className="add-payment-button">
            Add Payment
          </button>
          <button
            type="button"
            onClick={closePopup}
            className="close-payment-button"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
