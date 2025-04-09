import React from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import "./budgetgraph.css";

export default function BudgetGraph() {
  const graphType = useSelector((state) => state.budget.graphType);
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const filteredPayments = paymentArray.filter(
    (payment) =>
      new Date(payment.date).getFullYear() === currentYear &&
      new Date(payment.date).getMonth() === currentMonth
  );

  const paidPayments = filteredPayments.filter(
    (payment) => payment.paymentType === "paid"
  );
  const receivedPayments = filteredPayments.filter(
    (payment) => payment.paymentType === "received"
  );

  const paidTags = tagArray.filter((tag) => tag.tagType === "expense");
  const receivedTags = tagArray.filter((tag) => tag.tagType === "income");

  const reducedPaidLoans = loanArray.map((loan) => {
    const temp = paidPayments.filter(
      (payment) => payment.loanid?._id === loan._id
    );
    return {
      ...loan,
      targets: [
        {
          year: currentYear,
          month: currentMonth,
          amount: temp.reduce((acc, payment) => acc + payment.amount, 0),
        },
      ],
    };
  });

  const reducedReceivedLoans = loanArray.map((loan) => {
    const temp = receivedPayments.filter(
      (payment) => payment.loanid?._id === loan._id
    );
    return {
      ...loan,
      targets: [
        {
          year: currentYear,
          month: currentMonth,
          amount: temp.reduce((acc, payment) => acc + payment.amount, 0),
        },
      ],
    };
  });

  const combinedPaidArray = [...paidTags, ...reducedPaidLoans].filter((tag) => {
    const target = tag.targets.find(
      (t) => t.year === currentYear && t.month === currentMonth
    );
    return target ? target.amount !== 0 : false;
  });

  const combinedReceivedArray = [
    ...receivedTags,
    ...reducedReceivedLoans,
  ].filter((tag) => {
    const target = tag.targets.find(
      (t) => t.year === currentYear && t.month === currentMonth
    );
    return target ? target.amount !== 0 : false;
  });

  const savings =
    combinedReceivedArray.reduce(
      (acc, tag) => {
        const target = tag.targets.find(
          (t) => t.year === currentYear && t.month === currentMonth
        );
        return acc + (target ? target.amount : 0);
      },
      0
    ) -
    combinedPaidArray.reduce(
      (acc, tag) => {
        const target = tag.targets.find(
          (t) => t.year === currentYear && t.month === currentMonth
        );
        return acc + (target ? target.amount : 0);
      },
      0
    );

  const dataPaidConfig = {
    labels: combinedPaidArray.map((tag) => tag.name),
    datasets: [
      {
        label: "Paid",
        data: combinedPaidArray.map((tag) => {
          const target = tag.targets.find(
            (t) => t.year === currentYear && t.month === currentMonth
          );
          return target ? target.amount : 0;
        }),
        backgroundColor: combinedPaidArray.map((tag) => tag.color),
        borderColor: combinedPaidArray.map((tag) => tag.color),
        borderWidth: 1,
      },
    ],
  };

  const dataReceivedConfig = {
    labels: combinedReceivedArray.map((tag) => tag.name),
    datasets: [
      {
        label: "Received",
        data: combinedReceivedArray.map((tag) => {
          const target = tag.targets.find(
            (t) => t.year === currentYear && t.month === currentMonth
          );
          return target ? target.amount : 0;
        }),
        backgroundColor: combinedReceivedArray.map((tag) => tag.color),
        borderColor: combinedReceivedArray.map((tag) => tag.color),
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="budget-graph">
      <div className="chart-container">
        <div className="bar-chart">
          <Chart
            type="bar"
            data={graphType === "paid" ? dataPaidConfig : dataReceivedConfig}
            options={barOptions}
          />
        </div>
        <div className="pie-chart">
          <Chart
            type="pie"
            data={graphType === "paid" ? dataPaidConfig : dataReceivedConfig}
            options={pieOptions}
          />
        </div>
      </div>

      <div className="budget-savings-info">
        <p style={{ color: savings >= 0 ? "green" : "red" }}>
          {savings >= 0
            ? `Saving Target: $${savings}`
            : `You will overspend: $${Math.abs(savings)}`}
        </p>
      </div>
    </div>
  );
}