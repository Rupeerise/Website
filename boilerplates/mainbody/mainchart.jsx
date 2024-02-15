import React from "react";
import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

function Mainchart({ labels, target, current }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Current",
        data: current,
        type: "bar",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "Target",
        data: target,
        type: "line",
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        tension: 0.3,
        borderDash: [8, 8],
        //point customization
        pointBackgroundColor: "rgb(256,256,256)",
        pointBorderColor: "rgb(255, 99, 132)",
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 10,
        pointBorderWidth: 2,
        pointStyle: "rectRounded",
      },
    ],
  };

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
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Chart type="bar" data={data} options={options} />
    </>
  );
}

export default Mainchart;
