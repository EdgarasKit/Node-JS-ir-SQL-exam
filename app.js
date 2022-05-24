import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/api/users.js';
import blogaiRouter from './routes/api/blog.js';

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
    origin: `http://localhost:${PORT}`,
    optionsSuccessStatus: 200
  }

app.use(express.static('public'));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
 }));

// Views engine EJS
app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/blog', blogaiRouter);

app.listen(PORT, ()=>console.log(`Serveris paleistas ant ${PORT} porto.`));