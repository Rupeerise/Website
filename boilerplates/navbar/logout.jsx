import * as React from "react";

export default function Logout() {
  const logout = async () => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    let response = await fetch(backendUrl + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This is required for cookies to be sent with the request
    });

    if (response.ok) {
      console.log("Logged out successfully");
      window.location = "/login";
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  };

  return (
    <>
      <button className="profile-dropdown" onClick={logout}>
        Logout
      </button>
    </>
  );
}
