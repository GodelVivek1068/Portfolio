const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev_secret_change_this");
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { authenticate };
