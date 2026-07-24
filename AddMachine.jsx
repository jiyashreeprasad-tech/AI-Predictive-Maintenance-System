import { useState } from "react";

function AddMachine() {
  const [machine, setMachine] = useState({
    machineName: "",
    temperature: "",
    vibration: "",
    pressure: "",
  });

  const handleChange = (e) => {
    setMachine({
      ...machine,
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
      body: JSON.stringify(machine),
    });

    if (res.ok) {
      alert("✅ Machine Added Successfully!");

      setMachine({
        machineName: "",
        temperature: "",
        vibration: "",
        pressure: "",
      });
    } else {
      alert("❌ Failed to add machine");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Add New Machine</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="machineName"
          placeholder="Machine Name"
          value={machine.machineName}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="temperature"
          type="number"
          placeholder="Temperature"
          value={machine.temperature}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="vibration"
          type="number"
          placeholder="Vibration"
          value={machine.vibration}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="pressure"
          type="number"
          placeholder="Pressure"
          value={machine.pressure}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Add Machine
        </button>
      </form>
    </div>
  );
}

export default AddMachine;