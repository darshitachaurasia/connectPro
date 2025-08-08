// skill.controller.js
import asyncHandler from '../utils/asyncHandler.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Career suggestions based on skills
export const skill = asyncHandler(async (req, res) => {
  let { skills } = req.body;

  console.log("📩 Received skills:", skills);

  if (Array.isArray(skills)) {
    skills = skills.join(', ');
  }

  if (!skills || skills.trim() === '') {
    return res.status(400).json({ error: 'Skills input is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Suggest 3 career paths for someone with skills in: ${skills}.
For each path, give a short reason.
Do not use bullet points or asterisks.
Format clearly in numbered points.
    `;

    const result = await model.generateContent(prompt);
    const reply = result?.response?.text()?.trim();

    if (!reply) {
      throw new Error("No suggestions received from Gemini");
    }

    res.json({ suggestions: reply });
  } catch (error) {
    console.error("🔥 Gemini API error:", error.message);

    const fallback = `Sorry, we're currently unable to fetch AI-based career suggestions. 
Here are 3 general career options based on your skills:
1. Software Developer – Ideal for logical thinkers and coders.
2. Data Analyst – Great if you're good at problem-solving and numbers.
3. Technical Writer – Perfect for those with both tech and communication skills.`;

    res.status(200).json({ suggestions: fallback });
  }
});

// AI Career Counsellor
export const counsellor = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an AI career advisor. Answer concisely and helpfully.
User: ${query}
    `;

    const result = await model.generateContent(prompt);
    const reply = result?.response?.text()?.trim();

    if (!reply) {
      throw new Error("No response received from Gemini");
    }

    res.json({
      content: reply,
      suggestions: [
        "Explore career options",
        "Salary information",
        "Skill requirements"
      ]
    });
  } catch (error) {
    console.error("🔥 Career Counsellor Error:", error.message);
    res.status(500).json({
      content: "Something went wrong while fetching AI response.",
      suggestions: ["Retry", "Change question"]
    });
  }
});
