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

function VibrationChart({ machines }) {
  const data = {
    labels: machines.map((m) => m.machineName),
    datasets: [
      {
        label: "Vibration",
        data: machines.map((m) => m.vibration),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.3)",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        height: "400px",
        marginBottom: "20px",
      }}
    >
      <Line data={data} />
    </div>
  );
}

export default VibrationChart;