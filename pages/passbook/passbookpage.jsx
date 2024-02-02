import React, { useState, useEffect } from "react";
import Boilerplate from "../../boilerplates/boilerplate";
import Footer from "../../boilerplates/footer";
import PassbookBody from "./passbookbody.jsx";

function Passbookpage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      let backendUrl = import.meta.env.VITE_TEST_BACKEND;
      let response = await fetch(backendUrl + "/user", {
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

  return (
    <>
      <div className="page-container">
        <Boilerplate username={user ? user.username : ""} />
        <PassbookBody PassbookArray={user ? user.paymentArray : []} />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Passbookpage;
