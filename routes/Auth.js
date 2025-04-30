const express = require("express");
const router = express.Router();

// Login route
router.post("/login", (req, res) => {
  res.json({ message: "Login successful (placeholder)" });
});

// Check-auth route
router.get("/check-auth", (req, res) => {
  res.json({ message: "User is authenticated (placeholder)" });
});

module.exports = router;
