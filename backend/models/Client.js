const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  status: { type: String, enum: ["active", "inactive", "pending"], default: "pending" },
  industry: String,
  credentials: Number,
  teamSize: Number,
  description: String,
  prd: { id: String, password: String, link: String },
  quality: { id: String, password: String, link: String },
  development80: { id: String, password: String, link: String },
  development100: { id: String, password: String, link: String },
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
