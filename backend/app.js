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

import aiRouter from './routes/ai.route.js';

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
app.use('/api', aiRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});


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
