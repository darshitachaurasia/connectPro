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
import paymentRouter from './routes/payment.route.js';
import ApiError from './utils/ApiError.js';
import asyncHandler from './utils/asyncHandler.js';

import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// For __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//const DAILY_API_KEY = process.env.DAILY_API_KEY;

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // update with frontend domain in prod
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


// Career Suggestions Route

app.use('/api/payment', paymentRouter);
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

    const reply = result.response.text().trim();

    if (!reply) throw new Error("No suggestions received from Gemini");

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

// Daily.co Room Creation
/**app.post("/api/create-room", async (req, res) => {
  try {
    const { mentorId, menteeId, sessionTime } = req.body;

    const resp = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: `session-${mentorId}-${menteeId}-${Date.now()}`,
        properties: {
          enable_chat: true,
          exp: Math.floor(Date.now() / 1000) + 3600, // 1 hr expiry
        },
      }),
    });

    const data = await resp.json();

    res.json({ roomUrl: data.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create room" });
  }
//});

/**  Daily.co Get Room
//app.get("/api/get-room/:sessionId", async (req, res) => {
  try {
    // Replace with DB lookup
    res.json({ roomUrl: "https://your-daily-domain.daily.co/sample-room" });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch room" });
  }
//});*/

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

// Nodemailer Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post("/send-email", async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Hi ${name}`,
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for trusting us ! 🎉</p>
      <p>Welcome to <strong>ConnectPro</strong>.</p>
      <p>Your meeting has been booked. Here’s the link: 
      <a href="https://meet.google.com/fsx-mntg-kbc">Join Meeting</a></p>
    `,
   
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export default app;
