import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import ApiError from "./utils/ApiError.js";

// app config
const app = express();
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());



// Auth routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            data: null,
        });
    }
    console.error(err); // Log the error for debugging
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
        data: null,
    });
});


export default app;