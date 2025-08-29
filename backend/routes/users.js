const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/users/:uid
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found", isAdmin: false });
    }

    res.json({
      email: user.email,
      isAdmin: user.isAdmin || false,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", isAdmin: false });
  }
});

module.exports = router;
