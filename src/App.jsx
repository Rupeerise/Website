import React from "react";
import "./App.css";
import Login from "../pages/login";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import Info from "../pages/info";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Passbookpage from "../pages/passbook/passbookpage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Info />} />
          <Route path="/passbook" element={<Passbookpage />} />
          <Route path="*" element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
