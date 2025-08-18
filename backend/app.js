// app.js
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
import bookingRouter from './routes/booking.routes.js';
import ApiError from './utils/ApiError.js';
import asyncHandler from './utils/asyncHandler.js';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("🔑 GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Loaded" : "Missing")

// App config
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
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
app.use('/api/bookings', bookingRouter);
app.use('/api/career-suggestions', asyncHandler(async (req, res) => {
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

    // ✅ Correct way to extract Gemini text
    const reply = result.response.text().trim();

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
}))

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});


// Error Handler Middleware
app.use((err, req, res, next) => {
  console.log(err);
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
