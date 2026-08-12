import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Rate Limiting Headers Middleware
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 60;

app.use((req, res, next) => {
  const ip = req.ip || "127.0.0.1";
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  res.setHeader("X-RateLimit-Limit", MAX_REQUESTS.toString());
  res.setHeader("X-RateLimit-Remaining", Math.max(0, MAX_REQUESTS - record.count).toString());
  res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000).toString());

  next();
});

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

// Mock Menu Items Database
let menuItems = [
  { id: 1, name: 'Classic Burger', price: 10.99, description: 'A classic beef burger' }
];

// GET /api/health
app.get('/api/health', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  res.json({
    status: 'ok',
    service: 'menu-ai-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    geminiConfigured: Boolean(apiKey && apiKey !== "your_gemini_api_key_here")
  });
});

// POST /api/gemini/ask
app.post('/api/gemini/ask', async (req, res) => {
  try {
    const { prompt, model = 'gemini-2.5-flash', systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: "Bad Request",
        message: "The 'prompt' field is required in request body."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return res.json({
        success: true,
        response: `[Menu AI Fallback Mode] Gemini API key not configured. Processed prompt: "${prompt}"`,
        fallback: true,
        model
      });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: model || 'gemini-2.5-flash',
      contents: prompt,
      ...(systemInstruction ? { config: { systemInstruction } } : {})
    });

    return res.json({
      success: true,
      response: response.text || "",
      fallback: false,
      model: model || 'gemini-2.5-flash'
    });
  } catch (error: any) {
    console.error("Menu AI Gemini error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to process menu request",
      fallback: true
    });
  }
});

// POST /api/menu/analyze
app.post('/api/menu/analyze', async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients) {
      return res.status(400).json({ error: 'ingredients are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return res.json({
        success: true,
        analysis: `Fallback analysis for ingredients: ${ingredients}. Approx calories: 450 kcal, Protein: 25g.`,
        fallback: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze these food items for calories, protein, carbs, fats, and allergens: ${ingredients}`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.json({ success: true, analysis: response.text });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, fallback: true });
  }
});

// POST /api/menu/optimize
app.post('/api/menu/optimize', async (req, res) => {
  try {
    const { itemDetails } = req.body;
    if (!itemDetails) {
      return res.status(400).json({ error: 'itemDetails are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return res.json({
        success: true,
        optimization: `Fallback menu optimization: Highlight fresh local ingredients and suggest a \$12.99 price point.`,
        fallback: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Suggest a menu item description and pricing optimization for: ${JSON.stringify(itemDetails)}`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.json({ success: true, optimization: response.text });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, fallback: true });
  }
});

// GET /api/menu/items
app.get('/api/menu/items', (req, res) => {
  res.json({ success: true, data: menuItems });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Menu- Server running on port ${port}`);
  });
}
