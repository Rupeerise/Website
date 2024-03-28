import React from "react";
import "./calculator.css";
import CalculatorCard from "./Calculatorcard";

const cardValues = [
  {
    title: "Title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora animi suscipit iure quia, vitae odit omnis modi non explicabo!",
    footer: "footer",
  },
  {
    title: "Title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora animi suscipit iure quia, vitae odit omnis modi non explicabo!",
    footer: "footer",
  },
  {
    title: "Title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora animi suscipit iure quia, vitae odit omnis modi non explicabo!",
    footer: "footer",
  },
  {
    title: "Title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora animi suscipit iure quia, vitae odit omnis modi non explicabo!",
    footer: "footer",
  },
  {
    title: "Title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora animi suscipit iure quia, vitae odit omnis modi non explicabo!",
    footer: "footer",
  },
  {
    title: "Title",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora animi suscipit iure quia, vitae odit omnis modi non explicabo!",
    footer: "footer",
  },
];

function CalculatorBody() {
  return (
    <div className="calculatorbody">
      {cardValues.map((card, index) => (
        <CalculatorCard
          key={index}
          title={card.title}
          content={card.content}
          footer={card.footer}
        />
      ))}
    </div>
  );
}

export default CalculatorBody;
