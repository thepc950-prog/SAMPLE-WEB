# Mini vulnerable shop

Deliberately insecure, for testing the ButterflyX scanner only — never deploy.

Planted issues: SQL injection (`/search`), eval RCE (`/coupon`), MD5 + hardcoded
password (`/login`), vulnerable express 4.16.4 pin, committed `.env`, root Dockerfile.
