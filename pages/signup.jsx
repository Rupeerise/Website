import * as React from "react";
import { useState } from "react";
import "./signup.css";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";

export default function Login() {
  let [FormData, setFormData] = useState({
    fullname: "",
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
        fullname: "",
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
      <div className="signup-container">
        <div className="signup-img"></div>
        <form action="Login" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          <div className="signup-right">
            <div className="signup-input">
              <PersonIcon className="signup-icon" />
              <input
                className="signup-input-box"
                type="text"
                placeholder="Full Name"
                value={FormData.fullname}
                onChange={handleInputChange}
                name="fullname"
              />
            </div>
            <hr />

            <div className="signup-input">
              <PersonIcon className="signup-icon" />
              <input
                className="signup-input-box"
                type="text"
                placeholder="Username"
                value={FormData.username}
                onChange={handleInputChange}
                name="username"
              />
            </div>
            <hr />

            <div className="signup-input">
              <HttpsIcon className="signup-icon" />
              <input
                className="signup-input-box"
                type="password"
                placeholder="Password"
                name="password"
                value={FormData.password}
                onChange={handleInputChange}
              />
            </div>
            <hr />

            <div className="singup-button-container"></div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>

            <p className="signup-login">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
