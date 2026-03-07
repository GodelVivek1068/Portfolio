const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/portfolio_db",
});

// Test DB connection
pool.connect((err) => {
  if (err) console.error("❌ DB connection failed:", err.message);
  else console.log("✅ PostgreSQL connected");
});

module.exports = pool;
