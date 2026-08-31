import crypto from "crypto";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const INDEXING_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

function base64Url(value: string | Buffer): string {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function getServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ServiceAccount;
      if (parsed.client_email && parsed.private_key) return parsed;
    } catch {
      console.warn("[Google Indexing] GOOGLE_SERVICE_ACCOUNT_JSON is invalid JSON.");
    }
  }

  if (process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    return {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  }

  return null;
}

async function getAccessToken(account: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    iss: account.client_email,
    scope: INDEXING_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(account.private_key);
  const assertion = `${unsigned}.${base64Url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google OAuth failed (${response.status}): ${text.slice(0, 500)}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google OAuth response did not contain an access token.");
  return data.access_token;
}

export async function notifyGoogleUrlUpdated(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  if (process.env.GOOGLE_INDEXING_ENABLED !== "true") {
    return { ok: false, error: "disabled" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osb.com.sa";
  if (!url.startsWith(siteUrl)) {
    return { ok: false, error: "URL is outside NEXT_PUBLIC_SITE_URL." };
  }

  const account = getServiceAccount();
  if (!account) return { ok: false, error: "Google service account is not configured." };

  try {
    const accessToken = await getAccessToken(account);
    const response = await fetch(INDEXING_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      return { ok: false, status: response.status, error: text.slice(0, 1000) };
    }

    return { ok: true, status: response.status };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Unknown Google Indexing error" };
  }
}
