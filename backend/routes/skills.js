const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// ── Get All Skills ────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM skills ORDER BY category, level DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
