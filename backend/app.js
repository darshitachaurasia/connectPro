import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

// Route & Utility imports
import { generateCareerGuide } from "./services/career.service.js";
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

/* =========================
   CORS CONFIGURATION
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://connect-pro-rust.vercel.app",
  "https://connect-pro-9z7w.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests without origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS Blocked"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
  })
);

/* =========================
   PREFLIGHT HANDLER
========================= */

app.options("*", (req, res) => {
  res.sendStatus(200);
});

/* =========================
   GLOBAL MIDDLEWARE
========================= */

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

/* =========================
   MAIN API ROUTES
========================= */

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/service", serviceRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payment", paymentRouter);

/* =========================
   AI CAREER ROUTES
========================= */

app.post(
  "/api/career-guide",
  asyncHandler(async (req, res) => {
    const { career } = req.body;

    if (!career || career.trim() === "") {
      return res.status(400).json({ error: "Career field is required" });
    }

    const result = await generateCareerGuide(career);

    res.json({
      success: true,
      guide: result,
    });
  })
);

app.post(
  "/api/career-suggestions",
  asyncHandler(async (req, res) => {
    let { skills } = req.body;

    if (!skills) {
      return res.status(400).json({ error: "Skills required" });
    }

    const skillsStr = Array.isArray(skills) ? skills.join(", ") : skills;

    const reply = await generateCareerSuggestions(skillsStr);

    res.json({
      success: true,
      suggestions: reply,
    });
  })
);

/* =========================
   EMAIL SERVICE
========================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post("/api/send-email", async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Meeting Confirmed - ${name}`,
    html: `<p>Meeting link: <a href="https://meet.google.com/fsx-mntg-kbc">Join Now</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;