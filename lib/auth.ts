import crypto from "crypto";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

const SESSION_COOKIE = "osb-admin-session";
const SESSION_TTL = 8 * 60 * 60 * 1000;
function getSecret(): string {
  if (process.env.NODE_ENV === "production" && (!SESSION_SECRET || SESSION_SECRET.length < 32)) {
    throw new Error("ADMIN_SESSION_SECRET must be set to a random value of at least 32 characters in production.");
  }
  return SESSION_SECRET || "local-development-only-secret-change-me";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSession(userId: string): string {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Date.now() + SESSION_TTL }), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token: string): { userId: string } | null {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expected = sign(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { userId?: string; exp?: number };
    if (!data.userId || !data.exp || Date.now() > data.exp) return null;
    return { userId: data.userId };
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  return crypto.scryptSync(password, getSecret(), 32).toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  try {
    const testHash = crypto.scryptSync(password, getSecret(), 32).toString("hex");
    const a = Buffer.from(hash, "hex");
    const b = Buffer.from(testHash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function getAdminPasswordHash(): string {
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  if (configuredHash) return configuredHash;
  const password = process.env.ADMIN_PASSWORD;
  if (!password && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD_HASH or ADMIN_PASSWORD must be configured in production.");
  }
  return hashPassword(password || "local-development-password");
}

export { SESSION_COOKIE, SESSION_TTL };
