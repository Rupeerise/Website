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

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<SidebarRouter />} />
          <Route path="/" element={<SidebarRouter />} />
          <Route path="/home" element={<SidebarRouter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Info />} />
          <Route path="/payments" element={<SidebarRouter />} />
          <Route path="/tag" element={<SidebarRouter />} />
          <Route path="/tag/:id" element={<SidebarRouter />} />
          <Route path="/tag/edittarget/:id" element={<SidebarRouter />} />
          <Route path="/tag/edit/:id" element={<SidebarRouter />} />
          <Route path="/loan/:id" element={<SidebarRouter />} />
          <Route path="/investment/:id" element={<SidebarRouter />} />
          <Route path="/auth/google/callback" element={<SidebarRouter />} />
          <Route path="/budget" element={<SidebarRouter />} />
          <Route path="*" element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
