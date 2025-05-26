import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Sample texts to use before API is connected
const sampleTexts = {
  easy: [
    "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
    "Learning to type quickly and accurately is an important skill in today's digital world.",
    "Practice makes perfect. The more you type, the better you will become at it.",
  ],
  medium: [
    "The ability to type without looking at the keyboard is called touch typing. This skill can significantly increase your typing speed and productivity.",
    "A keyboard shortcut is a combination of keys that, when pressed simultaneously, perform a specific function that would typically require a mouse or other input device.",
    "Ergonomic keyboards are designed to minimize muscle strain and reduce the risk of carpal tunnel syndrome and other repetitive strain injuries.",
  ],
  hard: [
    "The QWERTY keyboard layout was designed in the 1870s for typewriters to slow typists down and prevent jamming of mechanical keys. Despite this original intention, it remains the standard layout for most keyboards today.",
    "Implementing a proper typing technique involves maintaining good posture, positioning your hands correctly on the home row, using all fingers to type different keys, and practicing regularly to build muscle memory.",
    "The world record for typing speed is over 200 words per minute, achieved using a specialized stenographic keyboard that allows typing entire words with a single keystroke rather than individual characters.",
  ],
};

export const useSampleText = (
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  category: string = 'general'
) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchText = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would fetch from the API
      // const response = await axios.get(`/api/texts?difficulty=${difficulty}&category=${category}`);
      // setText(response.data.text);
      
      // For now, use sample texts
      const texts = sampleTexts[difficulty];
      const randomIndex = Math.floor(Math.random() * texts.length);
      setText(texts[randomIndex]);
    } catch (err) {
      console.error('Error fetching sample text:', err);
      setError('Failed to load text. Please try again.');
      
      // Fallback to a default text
      setText("The quick brown fox jumps over the lazy dog.");
    } finally {
      setLoading(false);
    }
  }, [difficulty, category]);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  return {
    text,
    loading,
    error,
    fetchNewText: fetchText,
  };
};