import * as React from "react";
import "./addsecondarytracking.css";

export default function AddSecondaryTracking({ id, name, closePopup }) {
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
    // Make a POST request to /addsecondarytracking
    const response = await fetch(backendUrl + "/addsecondarytracking/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...form, id }),
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
    <div className="add-secondary-tracking-container">
      <form onSubmit={handleSubmit}>
        <div className="add-secondary-tracking-header">
          Add new Secondary Tracking for {name}
        </div>
        <input
          type="text"
          name="name"
          className="add-secondary-tracking-input-box"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="target"
          className="add-secondary-tracking-input-box"
          placeholder="target/month"
          value={form.target}
          onChange={handleChange}
        />
        <div className="secondary-tracking-button-container">
          <button type="submit" className="add-secondary-tracking-button">
            Add Secondary Tracking
          </button>
          <button
            type="button"
            onClick={closePopup}
            className="close-secondary-tracking-button"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
