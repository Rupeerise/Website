import React, { useState, useEffect } from "react";
import Boilerplate from "./../boilerplates/boilerplate";
import Footer from "./../boilerplates/footer";
import Sidebar from "./../boilerplates/sidebar/sidebar";
import "./../pages/home.css";
// import "./passbook.css";
import PassbookBody from "./passbook/passbookbody";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./../store/userSlice";
import TrackingBody from "./tracking/Trackingbody";
import GraphBody from "./graph/graphbody";

function SidebarRouter() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
        {location.pathname === "/passbook" && (
          <PassbookBody paymentArray={user ? user.paymentArray : []} />
        )}
        {location.pathname === "/tracking" && (
          <TrackingBody trackingArray={user ? user.trackingArray : []} />
        )}
        {location.pathname === "/" && (
          <GraphBody trackingArray={user ? user.trackingArray : []} />
        )}
        {location.pathname === "/home" && <GraphBody />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SidebarRouter;
