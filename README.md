# VULN-SHOP — intentionally vulnerable e-commerce demo

**This application is deliberately insecure. It exists only to test the
ButterflyX scanner end to end: scan → risk score → AI fixes → push to GitHub → PR.**

Do not deploy it. Do not point real traffic at it. The "credentials" in
`config/payments.js` are fake values that match credential patterns.

## Run locally (optional)

```bash
npm install
npm start   # http://localhost:4000
```

## Deliberate issues planted for the scanner

| Where | Issue |
| --- | --- |
| `package.json` | Old pins with known CVEs: express 4.16.4, lodash 4.17.20, marked 0.3.5, jsonwebtoken 8.5.1, underscore 1.9.1 (confirmed OSV findings) |
| `routes/products.js` | SQL built by string concatenation (two sites), path traversal in image download |
| `routes/cart.js` | `eval()` on the coupon expression — dynamic code execution |
| `routes/auth.js` | MD5 password hashing, hardcoded admin password, JWT verified without algorithm pinning |
| `config/payments.js` | Fake Stripe/AWS/SMTP credentials committed to source |
| `server.js` | CORS allows any origin with credentials, no security headers |
| `Dockerfile` | Container runs as root |
| `.env` committed | Database URL with an embedded password |
