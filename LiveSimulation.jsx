import { useState } from "react";

function LiveSimulation({ setMachines }) {
  const [running, setRunning] = useState(false);

  const startSimulation = () => {
    if (running) return;

    setRunning(true);

    setInterval(() => {
      setMachines((prev) =>
        prev.map((machine) => ({
  ...machine,

  history: [
    ...(machine.history || []),
    {
      temperature: machine.temperature,
      vibration: machine.vibration,
      pressure: machine.pressure,
      time: new Date().toLocaleTimeString(),
    },
  ].slice(-10),

  temperature: Math.max(
    40,
    Math.min(
      100,
      machine.temperature + Math.floor(Math.random() * 7) - 3
    )
  ),

  vibration: Math.max(
    1,
    Math.min(
      6,
      Number(
        (machine.vibration + (Math.random() * 0.8 - 0.4)).toFixed(1)
      )
    )
  ),

  pressure: Math.max(
    90,
    Math.min(
      120,
      machine.pressure + Math.floor(Math.random() * 5) - 2
    )
  ),
}))
      );
    }, 3000);
  };

  return (
    <button
      onClick={startSimulation}
      style={{
        background: "#16a34a",
        color: "white",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      {running ? "🟢 Live Simulation Running" : "▶️ Start Live Simulation"}
    </button>
  );
}

export default LiveSimulation;