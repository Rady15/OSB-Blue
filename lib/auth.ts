import crypto from "crypto";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "osb-admin-secret-change-in-production";
const SESSION_COOKIE = "osb-admin-session";
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(SESSION_SECRET, "salt", 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(hash: string): string | null {
  try {
    const [ivHex, encrypted] = hash.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const key = crypto.scryptSync(SESSION_SECRET, "salt", 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch {
    return null;
  }
}

export function createSession(userId: string): string {
  const payload = JSON.stringify({ userId, exp: Date.now() + SESSION_TTL });
  return encrypt(payload);
}

export function verifySession(token: string): { userId: string } | null {
  const payload = decrypt(token);
  if (!payload) return null;
  try {
    const data = JSON.parse(payload);
    if (Date.now() > data.exp) return null;
    return { userId: data.userId };
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  return crypto.scryptSync(password, "osb-salt", 32).toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const testHash = crypto.scryptSync(password, "osb-salt", 32).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(testHash));
}

export { SESSION_COOKIE, SESSION_TTL };
