import * as React from "react";
import "./addtracking.css";

export default function AddTracking() {
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
    // Make a POST request to /addtracking
    const response = await fetch(backendUrl + "/addtracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      location.reload(true);
    } else {
      console.error("Error submitting form");
    }

    setForm({ name: "", target: "" });
  };

  return (
    <div className="add-tracking-container">
      <form onSubmit={handleSubmit}>
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
          placeholder="target/month"
          value={form.target}
          onChange={handleChange}
        />
        <button type="submit" className="add-tracking-button">
          Add Tracking
        </button>
      </form>
    </div>
  );
}
