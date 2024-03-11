import * as React from "react";
import Navbar from "./navbar/navbar";
import CurrentDate from "./currentdate";

export default function Boilerplate({ username, setIsOpen, isOpen }) {
  return (
    <>
      <Navbar username={username} setIsOpen={setIsOpen} isOpen={isOpen} />
      <CurrentDate />
    </>
  );
}
