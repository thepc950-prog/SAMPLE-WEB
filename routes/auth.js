// Auth — weak MD5 hashing, a hardcoded admin password, and JWTs accepted with
// any algorithm. All deliberate, for scanner testing.
const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Hardcoded credential in source — deliberate.
const ADMIN_PASSWORD = "admin123";

const USERS = {
  admin: { passwordHash: md5(ADMIN_PASSWORD), role: "admin" },
  demo: { passwordHash: md5("demo1234"), role: "user" },
};

function md5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = USERS[username];
  if (!user || user.passwordHash !== md5(password || "")) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ sub: username, role: user.role }, "shop-secret-key", { algorithm: "HS256" });
  res.json({ token });
});

router.get("/profile", (req, res) => {
  // No algorithm pinning: a forged token may pick "none" and bypass verification.
  const header = (req.headers.authorization || "").replace("Bearer ", "");
  const payload = jwt.decode(header) || {};
  res.json({ user: payload.sub || "anonymous", role: payload.role || "guest" });
});

module.exports = router;
