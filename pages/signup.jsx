import * as React from "react";
import { useState } from "react";
import "./signup.css";
import { currencyArray } from "../utilities/currency";

export default function Signup() {
  console.log("Signup");
  let [FormData, setFormData] = useState({
    username: "",
    password: "",
    currency: "INR",
  });

  let handleInputChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value;
    setFormData((currData) => {
      currData[fieldName] = newValue;
      return { ...currData };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let backendServer = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendServer + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(FormData),
    });

    if (response.ok) {
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      // Clear the form
      setFormData({
        username: "",
        password: "",
        currency: "INR",
      });
      const redirectUrl = new URLSearchParams(window.location.search).get(
        "redirect"
      );
      if (redirectUrl) {
        window.location = redirectUrl;
        return;
      } else {
        window.location = "/";
      }
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const redirectUrl = new URLSearchParams(window.location.search).get(
      "redirect"
    );
    if (redirectUrl) {
      window.location = redirectUrl;
    } else {
      window.location = "/login";
    }
  };

  return (
    <>
      <form action="Login" onSubmit={handleSubmit} className="signup-container">
        <h1>Sign Up</h1>
        <input
          className="signup-input-field"
          type="text"
          placeholder="Username"
          value={FormData.username}
          onChange={handleInputChange}
          name="username"
        />

        <input
          className="signup-input-field"
          type="password"
          placeholder="Password"
          name="password"
          value={FormData.password}
          onChange={handleInputChange}
        />

        <select
          className="signup-input-field"
          name="currency"
          value={FormData.currency}
          onChange={handleInputChange}
        >
          {currencyArray.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>

        <button type="submit" className="signup-button">
          Sign Up
        </button>

        <button type="button" className="signup-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
}
