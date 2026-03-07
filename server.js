const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// ─── MIDDLEWARE ─────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// ─── DATABASE CONNECTION ─────────────────────────────────
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  database: "portfolio_db1",
  port: 5432
});

// ─── DATABASE INITIALIZATION ─────────────────────────────
const initDB = async () => {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password_hash TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        tech_stack TEXT,
        github_url TEXT,
        live_url TEXT,
        image_url TEXT,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(100),
        level INTEGER
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create default admin
    const password = await bcrypt.hash("admin123", 10);

    await pool.query(`
      INSERT INTO admins (name,email,password_hash)
      VALUES ('Vivek','admin@gmail.com','${password}')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log("✅ Database initialized successfully");

  } catch (err) {
    console.error("❌ Database initialization error:", err.message);
  }
};

// ─── AUTH MIDDLEWARE ─────────────────────────────────────
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret_change_this"
    );
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

// ─── HEALTH CHECK ────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// ─── AUTH ROUTE ──────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {

    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    const admin = result.rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "dev_secret_change_this",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PROJECT ROUTES ──────────────────────────────────────

// Get projects
app.get("/api/projects", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM projects ORDER BY featured DESC, created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add project
app.post("/api/projects", authenticate, async (req, res) => {

  const {
    title,
    description,
    tech_stack,
    github_url,
    live_url,
    image_url,
    featured
  } = req.body;

  try {

    const result = await pool.query(
      `INSERT INTO projects
       (title,description,tech_stack,github_url,live_url,image_url,featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        title,
        description,
        tech_stack,
        github_url,
        live_url,
        image_url,
        featured || false
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
app.put("/api/projects/:id", authenticate, async (req, res) => {

  const { id } = req.params;

  const {
    title,
    description,
    tech_stack,
    github_url,
    live_url,
    image_url,
    featured
  } = req.body;

  try {

    const result = await pool.query(
      `UPDATE projects
       SET title=$1,description=$2,tech_stack=$3,github_url=$4,
           live_url=$5,image_url=$6,featured=$7,updated_at=NOW()
       WHERE id=$8
       RETURNING *`,
      [
        title,
        description,
        tech_stack,
        github_url,
        live_url,
        image_url,
        featured,
        id
      ]
    );

    if (!result.rows[0])
      return res.status(404).json({ error: "Project not found" });

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
app.delete("/api/projects/:id", authenticate, async (req, res) => {
  try {

    await pool.query("DELETE FROM projects WHERE id=$1", [req.params.id]);

    res.json({ message: "Project deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── SKILLS ROUTE ────────────────────────────────────────
app.get("/api/skills", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM skills ORDER BY category, level DESC"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CONTACT ROUTE ───────────────────────────────────────
app.post("/api/contact", async (req, res) => {

  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  try {

    await pool.query(
      "INSERT INTO contacts (name,email,message) VALUES ($1,$2,$3)",
      [name, email, message]
    );

    res.json({
      success: true,
      message: "Message received! I'll be in touch soon."
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get contact messages
app.get("/api/contact", authenticate, async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GITHUB API ──────────────────────────────────────────
app.get("/api/github/repos", async (req, res) => {

  try {

    const fetch = (await import("node-fetch")).default;

    const response = await fetch(
      "https://api.github.com/users/GodelVivek1068/repos?sort=updated&per_page=20"
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch GitHub repos"
    });

  }
});

// ─── START SERVER ────────────────────────────────────────
initDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
});