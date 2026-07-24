import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TemperatureChart({ machines }) {
  console.log("Machines:", machines);

  const data = {
    labels: machines.map((m) => m.machineName),
    datasets: [
      {
        label: "Temperature (°C)",
        data: machines.map((m) => m.temperature),
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.3)",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        height: "400px",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default TemperatureChart;