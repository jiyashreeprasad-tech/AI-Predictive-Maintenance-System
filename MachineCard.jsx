
function MachineCard({ machine, onDelete, darkMode }) {

  const getStatus = () => {
    if (machine.temperature > 85 || machine.vibration > 5) {
      return {
        status: "Critical",
        prediction: "Immediate Maintenance Required",
      };
    }

    if (machine.temperature > 70 || machine.vibration > 3) {
      return {
        status: "Warning",
        prediction: "Service Required Within 3 Days",
      };
    }

    return {
      status: "Healthy",
      prediction: "Machine Operating Normally",
    };
  };
  const ai = getStatus();

  const getRecommendation = () => {
  if (ai.status === "Critical") {
    return [
      "🛑 Stop machine immediately",
      "🔧 Inspect motor bearings",
      "❄️ Check cooling system",
      "📅 Schedule emergency maintenance",
    ];
  }

  if (ai.status === "Warning") {
    return [
      "🟡 Monitor temperature",
      "🛢️ Lubricate moving parts",
      "🔍 Inspect within 3 days",
    ];
  }

  return [
    "✅ Machine operating normally",
    "📊 Continue routine monitoring",
  ];
};

const recommendations = getRecommendation();

  
  const getColor = (status) => {
    if (status === "Healthy") return "#22c55e";
    if (status === "Warning") return "#facc15";
    return "#ef4444";
  };
  const getHealthScore = () => {
  let score = 100;

  score -= Math.max(0, machine.temperature - 50);
  score -= machine.vibration * 8;
  score -= Math.max(0, machine.pressure - 100) / 2;

  return Math.max(0, Math.round(score));
};

const healthScore = getHealthScore();

  return (
  <div
    onClick={() => window.location.href = `/machine/${machine._id}`}
    style={{
      background: darkMode ? "#1f2937" : "#ffffff",
      color: darkMode ? "white" : "black",
      padding: "20px",
      borderRadius: "12px",
      borderLeft: "8px solid " + getColor(ai.status),
      marginBottom: "15px",
      cursor: "pointer",
    }}
  >
    <h2>{machine.machineName} ➜</h2>
  </div>
);
}

export default MachineCard;