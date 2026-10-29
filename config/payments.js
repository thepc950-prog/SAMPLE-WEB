// Payment configuration with committed "credentials" — all FAKE values chosen to
// match credential patterns, so the secret detector has something to find.
module.exports = {
  stripe: {
    // FAKE key for scanner testing only.
    secretKey: "sk_live_51FakeKeyForScannerTesting0000",
  },
  aws: {
    // FAKE access key id (AWS documentation example key).
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    region: "us-east-1",
  },
  smtp: {
    host: "smtp.fake-mail.example",
    user: "shop-billing@fake-mail.example",
    password: "P@ssw0rd-Committed-To-Git",
  },
};
