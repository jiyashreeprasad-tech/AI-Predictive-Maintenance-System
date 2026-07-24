

function MachineTable({ machines, onDelete, onView, darkMode }) {
  

  const getStatus = (machine) => {
    if (machine.temperature > 85 || machine.vibration > 5) return "🔴 Critical";
    if (machine.temperature > 70 || machine.vibration > 3) return "🟡 Warning";
    return "🟢 Healthy";
  };

  const getHealthScore = (machine) => {
    let score = 100;
    score -= Math.max(0, machine.temperature - 50);
    score -= machine.vibration * 8;
    score -= Math.max(0, machine.pressure - 100) / 2;
    return Math.max(0, Math.round(score));
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        background: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "white" : "black",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr style={{ background: "#2563eb", color: "white" }}>
          <th style={{ padding: "12px" }}>Machine Name</th>
          <th>Status</th>
          <th>Health</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {machines.map((machine) => (
          <tr
            key={machine._id}
            style={{ textAlign: "center", borderBottom: "1px solid #555" }}
          >
            <td style={{ padding: "12px" }}>{machine.machineName}</td>

            <td>{getStatus(machine)}</td>

            <td>{getHealthScore(machine)}%</td>

            <td>
              <button
                onClick={() => onView(`/machine/${machine._id}`)}
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                👁️ View
              </button>

              <button
                onClick={() => onDelete(machine._id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MachineTable;