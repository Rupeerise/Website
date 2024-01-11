import { useState } from "react";
import Boilerplate from "./statics/boilerplates/boilerplate";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Boilerplate />
    </>
  );
}

export default App;
