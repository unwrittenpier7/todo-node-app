import mongoose from 'mongoose'
const todoSchema = mongoose.Schema({
  task: { type: String },
});

export default mongoose.model("Todo", todoSchema);