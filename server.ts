import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({});

// Mock Menu Items Database
let menuItems = [
    { id: 1, name: 'Classic Burger', price: 10.99, description: 'A classic beef burger' }
];

// GET /api/health
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /api/menu/analyze
app.post('/api/menu/analyze', async (req, res) => {
    try {
        const { ingredients } = req.body;
        if (!ingredients) {
             res.status(400).json({ error: 'ingredients are required' });
             return;
        }
        
        const prompt = `Analyze these food items for calories, protein, carbs, fats, and allergens: ${ingredients}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        res.json({ success: true, analysis: response.text });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/menu/optimize
app.post('/api/menu/optimize', async (req, res) => {
    try {
        const { itemDetails } = req.body;
        if (!itemDetails) {
             res.status(400).json({ error: 'itemDetails are required' });
             return;
        }
        
        const prompt = `Suggest a menu item description and pricing optimization for: ${JSON.stringify(itemDetails)}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        res.json({ success: true, optimization: response.text });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/menu/items
app.get('/api/menu/items', (req, res) => {
    // Returns current digital menu item database
    res.json({ success: true, data: menuItems });
});

app.listen(port, () => {
    console.log(`Menu- Server running on port ${port}`);
});
