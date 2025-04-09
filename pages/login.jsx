import * as React from "react";
import { useState } from "react";
import "./login.css";

export default function Login() {
  let backendUrl = import.meta.env.VITE_TEST_BACKEND;

  let [FormData, setFormData] = useState({
    username: "",
    password: "",
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
    let response = await fetch(backendUrl + "/api/login", {
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
      setFormData({ username: "", password: "" });
      const redirect = new URLSearchParams(window.location.search).get("redirect");
      window.location = redirect || "/";
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const redirect = new URLSearchParams(window.location.search).get("redirect");
    window.location = redirect
      ? `/signup?redirect=${encodeURIComponent(redirect)}`
      : "/signup";
  };

  const handleGoogle = async (event) => {
    event.preventDefault();
    const response = await fetch(backendUrl + "/api/auth/google/url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const jsonResponse = await response.json();
    window.location = jsonResponse.url;
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>

        <button type="button" className="login-button google" onClick={handleGoogle}>
          Continue with Google
        </button>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={FormData.username}
          onChange={handleInputChange}
          className="login-input-field"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={FormData.password}
          onChange={handleInputChange}
          className="login-input-field"
        />

        <button type="submit" className="login-button primary">
          Login
        </button>
        <button type="button" className="login-button secondary" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
}
