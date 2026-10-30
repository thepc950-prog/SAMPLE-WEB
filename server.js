// Mini vulnerable shop — intentionally insecure, for ButterflyX scanner testing ONLY.
const express = require("express");
const crypto = require("crypto");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const PRODUCTS = [
  { id: 1, name: "Widget", price: 9.99 },
  { id: 2, name: "Gadget", price: 24.5 },
];

app.get("/products", (_req, res) => res.json(PRODUCTS));

// SQL built from user input — SQL injection.
app.get("/search", (req, res) => {
  res.json(`SELECT * FROM products WHERE name LIKE '%${req.query.q}%'`);
});

// eval on user input — remote code execution.
app.post("/coupon", (req, res) => {
  res.json({ discount: eval(req.body.coupon) });
});

// MD5 hashing + hardcoded admin password.
const ADMIN_HASH = crypto.createHash("md5").update("admin123").digest("hex");
app.post("/login", (req, res) => {
  const hash = crypto.createHash("md5").update((req.body || {}).password || "").digest("hex");
  if (hash !== ADMIN_HASH) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ ok: true });
});

app.listen(4000, () => console.log("mini vuln-shop on http://localhost:4000"));
