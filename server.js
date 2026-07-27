import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname)); // is se HTML, CSS, JS serve honge

app.post('/api/generate', async (req, res) => {
  try {
    const { subject, goal, days } = req.body;
    const prompt = `You are a helpful study planner. Create a ${days} day study plan for subject: ${subject}. Goal: ${goal}. Make it clear, with daily tasks.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] })
    });

    const data = await response.json();
    const plan = data.candidates[0].content.parts[0].text;
    
    res.json({ plan });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
