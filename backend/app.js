import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/db.js';
import routes from './routes/v1/index.js';
import config from './config/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(config.PREFIX, routes);

export default app;

// Example URLs:
// fb.com/profile/person1
// fb.com/profile/person2
// fb.com/profile.person3
