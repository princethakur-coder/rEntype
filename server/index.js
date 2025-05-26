import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import testRoutes from './routes/tests.js';
import leaderboardRoutes from './routes/leaderboard.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (disabled for development)
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//     process.exit(1);
//   }
// };
// connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'TypeMaster API is running' });
});

// Mock API endpoints for development
app.get('/api/texts', (req, res) => {
  const { difficulty = 'medium', category = 'general' } = req.query;
  
  // Sample texts based on difficulty and category
  const texts = {
    easy: {
      general: "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
      code: "function sayHello() { console.log('Hello, World!'); }",
      quotes: "The only way to do great work is to love what you do. - Steve Jobs",
    },
    medium: {
      general: "The ability to type without looking at the keyboard is called touch typing. This skill can significantly increase your typing speed and productivity.",
      code: "const calculateTotal = (items) => items.reduce((total, item) => total + item.price, 0);",
      quotes: "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
    },
    hard: {
      general: "The QWERTY keyboard layout was designed in the 1870s for typewriters to slow typists down and prevent jamming of mechanical keys. Despite this original intention, it remains the standard layout for most keyboards today.",
      code: "const memoize = (fn) => { const cache = {}; return (...args) => { const key = JSON.stringify(args); return cache[key] = cache[key] || fn(...args); }; };",
      quotes: "We know what we are, but know not what we may be. All the world's a stage, and all the men and women merely players. - William Shakespeare",
    },
  };
  
  // Get text based on difficulty and category
  const text = texts[difficulty]?.[category] || texts.medium.general;
  
  res.json({ text });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;