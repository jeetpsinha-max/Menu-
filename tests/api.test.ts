import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../server.js";

describe("Menu- AI API Integration Tests", () => {
  it("GET /api/health returns status ok and menu service info", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("service", "menu-ai-api");
    expect(res.headers).toHaveProperty("x-ratelimit-limit");
  });

  it("POST /api/gemini/ask returns 400 when prompt is missing", async () => {
    const res = await request(app).post("/api/gemini/ask").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Bad Request");
  });

  it("POST /api/gemini/ask returns valid response for food prompt", async () => {
    const res = await request(app)
      .post("/api/gemini/ask")
      .send({ prompt: "Create a vegan brunch dish idea" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("response");
  });

  it("POST /api/menu/analyze returns 400 when ingredients are missing", async () => {
    const res = await request(app).post("/api/menu/analyze").send({});
    expect(res.status).toBe(400);
  });

  it("GET /api/menu/items returns current menu items", async () => {
    const res = await request(app).get("/api/menu/items");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
