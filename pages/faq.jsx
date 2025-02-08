import Navbar from "../boilerplates/navbar/navbar";
import Footer from "../boilerplates/footer";
import "./faq.css";
import { useState } from "react";

export default function Faq() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="faq-body">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-item">
          <h2 onClick={() => toggleQuestion(1)}>What is this website?</h2>
          {openQuestion === 1 && (
            <p>
              This website is a personal finance manager. You can track your
              expenses, income, and investments. You can also set goals and
              budgets to help you reach your financial goals.
            </p>
          )}
        </div>
        <div className="faq-item">
          <h2 onClick={() => toggleQuestion(2)}>How do I get started?</h2>
          {openQuestion === 2 && (
            <p>
              To get started, click on the "Sign Up" button. You will be asked
              to create an account with your email address and password. Once
              you have created an account, you can start adding your financial
              information.
            </p>
          )}
        </div>
        <div className="faq-item">
          <h2 onClick={() => toggleQuestion(3)}>
            How do I add my financial information?
          </h2>
          {openQuestion === 3 && (
            <p>
              To add your financial information, you can find "add payment",
              "add tag" buttons on respective pages. You can add expenses,
              income, investments, and goals. You can also set budgets and track
              your progress towards your financial goals.
            </p>
          )}
        </div>
        <div className="faq-item">
          <h2 onClick={() => toggleQuestion(4)}>
            How do I edit my financial information?
          </h2>
          {openQuestion === 4 && (
            <p>
              To edit your financial information, click on the "Edit" button
              next to the item you want to edit. You can edit the amount, tag
              and date. You can also delete the item if you no longer need it.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
