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
import EditTarget from "./tracking/edittarget";
import EditTagName from "./tracking/edittagname";
import { getLoanArray } from "../store/loanArraySlice";
import Loanbody from "./tracking/loanbody";
import InvestmentBody from "./tracking/investmentbody";
import BudgetBody from "./budget/budgetbody";

function SidebarRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsername());
    dispatch(getPaymentArray());
    dispatch(getTagArray());
    dispatch(getCurrency());
    dispatch(getLoanArray());
  }, [dispatch]);

  const { id } = useParams();

  return (
    <div>
      <Boilerplate />
      <div className="page-container">
        <Sidebar />
        {location.pathname === "/payments" && <PassbookBody />}
        {location.pathname === "/tag" && <TrackingBody />}
        {location.pathname === "/" && <GraphBody />}
        {location.pathname === "/home" && <GraphBody />}
        {location.pathname === "/tag/" + id && <Tagfullinfo />}
        {location.pathname === "/tag/edit/" + id && <EditTagName />}
        {location.pathname === "/tag/edittarget/" + id && <EditTarget />}
        {location.pathname === "/loan/" + id && <Loanbody />}
        {location.pathname === "/investment/" + id && <InvestmentBody />}
        {location.pathname === "/auth/google/callback" && <GraphBody />}
        {location.pathname === "/budget" && <BudgetBody />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SidebarRouter;
