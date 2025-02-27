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
      // Clear the form
      setFormData({
        username: "",
        password: "",
      });
      const redirect = new URLSearchParams(window.location.search).get(
        "redirect"
      );
      if (redirect) {
        window.location = redirect;
        return;
      } else {
        window.location = "/";
      }
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const redirect = new URLSearchParams(window.location.search).get(
      "redirect"
    );
    if (redirect) {
      window.location = `/signup?redirect=${encodeURIComponent(redirect)}`;
    } else {
      window.location = "/signup";
    }
  };

  const handleGoogle = async (event) => {
    event.preventDefault();
    const backendUrl = import.meta.env.VITE_TEST_BACKEND;
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
    <>
      <form action="Login" onSubmit={handleSubmit} className="login-container">
        <h1>Login</h1>

        <button type="button" className="login-button" onClick={handleGoogle}>
          Google
        </button>

        <input
          type="text"
          placeholder="Username"
          value={FormData.username}
          onChange={handleInputChange}
          name="username"
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

        <button type="submit" className="login-button">
          Login
        </button>
        <button type="button" className="login-button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </>
  );
}
