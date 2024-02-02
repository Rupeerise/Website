import React from "react";

export default function Passbook() {
  const handleClick = () => {
    window.location.href = "/passbook";
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      Passbook
    </div>
  );
}
