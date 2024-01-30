import * as React from "react";
import "./addpayment.css";

export default function AddPayment() {
  const [form, setForm] = React.useState({ name: "", target: "" });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    // Make a POST request to /addpayment
    const response = await fetch(backendUrl + "/addpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
    } else {
      console.error("Error submitting form");
    }

    setForm({ name: "", target: "" });
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
          name="target"
          className="add-payment-input-box"
          placeholder="target/month"
          value={form.target}
          onChange={handleChange}
        />
        <button type="submit" className="add-payment-button">
          Add Payment
        </button>
      </form>
    </div>
  );
}
