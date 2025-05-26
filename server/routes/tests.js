import express from 'express';

const router = express.Router();

// Mock test results database
let testResults = [
  {
    id: '1',
    userId: '1',
    wpm: 65,
    accuracy: 94.2,
    errorCount: 8,
    duration: 60,
    difficulty: 'medium',
    category: 'general',
    date: new Date('2023-11-20T12:00:00.000Z'),
  },
  {
    id: '2',
    userId: '1',
    wpm: 70,
    accuracy: 95.8,
    errorCount: 5,
    duration: 60,
    difficulty: 'easy',
    category: 'general',
    date: new Date('2023-11-19T15:30:00.000Z'),
  },
];

// Get user's test results
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user's test results
    const userTests = testResults.filter(test => test.userId === userId);
    
    res.json(userTests);
  } catch (error) {
    console.error('Get tests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save a new test result
router.post('/', (req, res) => {
  try {
    const { userId, wpm, accuracy, errorCount, duration, difficulty, category } = req.body;
    
    // Create new test result
    const newTest = {
      id: (testResults.length + 1).toString(),
      userId,
      wpm,
      accuracy,
      errorCount,
      duration,
      difficulty,
      category,
      date: new Date(),
    };
    
    // Add to mock database
    testResults.push(newTest);
    
    res.status(201).json(newTest);
  } catch (error) {
    console.error('Save test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user stats
router.get('/stats/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user's test results
    const userTests = testResults.filter(test => test.userId === userId);
    
    if (userTests.length === 0) {
      return res.json({
        averageWpm: 0,
        bestWpm: 0,
        averageAccuracy: 0,
        testsCompleted: 0,
        totalTimePracticed: '0h 0m',
      });
    }
    
    // Calculate stats
    const averageWpm = Math.round(
      userTests.reduce((sum, test) => sum + test.wpm, 0) / userTests.length
    );
    
    const bestWpm = Math.max(...userTests.map(test => test.wpm));
    
    const averageAccuracy = parseFloat(
      (userTests.reduce((sum, test) => sum + test.accuracy, 0) / userTests.length).toFixed(1)
    );
    
    const testsCompleted = userTests.length;
    
    const totalSeconds = userTests.reduce((sum, test) => sum + test.duration, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const totalTimePracticed = `${hours}h ${minutes}m`;
    
    res.json({
      averageWpm,
      bestWpm,
      averageAccuracy,
      testsCompleted,
      totalTimePracticed,
      skillLevel: getSkillLevel(averageWpm),
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to determine skill level based on WPM
function getSkillLevel(wpm) {
  if (wpm < 30) return 'Beginner';
  if (wpm < 50) return 'Average';
  if (wpm < 70) return 'Intermediate';
  if (wpm < 90) return 'Advanced';
  return 'Expert';
}

export default router;