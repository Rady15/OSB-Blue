# OSB Deployment — cPanel Node.js App

The full source was uploaded to: ~/osb

## 1) Create Node.js App (cPanel > Setup Node.js App > Create Application)
- Node.js version: 20.x (or latest available)
- Application root: osb
- Application URL: https://osb.com.sa
- Application startup file: server.js
- Application startup function: handle
- Save

## 2) Install & build (cPanel > Setup Node.js App > your app > "Run npm script")
- npm install
- npm run build

## 3) Environment variables (cPanel > app > Environment Variables)
- NODE_ENV = production
- ADMIN_SESSION_SECRET = <32+ random chars>
- ADMIN_PASSWORD = <admin login password>
- NEXT_PUBLIC_SITE_URL = https://osb.com.sa
- (optional) NEXT_PUBLIC_GA_ID
- (optional) LEAD_WEBHOOK_URL

## 4) Start
- Press Restart / Start on the app.

## Admin login
- URL: https://osb.com.sa/admin
- Use the password you set in ADMIN_PASSWORD.

## Note
SSH is closed on this host, so npm install/build must be run from the cPanel
"Setup Node.js App > Run npm script" UI (that runs via cPanel, not SSH).
