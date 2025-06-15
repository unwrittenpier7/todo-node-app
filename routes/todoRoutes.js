import express from 'express';
import todoModel from "../models/todoModel.js";

const todoRouter = express.Router();

// Add a new todo
todoRouter.post("/add", async (req, res) => {
  const { task } = req.body;
  const result = await todoModel.insertOne({ task });
  return res.json(result); 
});

// Get all todos
todoRouter.get("/", async (req, res) => {
  const result = await todoModel.find();
  return res.json(result);
});

// Delete a todo by id
todoRouter.delete("/:id", async (req, res) => {
  const result = await todoModel.deleteOne({ _id: req.params.id });
  return res.json({ success: result.deletedCount === 1 });
});

export default todoRouter;
