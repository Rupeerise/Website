import * as React from "react";
import "./login.css"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';

export default function Login(){
  return(
    <>
      <div className="login-container">
        <div className="login-img">
          
        </div>
        <form action="Login">
          <h1>Login</h1>
          <div className="login-input">
            <PersonIcon className="icon" />
            <input type="text" placeholder="Username"/>
            <hr />
          </div>
          <div className="login-input">
            <HttpsIcon className="icon" />
            <input type="password" placeholder="Password"/>
            <hr />
          </div>

          <div className="login-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="/">Forgot Password?</a>
          </div>

          <div className="login-button-container"></div>
          <button type="submit" className="login-button">Login</button>

          <p className="login-register">Don't have an account? <a href="/">Register</a></p>
        </form>
      </div>
    </>
  )
}