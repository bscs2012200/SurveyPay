const express = require("express");
const router = express.Router();
const Name = require("../models/Name"); // Adjust the path as needed

// Route to save a name
router.post("/name", async (req, res) => {
    console.log(req.body);
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newName = new Name({ name });
    await newName.save();
    
    res.status(201).json({ message: "Name saved successfully", data: newName });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
