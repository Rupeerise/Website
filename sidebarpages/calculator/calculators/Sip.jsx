import React, { useState, useEffect } from "react";
import "./sip.css";

function Sip() {
  const [time, setTime] = useState("");
  const [returns, setReturns] = useState("");
  const [amount, setAmount] = useState("");
  const [investedAmount, setInvestedAmount] = useState(0);
  const [returnedAmount, setReturnedAmount] = useState(0);

  useEffect(() => {
    calculateAmounts();
  }, [time, returns, amount]);

  const calculateAmounts = () => {
    if (time && returns && amount) {
      const invested = amount * time * 12; // SIP is usually monthly, so multiply by 12
      const monthlyRate = returns / 100 / 12; // Convert annual rate to monthly
      const months = time * 12; // Convert years to months
      const returned =
        amount *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      setInvestedAmount(Math.round(invested));
      setReturnedAmount(Math.round(returned));
    }
  };

  return (
    <div className="sip-container">
      <label className="sip-label">
        Time (in years):
        <input
          className="sip-input"
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <label className="sip-label">
        Annual Return Rate (%):
        <input
          className="sip-input"
          type="number"
          value={returns}
          onChange={(e) => setReturns(e.target.value)}
        />
      </label>
      <label className="sip-label">
        Monthly Investment Amount:
        <input
          className="sip-input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <div>Invested Amount: {investedAmount.toLocaleString("en-IN")}</div>
      <div>Returned Amount: {returnedAmount.toLocaleString("en-IN")}</div>
    </div>
  );
}

export default Sip;
