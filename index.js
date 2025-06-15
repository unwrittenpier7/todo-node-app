import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import todoRouter from "./routes/todoRoutes.js"; 

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI= process.env.MONGODB_URI

app.use("/todos", todoRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });