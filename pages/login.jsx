import * as React from "react";
import { useState } from "react";
import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";

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

    let response = await fetch(backendUrl + "/login", {
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
      window.location = "/";
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-img"></div>
        <form action="Login" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="login-input">
            <PersonIcon className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={FormData.username}
              onChange={handleInputChange}
              name="username"
            />
            <hr />
          </div>

          <div className="login-input">
            <HttpsIcon className="icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
            />
            <hr />
          </div>

          <div className="login-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/">Forgot Password?</a>
          </div>

          <div className="login-button-container"></div>
          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-register">
            Don't have an account? <a href="/signup">Register</a>
          </p>
        </form>
      </div>
    </>
  );
}
