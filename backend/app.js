// 1. All imports at the TOP
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { generateCareerGuide } from "./services/career.service.js";

// Route & Utility imports
import { generateCareerSuggestions } from "./services/llm.service.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import mentorRouter from "./routes/mentor.route.js";
import serviceRouter from "./routes/service.route.js";
import bookingRouter from "./routes/booking.routes.js";
import paymentRouter from "./routes/payment.route.js";
import ApiError from "./utils/ApiError.js";
import asyncHandler from "./utils/asyncHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173",
  "https://connect-pro-rust.vercel.app",
  "https://connect-pro-9z7w.vercel.app" // Removed the /ai
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // This will show up in your Render logs to tell you what origin was blocked
        console.error(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
  })
);

// Explicitly handle preflight across all routes
app.options("*", cors()); 

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.post(
  "/api/career-guide",
  asyncHandler(async (req, res) => {
    const { career } = req.body;

    if (!career || career.trim() === "") {
      return res.status(400).json({ error: "Career field is required" });
    }

    try {
      const result = await generateCareerGuide(career);
      res.json({ guide: result });
    } catch (error) {
      console.error("Career Guide Error:", error.message);

      res.status(500).json({
        guide:
          "⚠️ Unable to generate career guide at the moment. Please try again later.",
      });
    }
  }),
);
// Middleware


// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/service", serviceRouter);
app.use("/api/bookings", bookingRouter);

// Career Suggestions Route

app.use("/api/payment", paymentRouter);
app.use(
  "/api/career-suggestions",
  asyncHandler(async (req, res) => {
    let { skills } = req.body;
    console.log("📩 Received skills:", skills);

    if (Array.isArray(skills)) {
      skills = skills.join(", ");
    }

    if (!skills || skills.trim() === "") {
      return res.status(400).json({ error: "Skills input is required" });
    }

    try {
      const reply = await generateCareerSuggestions(skills);

      res.json({ suggestions: reply });
    } catch (error) {
      console.error("🔥 LLM API error:", error.message);

      const fallback = `Sorry, we're currently unable to fetch AI-based career suggestions. 
Here are 3 general career options based on your skills:
1. Software Developer – Ideal for logical thinkers and coders.
2. Data Analyst – Great if you're good at problem-solving and numbers.
3. Technical Writer – Perfect for those with both tech and communication skills.`;

      res.status(200).json({ suggestions: fallback });
    }
  }),
);

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
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
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

  if (process.env.NODE_ENV !== "production") {
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
  host: "smtp.gmail.com",
  port: 465, // 465 for secure, 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // your Gmail address
    pass: process.env.SMTP_PASSWORD, // your App Password
  },
  tls: {
    rejectUnauthorized: false, // avoids self-signed cert issues
  },
});

app.post("/api/send-email", async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USER,
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
