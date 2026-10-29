/*
  VULN-SHOP — intentionally vulnerable e-commerce demo.
  Every issue in this codebase is deliberate, for testing the ButterflyX scanner.
  DO NOT deploy this anywhere or connect it to real data.
*/
const express = require("express");
const cors = require("cors");

const app = express();

// Wide-open CORS with credentials: any website can call this API from a browser.
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const products = require("./routes/products");
const cart = require("./routes/cart");
const auth = require("./routes/auth");

app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`vuln-shop listening on http://localhost:${PORT}`));
