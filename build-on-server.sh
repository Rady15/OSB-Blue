#!/bin/bash
# OSB server-side production build (low memory) — run from cPanel/terminal in ~/osb
cd "$HOME/osb" || exit 1
echo "==> node: $(node -v), npm: $(npm -v)"
echo "==> clearing stale .next"
rm -rf .next
echo "==> installing deps (cached; no audit/fund)"
NODE_OPTIONS="--max-old-space-size=1024" npm install --no-audit --no-fund --omit=optional
echo "==> building (single worker, capped heap)"
NODE_OPTIONS="--max-old-space-size=1024" LOW_MEM_BUILD=1 npm run build -- --no-lint
echo "==> build exit: $?"
echo "==> .next BUILD_ID:"
cat .next/BUILD_ID 2>/dev/null
echo ""
echo "==> DONE. If BUILD_ID printed above, the build is valid. Restart the app in the panel."
