import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

export default function Mainchart({ setIsGraph }) {
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);
  let paymentArray = useSelector((state) => state.paymentArray.value);
  let startdate = useSelector((state) => state.graph.startdate);
  let enddate = useSelector((state) => state.graph.enddate);
  let graphType = useSelector((state) => state.graph.graphType);
  const tagArrayStatus = useSelector((state) => state.tagArray.status);

  startdate = new Date(startdate);
  enddate = new Date(enddate);

  paymentArray = paymentArray.filter((payment) => {
    const paymentdate = new Date(payment.date);
    return paymentdate >= startdate && paymentdate <= enddate;
  });

  const paid = paymentArray.filter((payment) => {
    return payment.paymentType === "paid";
  });

  const received = paymentArray.filter((payment) => {
    return payment.paymentType === "received";
  });

  const idandamount = [
    ...tagArray.map((tag) => ({
      name: tag.name,
      id: tag?._id,
      amount: 0,
      color: tag.color,
    })),
    ...loanArray.map((loan) => ({
      name: loan.name,
      id: loan?._id,
      amount: 0,
      color: loan.color,
    })),
  ];

  const paidBins = idandamount.map((tag) => tag.amount);
  const receivedBins = idandamount.map((tag) => tag.amount);

  paid.forEach((payment) => {
    const index = idandamount.findIndex((item) => {
      return item.id === payment.tagid?._id || item.id === payment.loanid?._id;
    });
    if (index !== -1) {
      paidBins[index] += payment.amount;
    }
  });

  received.forEach((payment) => {
    const index = idandamount.findIndex((item) => {
      return item.id === payment.tagid?._id || item.id === payment.loanid?._id;
    });
    if (index !== -1) {
      receivedBins[index] += payment.amount;
    }
  });

  // Filter out zero values from labels and datasets
  const filteredPaid = idandamount.filter((item, index) => paidBins[index] > 0);
  const filteredReceived = idandamount.filter(
    (item, index) => receivedBins[index] > 0
  );

  const labelsPaid = filteredPaid.map((item) => item.name);
  const labelsReceived = filteredReceived.map((item) => item.name);

  const dataPaid = filteredPaid.map(
    (item, index) => paidBins[idandamount.indexOf(item)]
  );
  const dataReceived = filteredReceived.map(
    (item, index) => receivedBins[idandamount.indexOf(item)]
  );

  const colorsPaid = filteredPaid.map((item) => item.color);
  const colorsReceived = filteredReceived.map((item) => item.color);

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

  const graphTypething = () => {
    if (graphType === "paid" && dataPaid.length === 0) {
      setIsGraph(false);
      return null;
    } else if (graphType === "received" && dataReceived.length === 0) {
      setIsGraph(false);
      return null;
    } else {
      setIsGraph(true);
    }
  };

  useEffect(() => {
    graphTypething();
  }, [tagArrayStatus]);

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
