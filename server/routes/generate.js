const express = require('express');
const router = express.Router();
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const resp = await model.generateContent(prompt);
    const contentResponse = await resp.response;
    res.json(contentResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating content' });
  }
});

module.exports = router;
