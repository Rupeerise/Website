import React from "react";
import "./App.css";
import Login from "../pages/login";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import Info from "../pages/info";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarRouter from "../sidebarpages/sidebarrouter";
import { Provider } from "react-redux";
import store from "../store/store";
import Tracking from "../sidebarpages/tracking/Tracking";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Provider store={store}>
                <SidebarRouter />
              </Provider>
            }
          />
          <Route
            path="/"
            element={
              <Provider store={store}>
                <SidebarRouter />
              </Provider>
            }
          />
          <Route
            path="/home"
            element={
              <Provider store={store}>
                <SidebarRouter />
              </Provider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Info />} />
          <Route
            path="/passbook" 
            element={
              <Provider store={store}>
                <SidebarRouter />
                <Tracking />
              </Provider>
            }
          />
          <Route
            path="/tag"
            element={
              <Provider store={store}>
                <SidebarRouter />
              </Provider>
            }
          />
          <Route path="*" element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
