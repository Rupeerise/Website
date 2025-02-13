import Navbar from "../boilerplates/navbar/navbar";
import Footer from "../boilerplates/footer";
import "./faq.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const faqData = [
  {
    question: "What is this website?",
    answer:
      "This website is a personal finance manager. You can track your expenses, income, and investments. You can also set goals and budgets to help you reach your financial goals.",
  },
  {
    question: "How do I get started?",
    answer:
      "To get started, click on the 'Sign Up' button. You will be asked to create an account with your email address and password. Once you have created an account, you can start adding your financial information.",
  },
  {
    question: "How do I add my financial information?",
    answer:
      "To add your financial information, you can find 'add payment', 'add tag' buttons on respective pages. You can add expenses, income, investments, and goals. You can also set budgets and track your progress towards your financial goals.",
  },
  {
    question: "How do I edit my financial information?",
    answer:
      "To edit your financial information, click on the 'Edit' button next to the item you want to edit. You can edit the amount, tag and date. You can also delete the item if you no longer need it.",
  },
  {
    question: "How do I track my financial goals?",
    answer:
      "To track your financial goals, you can set goals and budgets. You can see your progress towards your goals on the dashboard. You can also see your spending habits and make adjustments to reach your goals faster.",
  },
];

export default function Faq() {
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <Navbar />
      <div className="faq-body">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <h2 onClick={() => toggleQuestion(index)} className="faq-question">
              {item.question}{" "}
              {openQuestions.includes(index) ? (
                <RemoveIcon className="faq-icon faq-animate-icon" />
              ) : (
                <AddIcon className="faq-icon faq-animate-icon" />
              )}
            </h2>
            <div
              className={`faq-answer-container ${
                openQuestions.includes(index) ? "open" : ""
              }`}
            >
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
