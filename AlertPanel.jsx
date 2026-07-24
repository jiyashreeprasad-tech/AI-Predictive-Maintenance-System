function AlertPanel({ machines }) {
  const alerts = machines.filter(
    (m) => m.temperature > 70 || m.vibration > 3
  );

  return (
    <div
      style={{
        background: "#1f2937",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <h2>🚨 Live Alerts</h2>

      {alerts.length === 0 ? (
        <p>✅ No alerts. All machines are healthy.</p>
      ) : (
        alerts.map((machine) => (
          <div
            key={machine._id}
            style={{
              background: "#374151",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <strong>{machine.machineName}</strong>

            <p>🌡️ Temperature: {machine.temperature}°C</p>

            <p>📳 Vibration: {machine.vibration}</p>

            <p style={{ color: "#facc15" }}>
              ⚠️ Maintenance Recommended
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AlertPanel;