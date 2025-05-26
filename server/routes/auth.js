import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Mock user database for development
const users = [
  {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: '$2a$10$XJKRMsxMpjNi8N1o6FZX8u6HQq3xHFBtUt8Y/9FhbJL/YhN3tjzQK', // hashed 'password123'
  },
];

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      _id: (users.length + 1).toString(),
      username,
      email,
      password: hashedPassword,
    };

    // Add to mock database
    users.push(newUser);

    // Create token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || 'jwtsecret123',
      { expiresIn: '1d' }
    );

    // Send response
    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'jwtsecret123',
      { expiresIn: '1d' }
    );

    // Send response
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/user', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret123');
    
    // Find user by id
    const user = users.find(user => user._id === decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

export default router;