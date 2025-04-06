import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

export default function Loangraph({ id }) {
  const loanArray = useSelector((state) => state.loanArray.value);
  const loan = loanArray.find((loan) => loan._id === id);
  const payments = useSelector((state) => state.paymentArray.value).filter(
    (payment) => payment.loanid?._id === id && payment.paymentType === "paid"
  );

  // Segregate payments by month
  const monthArray = [];
  payments.forEach((payment) => {
    const month = new Date(payment.date).getMonth();
    const year = new Date(payment.date).getFullYear();
    const index = monthArray.findIndex(
      (item) => item.month === month && item.year === year
    );
    if (index === -1) {
      monthArray.push({ month, year, amount: payment.amount });
    } else {
      monthArray[index].amount += payment.amount;
    }
  });

  const graphDiaplayenum = ["paid", "remaining"];
  const [graphDiaplay, setGraphDisplay] = useState("paid");

  // Sort monthArray by year and month
  monthArray.sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month;
    }
    return a.year - b.year;
  });

  // Fill in missing months with zero payments
  const filledMonthArray = [];
  if (monthArray.length > 0) {
    let currentYear = monthArray[0].year;
    let currentMonth = monthArray[0].month;
    monthArray.forEach((monthData) => {
      while (
        currentYear < monthData.year ||
        (currentYear === monthData.year && currentMonth < monthData.month)
      ) {
        filledMonthArray.push({
          month: currentMonth,
          year: currentYear,
          amount: 0,
        });
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
      filledMonthArray.push(monthData);
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    });
  }

  const dataPaid = {
    labels: filledMonthArray.map((month) => month.month + 1 + "/" + month.year),
    datasets: [
      {
        label: "Current",
        data: filledMonthArray.map((month) => month.amount),
        borderWidth: 1,
      },
    ],
  };

  const interestpermonth = loan.interestRate / 12 / 100;
  let remainingAmount = loan.amount;
  const remainingArray = filledMonthArray.map((month) => {
    const interest = remainingAmount * interestpermonth;
    remainingAmount += interest - month.amount;
    return { month: month.month, year: month.year, amount: remainingAmount };
  });

  const dataRemaining = {
    labels: remainingArray.map((month) => month.month + 1 + "/" + month.year),
    datasets: [
      {
        label: "Remaining",
        data: remainingArray.map((month) => month.amount),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 25,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {graphDiaplay === "paid" ? (
        <Chart type="line" data={dataPaid} options={options} />
      ) : (
        <Chart type="line" data={dataRemaining} options={options} />
      )}
      <div>
        <label>Graph Display: </label>
        <select
          value={graphDiaplay}
          onChange={(e) => setGraphDisplay(e.target.value)}
        >
          {graphDiaplayenum.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
