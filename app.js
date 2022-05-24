import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
    origin: `http://localhost:${PORT}`,
    optionsSuccessStatus: 200
  }

app.listen(PORT, ()=>console.log(`Serveris paleistas ant ${PORT} porto.`));