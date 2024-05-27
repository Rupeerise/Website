import React from "react";
import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

function Pichart({ labels, target, current, displayInfo }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Current",
        data: current,
        type: "doughnut",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };
  if (displayInfo === "target") {
    data.datasets[0] = {
      label: "Target",
      data: target,
      type: "doughnut",
      backgroundColor: "rgba(3, 252, 252, 0.5)",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 1,
    };
  }
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        display: false,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
  };

  return (
    <>
      <Chart type="bar" data={data} options={options} />
    </>
  );
}

export default Pichart;
