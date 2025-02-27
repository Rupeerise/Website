import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

export default function InvestmentGraph({ id }) {
  const loanArray = useSelector((state) => state.loanArray.value);
  const loan = loanArray.find(
    (loan) => loan._id === id && loan.tagType === "investment"
  );
  const payments = useSelector((state) => state.paymentArray.value).filter(
    (payment) => payment.loanid?._id === id
  );

  // Segregate payments by month
  const monthArray = [];
  payments.forEach((payment) => {
    const month = new Date(payment.date).getMonth();
    const year = new Date(payment.date).getFullYear();
    let index = monthArray.findIndex(
      (item) => item.month === month && item.year === year
    );
    if (index === -1) {
      monthArray.push({ month, year, invested: 0, withdrawn: 0 });
      index = monthArray.length - 1; // Update index to the newly added object
    }
    if (payment.paymentType === "paid") {
      monthArray[index].invested += payment.amount;
    } else if (payment.paymentType === "received") {
      monthArray[index].withdrawn += payment.amount;
    }
  });

  const graphDisplayEnum = ["invested", "withdrawn", "value"];
  const [graphDisplay, setGraphDisplay] = useState("value");

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
          invested: 0,
          withdrawn: 0,
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

  const dataInvested = {
    labels: filledMonthArray.map((month) => month.month + 1 + "/" + month.year),
    datasets: [
      {
        label: "Invested",
        data: filledMonthArray.map((month) => month.invested),
        borderWidth: 1,
      },
    ],
  };

  const dataWithdrawn = {
    labels: filledMonthArray.map((month) => month.month + 1 + "/" + month.year),
    datasets: [
      {
        label: "Withdrawn",
        data: filledMonthArray.map((month) => month.withdrawn),
        borderWidth: 1,
      },
    ],
  };

  // Calculate cumulative value considering interest per year
  let cumulativeValue = 0;
  const interestRate = loan.interestRate / 100; // Assuming interestRate is given in percentage
  const valueArray = filledMonthArray.map((month, index) => {
    cumulativeValue += month.invested - month.withdrawn;
    if (index > 0) {
      const previousMonth = filledMonthArray[index - 1];
      const monthsDifference =
        (month.year - previousMonth.year) * 12 +
        (month.month - previousMonth.month);
      cumulativeValue *= Math.pow(1 + interestRate / 12, monthsDifference);
    }
    return { month: month.month, year: month.year, value: cumulativeValue };
  });

  const dataValue = {
    labels: valueArray.map((month) => month.month + 1 + "/" + month.year),
    datasets: [
      {
        label: "Value",
        data: valueArray.map((month) => month.value),
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
      {graphDisplay === "invested" ? (
        <Chart type="line" data={dataInvested} options={options} />
      ) : graphDisplay === "withdrawn" ? (
        <Chart type="line" data={dataWithdrawn} options={options} />
      ) : (
        <Chart type="line" data={dataValue} options={options} />
      )}
      <div className="graph-controls">
        <label>Graph Display: </label>
        <select
          value={graphDisplay}
          onChange={(e) => setGraphDisplay(e.target.value)}
        >
          {graphDisplayEnum.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
