import express from 'express';

const router = express.Router();

// Mock leaderboard data
const leaderboardData = [
  { id: 1, rank: 1, username: 'speedmaster', wpm: 148, accuracy: 98.7, tests: 253 },
  { id: 2, rank: 2, username: 'typingwizard', wpm: 142, accuracy: 97.5, tests: 178 },
  { id: 3, rank: 3, username: 'keyboardking', wpm: 136, accuracy: 96.8, tests: 321 },
  { id: 4, rank: 4, username: 'swiftfingers', wpm: 131, accuracy: 98.2, tests: 145 },
  { id: 5, rank: 5, username: 'typingstorm', wpm: 129, accuracy: 95.9, tests: 232 },
  { id: 6, rank: 6, username: 'keyboardninja', wpm: 124, accuracy: 97.1, tests: 189 },
  { id: 7, rank: 7, username: 'wordracer', wpm: 122, accuracy: 96.5, tests: 210 },
  { id: 8, rank: 8, username: 'quicktyper', wpm: 119, accuracy: 95.8, tests: 175 },
  { id: 9, rank: 9, username: 'flashtyper', wpm: 117, accuracy: 94.9, tests: 163 },
  { id: 10, rank: 10, username: 'typemaster', wpm: 115, accuracy: 97.2, tests: 142 },
  { id: 11, rank: 11, username: 'speedtype', wpm: 114, accuracy: 96.1, tests: 135 },
  { id: 12, rank: 12, username: 'keyhero', wpm: 112, accuracy: 95.5, tests: 128 },
  { id: 13, rank: 13, username: 'typingpro', wpm: 110, accuracy: 94.8, tests: 154 },
  { id: 14, rank: 14, username: 'keymaster', wpm: 108, accuracy: 95.2, tests: 112 },
  { id: 15, rank: 15, username: 'wordsmith', wpm: 107, accuracy: 96.3, tests: 98 },
  { id: 16, rank: 16, username: 'typingace', wpm: 105, accuracy: 94.7, tests: 87 },
  { id: 17, rank: 17, username: 'fastfingers', wpm: 103, accuracy: 93.9, tests: 76 },
  { id: 18, rank: 18, username: 'typingstudent', wpm: 101, accuracy: 95.1, tests: 92 },
  { id: 19, rank: 19, username: 'keystrokes', wpm: 99, accuracy: 94.2, tests: 63 },
  { id: 20, rank: 20, username: 'testuser', wpm: 97, accuracy: 93.5, tests: 45 },
];

// Get leaderboard data
router.get('/', (req, res) => {
  try {
    const { timeFrame = 'all', limit = 20, page = 1 } = req.query;
    
    // Filter by time frame (in a real app, this would use dates)
    let filteredData = [...leaderboardData];
    
    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    res.json({
      total: filteredData.length,
      page: Number(page),
      limit: Number(limit),
      data: paginatedData,
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's rank
router.get('/user/:username', (req, res) => {
  try {
    const { username } = req.params;
    
    // Find user's rank
    const userRank = leaderboardData.findIndex(user => user.username === username);
    
    if (userRank === -1) {
      return res.status(404).json({ message: 'User not found in leaderboard' });
    }
    
    res.json({
      rank: userRank + 1,
      ...leaderboardData[userRank],
    });
  } catch (error) {
    console.error('Get user rank error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;