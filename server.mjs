import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), "dist");
const port = Number.parseInt(process.env.PORT || "8080", 10);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const sendJson = (response, status, body) => {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
};

const readJsonBody = async (request) => {
  let rawBody = "";
  for await (const chunk of request) {
    rawBody += chunk;
    if (rawBody.length > 64 * 1024) {
      throw new Error("Payload too large");
    }
  }
  return rawBody ? JSON.parse(rawBody) : {};
};

const handleEarlyAccess = async (request, response) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const language = body.language === "zh" ? "zh" : "en";
    const source = typeof body.source === "string" ? body.source.slice(0, 80) : "homepage";

    if (!emailPattern.test(email)) {
      sendJson(response, 400, { ok: false, error: "Invalid email" });
      return;
    }

    const id = Math.floor(Math.random() * 89999 + 10000).toString();
    console.log(JSON.stringify({
      event: "early_access_request",
      id: `PE-REQ-${id}`,
      email,
      language,
      source,
      createdAt: new Date().toISOString(),
    }));
    sendJson(response, 200, { ok: true, id });
  } catch {
    sendJson(response, 400, { ok: false, error: "Invalid request" });
  }
};

const serveFile = async (request, response, filePath) => {
  const stats = await fs.stat(filePath);
  const extension = extname(filePath).toLowerCase();
  const isAsset = filePath.includes(`${sep}assets${sep}`);
  response.writeHead(200, {
    "Cache-Control": isAsset ? "public, max-age=31536000, immutable" : "no-cache",
    "Content-Length": stats.size,
    "Content-Type": contentTypes.get(extension) || "application/octet-stream",
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  createReadStream(filePath).pipe(response);
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", "http://localhost");

  if (requestUrl.pathname === "/healthz") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (requestUrl.pathname === "/api/early-access") {
    await handleEarlyAccess(request, response);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const requestedPath = decodeURIComponent(requestUrl.pathname);
    const relativePath = requestedPath === "/" ? "index.html" : requestedPath.replace(/^\/+/, "");
    const filePath = normalize(join(rootDirectory, relativePath));
    if (!filePath.startsWith(`${rootDirectory}${sep}`)) {
      sendJson(response, 400, { ok: false, error: "Invalid path" });
      return;
    }

    try {
      await serveFile(request, response, filePath);
    } catch {
      await serveFile(request, response, join(rootDirectory, "index.html"));
    }
  } catch {
    sendJson(response, 400, { ok: false, error: "Invalid request" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Prism-Edge homepage listening on ${port}`);
});
