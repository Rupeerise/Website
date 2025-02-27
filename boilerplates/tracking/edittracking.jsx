import React, { useState, useEffect } from "react";
import "./edittracking.css";

function Edittracking({ initialName, initialTarget, id }) {
  const [form, setForm] = useState({
    name: initialName,
    target: initialTarget,
  });

  useEffect(() => {
    setForm({ name: initialName, target: initialTarget });
  }, [initialName, initialTarget]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    try {
      let response = await fetch(backendUrl + `/tracking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is required for cookies to be sent with the request
        body: JSON.stringify(form),
      });
      // Here you can handle the form submission, e.g. send the data to a server
      if (response.ok) {
        console.log("Form submitted");
        window.location.reload();
      } else {
        console.log("HTTP-Error: " + response.status);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="edit-tracking-input"
        />
        <input
          type="text"
          name="target"
          value={form.target}
          onChange={handleChange}
          className="edit-tracking-input"
        />
        <button type="submit" className="edit-tracking-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edittracking;
