import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { processGraphData } from "./graphfunction";

export default function Mainchart() {
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const startdate = useSelector((state) => state.graph.startdate);
  const enddate = useSelector((state) => state.graph.enddate);
  const graphType = useSelector((state) => state.graph.graphType);
  const tagArrayStatus = useSelector((state) => state.tagArray.status);

  const {
    labelsPaid,
    dataPaid,
    colorsPaid,
    labelsReceived,
    dataReceived,
    colorsReceived,
  } = processGraphData({
    tagArray,
    loanArray,
    paymentArray,
    startdate,
    enddate,
    graphType,
  });

  const dataPaidConfig = {
    labels: labelsPaid,
    datasets: [
      {
        type: "bar",
        label: "Paid (Bar)",
        data: dataPaid,
        backgroundColor: colorsPaid.map((color) => `${color}60`), // Adding transparency
        borderColor: colorsPaid,
        borderWidth: 2,
      },
      {
        type: "line",
        label: "Paid (Line)",
        data: dataPaid,
        borderWidth: 5,
        fill: false,
      },
    ],
  };

  const dataReceivedConfig = {
    labels: labelsReceived,
    datasets: [
      {
        type: "bar",
        label: "Received (Bar)",
        data: dataReceived,
        backgroundColor: colorsReceived.map((color) => `${color}60`), // Adding transparency
        borderColor: colorsReceived,
        borderWidth: 2,
      },
      {
        type: "line",
        label: "Received (Line)",
        data: dataReceived,
        borderWidth: 5,
        fill: false,
      },
    ],
  };

  const options = {
    tension: 0.2,
    title: {
      display: false,
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 25, // Increase font size for x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 25, // Increase font size for y-axis labels
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="barchart">
      {graphType === "paid" ? (
        <Chart type="bar" data={dataPaidConfig} options={options} />
      ) : (
        <Chart type="bar" data={dataReceivedConfig} options={options} />
      )}
    </div>
  );
}
