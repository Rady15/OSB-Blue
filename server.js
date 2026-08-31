const path = require("path");
const fs = require("fs");
const { parse } = require("url");

// Resolve node_modules regardless of LiteSpeed/Passenger CWD (symlinked on Namecheap).
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

const next = require("next");
const NODE_ENV = process.env.NODE_ENV || "production";
const app = next({ dev: NODE_ENV !== "production" });

const handle = app.getRequestHandler();

app.prepare();

// LiteSpeed/Passenger named handler (cPanel "Startup function: handle").
// Literal API: exports a (req, res) listener; server lifecycle managed by the host.
module.exports = function handleRequest(req, res) {
  handle(req, res, parse(req.url, true));
};
module.exports.handle = module.exports;
