import React, { useState } from "react";
import "./App.css";
import Boilerplate from "./statics/boilerplates/boilerplate";
import CurrentDate from "./statics/boilerplates/date/currentdate";

function App() {
  return (
    <>
      <Boilerplate />
      <CurrentDate />
    </>
  );
}

export default App;
