# OSB Production Release

## 1. Required environment variables

Set these in the hosting provider before deployment:

- `ADMIN_SESSION_SECRET` — random secret, 32+ characters.
- `ADMIN_PASSWORD_HASH` — recommended. Generate with:
  `ADMIN_SESSION_SECRET='...' node scripts/generate-admin-hash.mjs 'YOUR_PASSWORD'`
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID, if used.
- `GOOGLE_SITE_VERIFICATION` — Search Console HTML verification token, if using metadata verification.
- `LEAD_WEBHOOK_URL` — optional endpoint for CRM/Make/n8n/WhatsApp workflow delivery.
- `NEXT_PUBLIC_SITE_URL=https://osb.com.sa`

Never commit `.env` or production secrets.

## 2. Leads

The consultation endpoint now validates input, blocks the honeypot field, rate-limits bursts, stores accepted leads in `data/store/leads.json`, and optionally forwards them to `LEAD_WEBHOOK_URL`.

For a multi-instance/serverless deployment, replace the local JSON lead store with PostgreSQL/Supabase/Neon or another durable database before relying on it as the system of record.

## 3. SEO / Google

Production routes include:

- `/robots.txt`
- `/sitemap.xml`
- canonical URLs
- Open Graph metadata
- Twitter metadata
- Organization + WebSite JSON-LD
- Service JSON-LD
- Article JSON-LD

After deployment:

1. Verify `https://osb.com.sa/robots.txt`.
2. Verify `https://osb.com.sa/sitemap.xml`.
3. Add the domain property in Google Search Console.
4. Submit `https://osb.com.sa/sitemap.xml`.
5. Request indexing for the homepage, Services, About, Contact, and key service pages.
6. Inspect pages and confirm Google can render them without errors.

Robots/sitemap make the site crawlable; they do not guarantee rankings or immediate indexing.

## 4. Security

Admin sessions use signed HMAC tokens, production secrets are mandatory, cookies are HttpOnly/SameSite/secure in production, uploads reject SVG and validate image signatures, and common security headers are enabled.

## 5. Release checklist

- [ ] Domain points to production host.
- [ ] HTTPS active.
- [ ] Environment variables configured.
- [ ] Admin login tested.
- [ ] Consultation form tested end-to-end.
- [ ] Lead webhook/CRM tested if configured.
- [ ] Google Analytics realtime test completed if configured.
- [ ] Search Console verification completed.
- [ ] Sitemap submitted.
- [ ] No demo blog content remains.
- [ ] Maintenance mode disabled.
- [ ] Backup strategy configured for `data/store` if using filesystem storage.


## Automatic Google URL notification

The admin blog publish/update flow can optionally notify Google's Indexing API after a published article is saved. Set `GOOGLE_INDEXING_ENABLED=true` and configure a Google service account using `GOOGLE_SERVICE_ACCOUNT_JSON` (or the separate client-email/private-key variables). The service account must be granted ownership/access in Google Search Console and the Indexing API must be enabled.

**Important:** Google's current documentation says the Indexing API is only supported for pages containing `JobPosting` or `BroadcastEvent` structured data. Normal editorial blog articles are not an eligible use case. Therefore OSB continues to rely on its automatically updated `sitemap.xml`, canonical URLs and normal Google crawling for blog content. The optional notifier is included for eligible content and controlled environments; it must not be treated as a guarantee of indexing. citeturn0search0turn0search1
