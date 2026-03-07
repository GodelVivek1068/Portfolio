const express = require("express");

const router = express.Router();

// ── GitHub Proxy ──────────────────────────────────────────────────────────────
router.get("/repos", async (req, res) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(
      `https://api.github.com/users/GodelVivek1068/repos?sort=updated&per_page=20`,
      { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}` } }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
});

module.exports = router;
