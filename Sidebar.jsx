function Sidebar({ darkMode}) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        width: "220px",
        background: darkMode ? "#1f2937" : "#ffffff",
color: darkMode ? "white" : "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>🏭 AI Dashboard</h2>

      <hr />

      <p style={{ cursor: "pointer" }} onClick={() => scrollToSection("dashboard")}>
        🏠 Dashboard
      </p>

      <p style={{ cursor: "pointer" }} onClick={() => scrollToSection("add-machine")}>
        ➕ Add Machine
      </p>

      <p style={{ cursor: "pointer" }} onClick={() => scrollToSection("reports")}>
        📄 Reports
      </p>

      <p style={{ cursor: "pointer" }} onClick={() => scrollToSection("alerts")}>
        🔔 Alerts
      </p>

      <p style={{ cursor: "pointer" }} onClick={() => scrollToSection("settings")}>
        ⚙️ Settings
      </p>
    </div>
  );
}

export default Sidebar;