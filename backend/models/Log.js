const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  email: String,
  clientId: String,
  clientName: String,
  environment: String,
  time: String
});

module.exports = mongoose.model("Log", logSchema);
