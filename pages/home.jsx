import React, { useState, useEffect } from "react";
import Boilerplate from "../boilerplates/boilerplate";
import Sidebar from "../boilerplates/sidebar/sidebar";
import MainBody from "../sidebarpages/graph/graphbody";
import Footer from "../boilerplates/footer";
import "./home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const backendUrl = import.meta.env.VITE_TEST_BACKEND;
        const response = await fetch(`${backendUrl}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("HTTP-Error:", response.status);
          if (response.status === 401) window.location = "/login";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <Boilerplate isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="page-container">
        <Sidebar isOpen={isOpen} />
        <MainBody trackingArray={user?.trackingArray || []} />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
