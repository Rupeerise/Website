import React from "react";

export default function ProgressBar({ value, color, backgroundColor }) {
  const containerStyle = {
    height: "0.7rem",
    width: "100%",
    margin: "0.3rem auto",
    backgroundColor: backgroundColor || "#eee",
    borderRadius: "50px",
    overflow: "hidden",
  };

  const fillerStyle = {
    height: "100%",
    width: `${value}%`,
    backgroundColor: color || "blue",
    borderRadius: "inherit",
    transition: "width .2s ease-in",
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle} />
    </div>
  );
}
