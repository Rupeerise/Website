import * as React from "react";
import { useState } from "react";
import "./signup.css";
import { currencyArray } from "../utilities/currency";

export default function Signup() {
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
      setFormData({ username: "", password: "", currency: "INR" });
      const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
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
    const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
    if (redirectUrl) {
      window.location = redirectUrl;
    } else {
      window.location = "/login";
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create Your Account</h2>
        <input
          className="signup-input-field"
          type="text"
          name="username"
          placeholder="Username"
          value={FormData.username}
          onChange={handleInputChange}
        />
        <input
          className="signup-input-field"
          type="password"
          name="password"
          placeholder="Password"
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
        <button className="signup-button" type="submit">
          Sign Up
        </button>
        <button className="signup-button secondary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
