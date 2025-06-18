import express from 'express';
import cors from 'cors';
import todoRouter from './routes/todoRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['https://todo-app-react-git-main-joel-peters-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Routes
app.use('/todos', todoRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the To-Do App API' });
});

export default app;
