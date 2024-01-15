import React, { useState } from "react";
import "./App.css";
import Boilerplate from "./statics/boilerplates/boilerplate";
import MainBody from "./statics/body/maincontainer/mainbody";
import Footer from "./statics/boilerplates/footer";

function App() {
  return (
    <>
      <div className="page-container">
        <Boilerplate />
        <MainBody />
      </div>
      
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
