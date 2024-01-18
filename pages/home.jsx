import React, { useState } from "react";
import Boilerplate from "../boilerplates/boilerplate";
import MainBody from "../boilerplates/mainbody";
import Footer from "../boilerplates/footer";

function Home() {
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

export default Home;
