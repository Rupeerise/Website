import * as React from "react";
import "./addpayment.css";

export default function AddPayment() {
  const [form, setForm] = React.useState({ name: "", amount: "" });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    let formsubmit = { ...form, date: new Date() };
    console.log(formsubmit);
    event.preventDefault();
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    // Make a POST request to /addpayment
    const response = await fetch(backendUrl + "/addpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formsubmit),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      location.reload(true);
    } else {
      console.error("Error submitting form");
    }

    setForm({ name: "", amount: "" });
  };

  return (
    <div className="add-payment-container">
      <form onSubmit={handleSubmit}>
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
          placeholder="amount/month"
          value={form.amount}
          onChange={handleChange}
        />
        <button type="submit" className="add-payment-button">
          Add Payment
        </button>
      </form>
    </div>
  );
}
