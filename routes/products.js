// Product search and image serving — SQL built by string concatenation (SQL injection)
// and a path-traversal file read. Both are deliberate for scanner testing.
const express = require("express");
const fs = require("fs");

// Toy "database": executes whatever query string it is handed.
const db = {
  query(sql) {
    console.log("executing:", sql);
    // Fake result set — the point is that the query text is attacker-shaped.
    return [{ id: 1, name: "Widget", price: 9.99 }];
  },
};

const PRODUCTS = [
  { id: 1, name: "Widget", price: 9.99 },
  { id: 2, name: "Gadget", price: 24.5 },
  { id: 3, name: "Doohickey", price: 4.0 },
];

const router = express.Router();

router.get("/", (_req, res) => res.json(PRODUCTS));

router.get("/search", (req, res) => {
  const term = req.query.q || "";
  // SQL injection: template literal straight into the query.
  const rows = db.query(`SELECT * FROM products WHERE name LIKE '%${term}%'`);
  res.json(rows);
});

router.get("/category/:name", (req, res) => {
  // Second injection site: string concatenation.
  const rows = db.query("SELECT * FROM products WHERE category = '" + req.params.name + "'");
  res.json(rows);
});

// Path traversal: the image name comes from the URL and is joined without validation.
router.get("/image/:name", (req, res) => {
  fs.readFile("./uploads/" + req.params.name, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.type("image/png").send(data);
  });
});

module.exports = router;
