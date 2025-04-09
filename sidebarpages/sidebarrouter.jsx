import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Boilerplate from "./../boilerplates/boilerplate";
import Footer from "./../boilerplates/footer";
import MySidebar from "./../boilerplates/sidebar/sidebar";
import PassbookBody from "./passbook/passbookbody";
import TagBody from "./tag/Tagbody";
import GraphBody from "./graph/graphbody";
import Tagfullinfo from "./tag/tagfullinfo";
import EditTarget from "./tag/edittarget";
import EditTagName from "./tag/edittagname";
import Loanbody from "./tag/loanbody";
import InvestmentBody from "./tag/investmentbody";
import BudgetBody from "./budget/budgetbody";
import AutopayBody from "../sidebarpages/autopay/autopaybody";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsername } from "../store/usernameSlice";
import { getPaymentArray } from "../store/paymentArraySlice";
import { getTagArray } from "../store/tagArraySlice";
import { getCurrency } from "../store/currencySlice";
import { getLoanArray } from "../store/loanArraySlice";
import "./sidebarRouter.css";

function SidebarRouter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);

  useEffect(() => {
    dispatch(getUsername());
    dispatch(getPaymentArray());
    dispatch(getTagArray());
    dispatch(getCurrency());
    dispatch(getLoanArray());
  }, [dispatch]);

  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => {
      setPageTransition(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const renderContent = () => {
    switch (location.pathname) {
      case "/payments":
        return <PassbookBody />;
      case "/tag":
        return <TagBody />;
      case "/":
      case "/home":
      case "/auth/google/callback":
        return <GraphBody />;
      case `/tag/${id}`:
        return <Tagfullinfo />;
      case `/tag/edit/${id}`:
        return <EditTagName />;
      case `/tag/edittarget/${id}`:
        return <EditTarget />;
      case `/loan/${id}`:
        return <Loanbody />;
      case `/investment/${id}`:
        return <InvestmentBody />;
      case "/budget":
        return <BudgetBody />;
      case "/autopay":
        return <AutopayBody />;
      default:
        return <GraphBody />;
    }
  };

  return (
    <div className="app-container">
      <Boilerplate setCollapsed={setCollapsed} collapsed={collapsed} />
      
      <div className="content-wrapper">
        <MySidebar collapsed={collapsed} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`page-content ${pageTransition ? 'page-transitioning' : ''}`}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <Footer />
    </div>
  );
}

export default SidebarRouter;