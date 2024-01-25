import * as React from "react";
import { useState } from "react";
import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";

export default function Login() {
  let backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

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

  // let handleSubmit = (event) => {
  //   event.preventDefault();

  //   setFormData({
  //     username: "",
  //     password: ""
  //   })
  // }

  let handleSubmit = async (event) => {
    event.preventDefault();
    // Send a request to the backend server
    const response = await fetch(backendUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });

    // If the login is successful, store the token
    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; HttpOnly`;
      window.location = "/";
    } else {
      // Handle error
      console.error("Login failed");
    }

    setFormData({
      username: "",
      password: "",
    });
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
            Don't have an account? <a href="/">Register</a>
          </p>
        </form>
      </div>
    </>
  );
}
