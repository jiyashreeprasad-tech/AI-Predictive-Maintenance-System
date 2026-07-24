import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MachineDetails from "./pages/MachineDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/machine/:id" element={<MachineDetails />} />
    </Routes>
  );
}

export default App;