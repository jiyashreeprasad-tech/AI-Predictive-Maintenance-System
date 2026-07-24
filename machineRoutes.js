const express = require("express");
const router = express.Router();
const MachineData = require("../models/MachineData");

// Get all machine data
router.get("/", async (req, res) => {
  try {
    const data = await MachineData.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new machine data
router.post("/", async (req, res) => {
  try {
    const machine = new MachineData(req.body);
    await machine.save();
    res.status(201).json(machine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/:id", async(req,res)=>{
  try{
    const machine = await MachineData.findById(req.params.id);

    if(!machine){
      return res.status(404).json({
        message:"Machine not found"
      });
    }

    res.json(machine);

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});
// Delete machine
router.delete("/:id", async (req, res) => {
  try {
    await MachineData.findByIdAndDelete(req.params.id);
    res.json({ message: "Machine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;