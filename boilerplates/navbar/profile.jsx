import * as React from "react";
import "./profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "./logout.jsx";
import { getUsername } from "../../store/usernameSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Profile() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username.value);
  const authorization = useSelector((state) => state.username.autorization);
  useEffect(() => {
    dispatch(getUsername());
  }, [dispatch]);

  return (
    <>
      <div className="profile-dropdown-container">
        <div className="navbar-profile">
          {authorization ? (
            <>
              <AccountCircleIcon
                className="navbar-profile-icon"
                fontSize="large"
              />
              <div className="navbar-profile-name">{username}</div>
            </>
          ) : (
            <a href="/login" className="navbar-signin">
              Sign In
            </a>
          )}
        </div>
        {authorization && (
          <div className="dropdown-content">
            <a className="profile-dropdown" href="/autopay">
              Autopay
            </a>
            <Logout />
          </div>
        )}
      </div>
    </>
  );
}
