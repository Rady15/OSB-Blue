const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const hostname = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  handle(req, res, parsedUrl);
});

app.prepare().then(() => {
  server.listen(port, hostname);
  console.log(`> OSB app ready on ${hostname}:${port}`);
});

module.exports = server;
