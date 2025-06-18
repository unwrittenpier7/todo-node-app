import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todoRoutes.js';

dotenv.config();
const app = express();

// CORS Middleware
app.use(cors({
  origin: ['https://todo-app-react-git-main-joel-peters-projects.vercel.app'], // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Routes
app.use('/todos', todoRouter);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined');
  throw new Error('MONGODB_URI is not defined');
}

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log('✅ Using cached MongoDB connection');
    return cachedDb;
  }

  try {
    console.log('🔌 Connecting to MongoDB...');
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = db;
    console.log('✅ MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Connect to DB once (if used in server.js)
await connectToDatabase();

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the To-Do App API' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
