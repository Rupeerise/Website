import * as React from "react";
import "./addpayment.css";
import { addPayment } from "../../store/paymentArraySlice";
import { useDispatch } from "react-redux";

export default function AddPayment({ closePopup }) {
  const [form, setForm] = React.useState({ name: "", amount: "" });

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
        <input
          type="text"
          name="name"
          className="add-payment-input-box"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          className="add-payment-input-box"
          placeholder="amount"
          value={form.amount}
          onChange={handleChange}
        />
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
