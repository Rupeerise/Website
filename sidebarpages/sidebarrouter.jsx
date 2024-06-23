import React, { useState, useEffect } from "react";
import Boilerplate from "./../boilerplates/boilerplate";
import Footer from "./../boilerplates/footer";
import Sidebar from "./../boilerplates/sidebar/sidebar";
import "./../pages/home.css";
// import "./passbook.css";
import PassbookBody from "./passbook/passbookbody";
import { useDispatch, useSelector } from "react-redux";
import { getUsername } from "../store/usernameSlice";
import TrackingBody from "./tracking/Trackingbody";
import GraphBody from "./graph/graphbody";

function SidebarRouter() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.username.value);

  useEffect(() => {
    dispatch(getUsername());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Boilerplate
        username={username ? username : ""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <div className="page-container">
        <Sidebar isOpen={isOpen} />
        {location.pathname === "/payment" && (
          <PassbookBody paymentArray={[]} />
        )}
        {location.pathname === "/tag" && <TrackingBody tagArray={[]} />}
        {location.pathname === "/" && <GraphBody tagArray={[]} />}
        {location.pathname === "/home" && <GraphBody />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SidebarRouter;
