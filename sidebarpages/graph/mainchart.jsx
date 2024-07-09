import { Chart } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

function Mainchart({ labels, target, current }) {
  const datapush = {
    label: "Target",
    data: target,
    type: "line",
    fill: false,
    borderColor: "rgb(255, 99, 132)",
    borderWidth: 2,
    tension: 0.3,
    borderDash: [8, 8],
    //point customization
  };

  const dataCurrent = {
    label: "Current",
    data: current,
    type: "bar",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
    borderColor: "rgb(53, 162, 235)",
    borderWidth: 2,
  };

  const data = {
    labels: labels,
    datasets: [datapush, dataCurrent],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Current vs Target Chart",
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
}

export default Mainchart;
