import crypto from "node:crypto";

const password = process.argv[2];
const secret = process.env.ADMIN_SESSION_SECRET;
if (!password || !secret || secret.length < 32) {
  console.error("Usage: ADMIN_SESSION_SECRET='<32+ random chars>' node scripts/generate-admin-hash.mjs '<password>'");
  process.exit(1);
}
console.log(crypto.scryptSync(password, secret, 32).toString("hex"));
