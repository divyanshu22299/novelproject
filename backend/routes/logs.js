// routes/logs.js
const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// Save a log
router.post("/", async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    console.error("Error saving log:", err);
    res.status(500).json({ error: "Error saving log" });
  }
});

// Get logs with pagination
router.get("/", async (req, res) => {
  try {
    // Query params → default page=1, limit=20
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Fetch logs (latest first)
    const logs = await Log.find()
      .sort({ time: -1 })
      .skip(skip)
      .limit(limit);

    // Count total logs for frontend check
    const total = await Log.countDocuments();

    res.json({
      logs,
      total,
      page,
      pages: Math.ceil(total / limit),
      hasMore: page * limit < total, // quick check for frontend
    });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Error fetching logs" });
  }
});

module.exports = router;
