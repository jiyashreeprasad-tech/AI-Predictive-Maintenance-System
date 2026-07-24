import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MachineDetails() {
  const { id } = useParams();
  console.log("Machine ID:",id);
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/machines/${id}`)
      .then((res) => res.json())
      .then((data) => {console.log("Fetched Machine:",data); setMachine(data)})
      .catch((err) => console.log(err));
  }, [id]);

  if (!machine) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Machine Details</h1>

      <h2>{machine.machineName}</h2>

      <p>🌡️ Temperature: {machine.temperature}°C</p>

      <p>📳 Vibration: {machine.vibration}</p>

      <p>⚙️ Pressure: {machine.pressure}</p>
    </div>
  );
}

export default MachineDetails;