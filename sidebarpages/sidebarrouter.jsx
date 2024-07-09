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
import EditTagName from "./tracking/edittagname";

function SidebarRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsername());
    dispatch(getPaymentArray());
    dispatch(getTagArray());
    dispatch(getCurrency());
  }, [dispatch]);

  const { id } = useParams();

  return (
    <div>
      <Boilerplate />
      <div className="page-container">
        <Sidebar />
        {location.pathname === "/payments" && (
          <PassbookBody paymentArray={[]} />
        )}
        {location.pathname === "/tag" && <TrackingBody />}
        {location.pathname === "/" && <GraphBody tagArray={[]} />}
        {location.pathname === "/home" && <GraphBody />}
        {location.pathname === "/tag/" + id && <Tagfullinfo />}
        {location.pathname === "/tag/edit/" + id && <EditTagName />}
        {location.pathname === "/tag/edittarget/" + id && <EditTag />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SidebarRouter;
