const mongoose = require("mongoose");

// Define the schema for the name
const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Name = mongoose.model("Name", nameSchema);

module.exports = Name;
