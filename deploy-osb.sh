#!/bin/bash
# OSB One-shot production deploy — run ONCE inside the server shell.
set -e
cd ~/osb || { echo "osb dir missing"; exit 1; }

echo "==> Node/npm versions"
node -v || echo "NO NODE!"
npm -v || echo "NO NPM!"

echo "==> npm install"
NODE_OPTIONS="--max-old-space-size=1024" npm install --omit=optional --no-audit --no-fund || { echo "npm install failed"; exit 1; }

echo "==> clean stale .next"
rm -rf .next

echo "==> npm run build (low-memory: single worker, capped heap)"
NODE_OPTIONS="--max-old-space-size=1024" LOW_MEM_BUILD=1 npm run build -- --no-lint || { echo "build failed"; exit 1; }

echo "==> server.js exists"
ls -la server.js

echo "==> write .env.production (DO NOT commit these)"
cat > .env.production <<'EOF'
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://osb.com.sa
ADMIN_SESSION_SECRET=v7qrYtWCw9md1lcROXy2IAEgSxLbfZks4PJhToeG
ADMIN_PASSWORD=FhYqHSZxp2sMWQro
EOF

echo "==> DONE. Built OK."
echo "Start the app in the Namecheap 'Setup Node.js App' panel"
echo "  Application root: osb"
echo "  Startup file:     server.js"
echo "  Startup function: handle"
echo "  (Node version: 24 — matches nodevenv/osb/24)"
