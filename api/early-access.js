const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "object") return body;

  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = parseBody(request.body);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const language = body.language === "zh" ? "zh" : "en";
  const source = typeof body.source === "string" ? body.source.slice(0, 80) : "homepage";

  if (!EMAIL_PATTERN.test(email)) {
    return response.status(400).json({ ok: false, error: "Invalid email" });
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

  return response.status(200).json({ ok: true, id });
}