import express from "express";
import todoModel from "../models/todoModel.js";

const todoRouter = express.Router();

// Add a todo
todoRouter.post("/add", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    const newTodo = await todoModel.create({ content });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Add error:", err.message);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Get all todos
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Delete a todo
todoRouter.delete("/:id", async (req, res) => {
  try {
    const result = await todoModel.deleteOne({ _id: req.params.id });
    res.json({ success: result.deletedCount === 1 });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default todoRouter;
