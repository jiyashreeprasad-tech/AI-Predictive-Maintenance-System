import { useMemo, useState } from "react";

function NotificationBell({ machines }) {
  const [showPopup, setShowPopup] = useState(false);

  const criticalMachines = useMemo(() => {
    return machines.filter(
      (m) => m.temperature > 85 || m.vibration > 5
    );
  }, [machines]);

  return (
    <>
      <div
        onClick={() => setShowPopup(!showPopup)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#1f2937",
          color: "white",
          padding: "12px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        🔔 Alerts: <strong>{criticalMachines.length}</strong>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            width: "320px",
            background: "#1f2937",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        >
          <h3>🚨 Critical Machines</h3>

          {criticalMachines.length === 0 ? (
            <p>No critical machines.</p>
          ) : (
            criticalMachines.map((machine) => (
              <div
                key={machine._id}
                style={{
                  borderBottom: "1px solid #374151",
                  marginBottom: "10px",
                  paddingBottom: "10px",
                }}
              >
                <strong>{machine.machineName}</strong>

                <p>🌡️ Temp: {machine.temperature}°C</p>

                <p>📳 Vibration: {machine.vibration}</p>
              </div>
            ))
          )}

          <button
            onClick={() => setShowPopup(false)}
            style={{
              marginTop: "10px",
              padding: "8px 14px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default NotificationBell;