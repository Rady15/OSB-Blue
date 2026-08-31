const path = require("path");
const fs = require("fs");
const http = require("http");
const { parse } = require("url");

// Resolve node_modules regardless of Passenger/LiteSpeed CWD (symlinked on Namecheap).
const appDir = __dirname;
const paths = [
  path.join(appDir, "node_modules"),
  "/home/osbccnnx/nodevenv/osb/24/lib/node_modules",
  "/home/osbccnnx/osb/node_modules",
];
const existing = paths.filter((p) => fs.existsSync(p));
if (existing.length) {
  process.env.NODE_PATH = existing.join(path.delimiter);
  require("module").Module._initPaths();
}

function resolveNext() {
  try {
    return require("next");
  } catch (e) {
    for (const p of existing) {
      const candidate = path.join(p, "next");
      if (fs.existsSync(candidate)) return require(candidate);
    }
    throw e;
  }
}

const next = resolveNext();
const NODE_ENV = process.env.NODE_ENV || "production";
const app = next({ dev: NODE_ENV !== "production" });
const handle = app.getRequestHandler();

// CloudLinux Passenger bootstraps the exported server's listen() itself, and a
// request may arrive before app.prepare() finishes. Buffer requests until ready.
let ready = false;
const pending = [];

function respond(req, res) {
  if (ready) {
    handle(req, res, parse(req.url, true));
  } else {
    pending.push([req, res]);
  }
}

const server = http.createServer(respond);

app.prepare().then(() => {
  ready = true;
  while (pending.length) {
    const [req, res] = pending.shift();
    handle(req, res, parse(req.url, true));
  }
  console.log("> OSB app prepared (Passenger-managed listen)");
});

module.exports = server;
