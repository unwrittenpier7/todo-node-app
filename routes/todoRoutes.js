import express from 'express';
import todoModel from "../models/todoModel.js";

const todoRouter = express.Router();

// ✅ Fix: use "content", not "task", and use Mongoose .create()
todoRouter.post("/add", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Content is required" });
    }

    const newTodo = await todoModel.create({ content });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Add todo error:", err.message);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// ✅ Get all todos
todoRouter.get("/", async (req, res) => {
  const result = await todoModel.find();
  res.json(result);
});

// ✅ Delete a todo by id
todoRouter.delete("/:id", async (req, res) => {
  try {
    const result = await todoModel.deleteOne({ _id: req.params.id });
    res.json({ success: result.deletedCount === 1 });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default todoRouter;