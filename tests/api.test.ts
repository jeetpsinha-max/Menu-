import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "http";
import { app } from "../server.js";

let server: http.Server;
let baseUrl: string;

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 3000;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

describe("Menu- AI API Integration Tests", () => {
  it("GET /api/health returns status ok and menu service info", async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("status", "ok");
    expect(body).toHaveProperty("service", "menu-ai-api");
    expect(res.headers.get("x-ratelimit-limit")).toBeDefined();
  });

  it("POST /api/gemini/ask returns 400 when prompt is missing", async () => {
    const res = await fetch(`${baseUrl}/api/gemini/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty("error", "Bad Request");
  });

  it("POST /api/gemini/ask returns valid response for food prompt", async () => {
    const res = await fetch(`${baseUrl}/api/gemini/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Create a vegan brunch dish idea" })
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("success", true);
    expect(body).toHaveProperty("response");
  });

  it("POST /api/menu/analyze returns 400 when ingredients are missing", async () => {
    const res = await fetch(`${baseUrl}/api/menu/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    expect(res.status).toBe(400);
  });

  it("GET /api/menu/items returns current menu items", async () => {
    const res = await fetch(`${baseUrl}/api/menu/items`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("success", true);
    expect(Array.isArray(body.data)).toBe(true);
  });
});
