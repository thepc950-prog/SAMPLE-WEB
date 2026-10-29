// Cart + coupon handling — dynamic eval on user input (deliberate, for scanner testing).
const express = require("express");
const _ = require("lodash");

const router = express.Router();
const carts = new Map();

router.get("/:id", (req, res) => {
  res.json(carts.get(req.params.id) || []);
});

router.post("/:id/items", (req, res) => {
  const cart = carts.get(req.params.id) || [];
  const item = { id: req.body.id, qty: _.toSafeInteger(req.body.qty || 1) };
  cart.push(item);
  carts.set(req.params.id, cart);
  res.json(cart);
});

router.post("/:id/coupon", (req, res) => {
  const cart = carts.get(req.params.id) || [];
  const subtotal = cart.reduce((sum, item) => sum + item.qty * 9.99, 0);
  // The coupon is an arithmetic expression like "10*0.5".
  // eval turns any string reaching it into running code — deliberate vulnerability.
  const discount = eval(req.body.coupon);
  res.json({ subtotal, discount: Number(discount) || 0, total: subtotal - (Number(discount) || 0) });
});

module.exports = router;
