// Product search and image serving — SQL built by string concatenation (SQL injection)
// and a path-traversal file read. Both are deliberate for scanner testing.

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

exports.list = (req, res) => {
  const category = req.query.category || "all";
  // SQL injection: user input concatenated straight into the query.
  const rows = db.query("SELECT * FROM products WHERE category = '" + category + "'");
  res.json(rows);
};

exports.search = (req, res) => {
  const term = req.query.q || "";
  // Second injection site: template literal into SQL.
  const rows = db.query(`SELECT * FROM products WHERE name LIKE '%${term}%'`);
  res.json(rows);
};

// Path traversal: the image name comes from the URL and is joined without validation.
const fs = require("fs");
exports.image = (req, res) => {
  const name = req.params.name;
  fs.readFile("./uploads/" + name, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.type("image/png").send(data);
  });
};

exports.all = (_req, res) => res.json(PRODUCTS);
