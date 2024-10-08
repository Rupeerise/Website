import React, { useState, useEffect } from "react";
import Boilerplate from "../../boilerplates/boilerplate";
import Footer from "../../boilerplates/footer";
import Sidebar from "../../boilerplates/sidebar/sidebar";
import "../../pages/home.css";
import TrackingBody from "./Trackingbody";
import "./tracking.css";

function Tracking() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      let backendUrl = import.meta.env.VITE_TEST_BACKEND;
      let response = await fetch(backendUrl + "/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is required for cookies to be sent with the request
      });

      if (response.ok) {
        let jsonResponse = await response.json();
        setUser(jsonResponse);
      } else {
        console.log("HTTP-Error: " + response.status);
        if (response.status === 401) {
          window.location = "/login";
        }
      }
    };

    fetchUser();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Boilerplate
        username={user ? user.username : ""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <div className="page-container">
        <Sidebar isOpen={isOpen} />
        <TrackingBody tagArray={user ? user.tagArray : []} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Tracking;
