import React, { useState, useEffect } from "react";
import Boilerplate from "./../boilerplates/boilerplate";
import Footer from "./../boilerplates/footer";
import "./../pages/home.css";
import PassbookBody from "./passbook/passbookbody";
import { useDispatch } from "react-redux";
import TagBody from "./tag/Tagbody";
import GraphBody from "./graph/graphbody";
import { getUsername } from "../store/usernameSlice";
import { getPaymentArray } from "../store/paymentArraySlice";
import { getTagArray } from "../store/tagArraySlice";
import { getCurrency } from "../store/currencySlice";
import Tagfullinfo from "./tag/tagfullinfo";
import { useParams } from "react-router-dom";
import EditTarget from "./tag/edittarget";
import EditTagName from "./tag/edittagname";
import { getLoanArray } from "../store/loanArraySlice";
import Loanbody from "./tag/loanbody";
import InvestmentBody from "./tag/investmentbody";
import BudgetBody from "./budget/budgetbody";
import AutopayBody from "../sidebarpages/autopay/autopaybody";
import MySidebar from "./../boilerplates/sidebar/sidebar";

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
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <Boilerplate setCollapsed={setCollapsed} collapsed={collapsed} />
      <div className="page-container">
        <MySidebar collapsed={collapsed} />
        {location.pathname === "/payments" && <PassbookBody />}
        {location.pathname === "/tag" && <TagBody />}
        {location.pathname === "/" && <GraphBody />}
        {location.pathname === "/home" && <GraphBody />}
        {location.pathname === "/tag/" + id && <Tagfullinfo />}
        {location.pathname === "/tag/edit/" + id && <EditTagName />}
        {location.pathname === "/tag/edittarget/" + id && <EditTarget />}
        {location.pathname === "/loan/" + id && <Loanbody />}
        {location.pathname === "/investment/" + id && <InvestmentBody />}
        {location.pathname === "/auth/google/callback" && <GraphBody />}
        {location.pathname === "/budget" && <BudgetBody />}
        {location.pathname === "/autopay" && <AutopayBody />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SidebarRouter;
