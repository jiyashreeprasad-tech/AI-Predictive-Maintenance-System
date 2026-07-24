const mongoose = require("mongoose");

const machineDataSchema = new mongoose.Schema({
  machineName: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  vibration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Healthy",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  prediction: {
  type: String,
  default: "No Risk"
}
});

module.exports = mongoose.model("MachineData", machineDataSchema);