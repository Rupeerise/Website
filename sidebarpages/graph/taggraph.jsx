import React from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";

export default function TagGraph({ id }) {
  const tag = useSelector((state) =>
    state.tagArray.value.find((tag) => tag._id === id)
  );
  const targets = tag?.targets || [];

  const paymentArray = useSelector((state) => state.paymentArray.value);

  const filteredPayments = paymentArray.filter(
    (payment) => payment.tagid._id === id
  );

  let targetdata = targets.map((target) => target.amount);
  let labels = targets.map((target) => target.month + 1 + "/" + target.year);

  let datafirst = new Array(labels.length).fill(0);

  filteredPayments.forEach((payment) => {
    const paymentDate = new Date(payment.date);
    const label = `${paymentDate.getMonth() + 1}/${paymentDate.getFullYear()}`;

    const labelIndex = labels.indexOf(label);
    if (labelIndex !== -1) {
      datafirst[labelIndex] += payment.amount;
    } else {
      labels.push(label);
      datafirst.push(payment.amount);
      targetdata.push(0);
    }
  });

  let labelsData = labels.map((label, index) => ({
    label: label,
    datafirst: datafirst[index],
    targetdata: targetdata[index],
  }));

  labelsData.sort((a, b) => {
    const aDate = new Date(a.label.split("/").reverse().join("-"));
    const bDate = new Date(b.label.split("/").reverse().join("-"));
    return aDate - bDate;
  });

  labels = labelsData.map((labelData) => labelData.label);

  datafirst = labelsData.map((labelData) => labelData.datafirst);

  targetdata = labelsData.map((labelData) => labelData.targetdata);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total",
        type: "bar",
        data: datafirst,
        borderWidth: 1,
      },
      {
        label: "Target",
        type: "line",
        data: targetdata,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {},
        ticks: {
          font: {
            size: 28, // Makes labels bigger
          },
        },
      },
      x: {
        grid: {
          display: false, // Removes the background lines for the x-axis as well
        },
        ticks: {
          font: {
            size: 28, // Makes x-axis labels bigger
          },
        },
      },
    },
  };

  return (
    <div className="tag-full-graph">
      <Chart type="line" data={data} options={options} />
    </div>
  );
}
