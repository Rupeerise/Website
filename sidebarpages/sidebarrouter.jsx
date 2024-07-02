import React, { useState, useEffect } from "react";
import Boilerplate from "./../boilerplates/boilerplate";
import Footer from "./../boilerplates/footer";
import Sidebar from "./../boilerplates/sidebar/sidebar";
import "./../pages/home.css";
// import "./passbook.css";
import PassbookBody from "./passbook/passbookbody";
import { useDispatch } from "react-redux";
import TrackingBody from "./tracking/Trackingbody";
import GraphBody from "./graph/graphbody";
import { getUsername } from "../store/usernameSlice";
import { getPaymentArray } from "../store/paymentArraySlice";
import { getTagArray } from "../store/tagArraySlice";
import { getCurrency } from "../store/currencySlice";
import Tagfullinfo from "./tracking/tagfullinfo";
import { useParams } from "react-router-dom";
import EditTag from "./tracking/edittag";

function SidebarRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsername());
    dispatch(getPaymentArray());
    dispatch(getTagArray());
    dispatch(getCurrency());
  }, [dispatch]);

  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Boilerplate setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="page-container">
        <Sidebar isOpen={isOpen} />
        {location.pathname === "/payments" && (
          <PassbookBody paymentArray={[]} />
        )}
        {location.pathname === "/tag" && <TrackingBody />}
        {location.pathname === "/" && <GraphBody tagArray={[]} />}
        {location.pathname === "/home" && <GraphBody />}
        {location.pathname === "/tag/" + id && <Tagfullinfo />}
        {location.pathname === "/tag/edit/" + id && <EditTag />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SidebarRouter;
