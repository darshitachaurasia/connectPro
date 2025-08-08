import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import mentorRouter from './routes/mentor.route.js';
import serviceRouter from './routes/service.route.js';
import ApiError from './utils/ApiError.js';

// Check for API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

// Init Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// App config
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/mentor', mentorRouter);
app.use('/api/service', serviceRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Career Suggestions Route using Gemini
app.post('/api/career-suggestions', asyncHandler(async (req, res) => {
  const { skills } = req.body;

  console.log("Received skills:", skills);

  if (!skills || skills.trim() === '') {
    return res.status(400).json({ error: 'Skills input is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Suggest 3 career paths for someone with skills in: ${skills}. 
    Provide each with a short reason. Format and show case better no use of *`;

    const result = await model.generateContent(prompt);
    const reply = result?.response?.text();

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
}));

// Error Handler Middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: null,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error("Server Error:", err);
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    data: null,
  });
});

export default app;
