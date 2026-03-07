const express = require("express");
const pool = require("../config/database");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// ── Get All Projects ──────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY featured DESC, created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Create Project ────────────────────────────────────────────────────────────
router.post("/", authenticate, async (req, res) => {
  const { title, description, tech_stack, github_url, live_url, image_url, featured } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, tech_stack, github_url, live_url, image_url, featured || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Update Project ────────────────────────────────────────────────────────────
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description, tech_stack, github_url, live_url, image_url, featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE projects SET title=$1, description=$2, tech_stack=$3, github_url=$4,
       live_url=$5, image_url=$6, featured=$7, updated_at=NOW()
       WHERE id=$8 RETURNING *`,
      [title, description, tech_stack, github_url, live_url, image_url, featured, id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: "Project not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Delete Project ────────────────────────────────────────────────────────────
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM projects WHERE id = $1", [req.params.id]);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
