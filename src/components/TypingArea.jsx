import { useState, useEffect } from 'react';
import { useTyping } from '../context/TypingContext';
import StatsDisplay from './StatsDisplay';
import localforage from 'localforage';

export default function TypingArea({ lessonId, text }) {
  const { saveProgress, completeLesson } = useTyping();
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Load saved progress
  useEffect(() => {
    const loadSaved = async () => {
      const saved = await localforage.getItem(`lesson_${lessonId}`);
      if (saved) {
        setInput(saved.input || '');
        setCurrentIndex(saved.currentIndex || 0);
        setErrors(saved.errors || []);
      }
    };
    loadSaved();
  }, [lessonId]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    const index = value.length - 1;
    const newErrors = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) newErrors.push(i);
    }
    setErrors(newErrors);

    setInput(value);
    setCurrentIndex(value.length);

    // WPM & Accuracy
    const correctChars = value.split('').filter((c, i) => c === text[i]).length;
    const duration = (Date.now() - startTime) / 1000 / 60 || 1 / 60;
    setWpm(Math.round(value.split(' ').length / duration));
    setAccuracy(Math.round((correctChars / value.length) * 100 || 100));

    // Save progress
    saveProgress(lessonId, { input: value, currentIndex: index, errors: newErrors });

    // Check completion
    if (value === text && !completed) {
      setCompleted(true);
      completeLesson(lessonId, Math.round(value.split(' ').length / duration), Math.round((correctChars / value.length) * 100));
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-6">
      {/* Lesson text */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-lg leading-relaxed max-w-3xl">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className={
              i === currentIndex
                ? 'bg-yellow-300 dark:bg-yellow-500 rounded px-0.5'
                : errors.includes(i)
                ? 'text-red-600 dark:text-red-400'
                : ''
            }
          >
            {char}
          </span>
        ))}
      </div>

      {/* Typing input */}
      <textarea
        className="w-full max-w-3xl h-40 p-4 text-lg rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        disabled={completed}
      />

      {/* Progress bar */}
      <progress
        value={currentIndex}
        max={text.length}
        className="w-full max-w-3xl h-3 rounded bg-gray-300 dark:bg-gray-700"
      />

      {/* Stats display */}
      <StatsDisplay wpm={wpm} accuracy={accuracy} />

      {completed && <p className="text-green-500 font-bold text-lg">✅ Lesson Complete!</p>}
    </div>
  );
}
