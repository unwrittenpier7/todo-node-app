import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRouter);

// MongoDB connection (optimized for serverless)
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in environment variables");
  throw new Error("MONGODB_URI is not defined");
}

// Cache the MongoDB connection to reuse across serverless invocations
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb;
  }

  try {
    console.log("Connecting to MongoDB...");
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = db;
    console.log("MongoDB connected successfully");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Middleware to ensure MongoDB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to the database" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do App API");
});

// Error handling middleware to catch unhandled errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Export the app for Vercel
export default app;