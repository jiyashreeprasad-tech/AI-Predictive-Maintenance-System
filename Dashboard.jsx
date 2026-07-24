import MachineModal from "../components/MachineModal";
import MachineTable from "../components/MachineTable"

import MachineDetails from "./MachineDetails";

import Login from "../components/Login";
import Register from "../components/Register";
import Sidebar from "../components/Sidebar";
import NotificationBell from "../components/NotificationBell";
import VibrationChart from "../components/VibrationChart";
import AlertPanel from "../components/AlertPanel";
import MachineCard from "../components/MachineCard";
import TemperatureChart from "../components/TemperatureChart";
import LiveSimulation from "../components/LiveSimulation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [newMachine, setNewMachine] = useState({
  machineName: "",
  temperature: "",
  vibration: "",
  pressure: "",
});
const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("token") ? true : false
);
const [selectedMachine, setSelectedMachine] = useState(null);

 useEffect(() => {
  const fetchMachines = () => {
    fetch(`http://localhost:5000/api/machines`)
      .then((res) => res.json())
      .then((data) => setMachines(data))
      .catch((err) => console.log(err));
  };
  

  fetchMachines();

  const interval = setInterval(fetchMachines, 5000);

  return () => clearInterval(interval);
}, []);
const handleChange = (e) => {
  setNewMachine({
    ...newMachine,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/machines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMachine),
  });

  if (res.ok) {
    alert("✅ Machine Added!");

    setNewMachine({
      machineName: "",
      temperature: "",
      vibration: "",
      pressure: "",
    });
  } else {
    alert("❌ Failed to add machine");
  }
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this machine?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/machines/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("✅ Machine deleted successfully!");

      // Remove it from the UI immediately
      setMachines((prev) => prev.filter((machine) => machine._id !== id));
    } else {
      alert("❌ Failed to delete machine");
    }
  } catch (error) {
    console.log(error);
    alert("❌ Error deleting machine");
  }
};
const downloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AI Predictive Maintenance Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Machine", "Temperature", "Vibration", "Pressure", "Status"]],
    body: machines.map((m) => [
      m.machineName,
      `${m.temperature} °C`,
      m.vibration,
      m.pressure,
      m.status,
    ]),
  });

  doc.save("Maintenance_Report.pdf");
};
 

  const healthy = machines.filter(m => m.status === "Healthy").length;
const warning = machines.filter(m => m.status === "Warning").length;
const critical = machines.filter(m => m.status === "Critical").length;

  const getColor = (status) => {
    if (status === "Healthy") return "#22c55e";
    if (status === "Warning") return "#facc15";
    return "#ef4444";
  };
  console.log(machines);
  if (!isLoggedIn) {
  return <Login onLogin={() => setIsLoggedIn(true)} />;
}
  return (
  <div
  style={{
    display: "flex",
    background: darkMode ? "#111827" : "#f3f4f6",
    minHeight: "100vh",
    color: darkMode ? "white" : "black",
  }}
>
    <Sidebar darkMode={darkMode} />
    <div
      style={{
        flex: 1,
        padding: "20px",
      }}
    >
    
      <div id="dashboard">
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      fontSize: "40px",
      margin: 0,
    }}
  >
    🏭 AI Predictive Maintenance Dashboard
  </h1>

  
</div>
</div>
      <LiveSimulation setMachines={setMachines} />
      <NotificationBell machines={machines} />
      <div
  style={{
    position: "fixed",
    top: "80px",      // Below the alert notification
    right: "20px",
    zIndex: 1000,
  }}
>
  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      setIsLoggedIn(false);
    }}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    🚪 Logout
  </button>
</div>
      <div id="add-machine">
      <form
  onSubmit={handleSubmit}
  style={{
    background: darkMode ? "#1f2937" : "#ffffff",
color: darkMode ? "white" : "black",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h2>Add New Machine</h2>

  <input
    type="text"
    name="machineName"
    placeholder="Machine Name"
    value={newMachine.machineName}
    onChange={handleChange}
    style={{ margin: "5px", padding: "8px" }}
  />

  <input
    type="number"
    name="temperature"
    placeholder="Temperature"
    value={newMachine.temperature}
    onChange={handleChange}
    style={{ margin: "5px", padding: "8px" }}
  />

  <input
    type="number"
    name="vibration"
    placeholder="Vibration"
    value={newMachine.vibration}
    onChange={handleChange}
    style={{ margin: "5px", padding: "8px" }}
  />

  <input
    type="number"
    name="pressure"
    placeholder="Pressure"
    value={newMachine.pressure}
    onChange={handleChange}
    style={{ margin: "5px", padding: "8px" }}
  />

  <button
    type="submit"
    style={{
      margin: "5px",
      padding: "8px 16px",
      cursor: "pointer",
    }}
  >
    ➕ Add Machine
  </button>
</form>
</div>
      <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    gap: "15px",
    margin: "20px 0",
    flexWrap: "wrap",
  }}
>
  <input
  type="text"
  placeholder="🔍 Search Machine..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
  }}
/>

<div id="reports">
 <button
  onClick={downloadReport}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  📄 Download Maintenance Report
</button>
</div>


  
  
  
  <div style={{background:"#22c55e",padding:"15px",borderRadius:"10px",minWidth:"180px"}}>
    <h3>🟢 Healthy</h3>
    <h2>{healthy}</h2>
  </div>

  <div style={{background:"#facc15",padding:"15px",borderRadius:"10px",minWidth:"180px",color:"black"}}>
    <h3>🟡 Warning</h3>
    <h2>{warning}</h2>
  </div>

  <div style={{background:"#ef4444",padding:"15px",borderRadius:"10px",minWidth:"180px"}}>
    <h3>🔴 Critical</h3>
    <h2>{critical}</h2>
  </div>
  </div>

    <TemperatureChart machines={machines} />
    <VibrationChart machines={machines} />
    <div id="alerts">
    <AlertPanel machines={machines} />
    </div>
   <MachineTable
  machines={machines.filter((machine) =>
    machine.machineName
      .toLowerCase()
      .includes(search.toLowerCase())
  )}
  onDelete={handleDelete}
  onView={setSelectedMachine}
  darkMode={darkMode}
/>
<MachineModal
  machine={selectedMachine}
  onClose={() => setSelectedMachine(null)}
/>
    

  <div
  id="settings"
  style={{
    marginTop: "40px",
    padding: "20px",
    background: darkMode ? "#1f2937" : "#ffffff",
color: darkMode ? "white" : "black",
    borderRadius: "10px",
  }}
>
  <h2>⚙️ Settings</h2>

  <label>
    <input
  type="checkbox"
  checked={darkMode}
  onChange={() => setDarkMode(!darkMode)}
/>
    🌙 Dark Mode
  </label>

  <br /><br />

  <label>
    Auto Refresh:
    <select style={{ marginLeft: "10px" }}>
      <option>5 Seconds</option>
      <option>10 Seconds</option>
      <option>30 Seconds</option>
    </select>
  </label>

  <br /><br />

  <label>
    Alert Temperature:
    <input
      type="number"
      defaultValue="85"
      style={{ marginLeft: "10px", width: "80px" }}
    />
    °C
  </label>

  <br /><br />

  <label>
    Alert Vibration:
    <input
      type="number"
      defaultValue="5"
      style={{ marginLeft: "10px", width: "80px" }}
    />
  </label>

  <br /><br />

  <button
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    💾 Save Settings
  </button>
</div>
  </div>
  </div>
  );
}

export default Dashboard;