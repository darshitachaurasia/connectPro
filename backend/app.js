import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import OpenAI from "openai";
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import mentorRouter from './routes/mentor.route.js';
import serviceRouter from './routes/service.route.js';
import ApiError from './utils/ApiError.js';

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key in environment variables");
}

// Init OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
app.use('/api/service',serviceRouter)

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Career Suggestions Route using OpenAI SDK
// Career Suggestions Route using OpenAI SDK
app.post('/api/career-suggestions', asyncHandler(async (req, res) => {
  const { skills } = req.body;

  console.log("Received skills:", skills);

  if (!skills || skills.trim() === '') {
    return res.status(400).json({ error: 'Skills input is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful career advisor." },
        { role: "user", content: `Suggest 3 career paths for someone with skills in: ${skills}. Give each with a short reason.` },
      ],
      temperature: 0.7,
    });

    const reply = completion?.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No suggestions received from OpenAI");
    }

    res.json({ suggestions: reply });

  } catch (error) {
    console.error("🔥 OpenAI API error:", error.message);

    // Fallback suggestion
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
