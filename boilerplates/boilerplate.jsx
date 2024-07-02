import * as React from "react";
import Navbar from "./navbar/navbar";
import CurrentDate from "./currentdate";

export default function Boilerplate({ setIsOpen, isOpen }) {
  return (
    <>
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <CurrentDate />
    </>
  );
}
