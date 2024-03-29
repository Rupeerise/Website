import React, { useState, useEffect } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import Boilerplate from "../../boilerplates/boilerplate";
import Footer from "../../boilerplates/footer";
import Sidebar from "../../boilerplates/sidebar/sidebar";
import "../../pages/home.css";
import Sip from "./calculators/SIP";
import Fd from "./calculators/Fd";
import Lumpsum from "./calculators/Lumpsum";

function CalculatorRouter() {
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
        <Routes>
          <Route path="sip" element={<Sip />} />
          <Route path="fd" element={<Fd />} />
          <Route path="lumpsum" element={<Lumpsum />} />
          <Route path="*" element={<h1>Error 404 Calculator Found</h1>} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default CalculatorRouter;
