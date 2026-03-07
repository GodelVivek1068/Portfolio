const express = require("express");
const pool = require("../config/database");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// ── Send Contact Message ──────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Invalid email" });

  try {
    await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.json({ success: true, message: "Message received! I'll be in touch soon." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Get All Contact Messages (Admin) ──────────────────────────────────────────
router.get("/", authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
