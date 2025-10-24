import { useState, useEffect } from 'react';
import { useTyping } from '../context/TypingContext';
import StatsDisplay from './StatsDisplay';

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
    // Update errors array
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

    // Save progress to localforage
    saveProgress(lessonId, { input: value, currentIndex: index, errors: newErrors });

    // Check completion
    if (value === text && !completed) {
      setCompleted(true);
      completeLesson(lessonId, Math.round(value.split(' ').length / duration), Math.round((correctChars / value.length) * 100));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Lesson text with live highlight */}
      <p className="text-gray-600 text-lg leading-relaxed">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className={
              i === currentIndex ? 'bg-yellow-200' :
              errors.includes(i) ? 'text-red-600' : ''
            }
          >
            {char}
          </span>
        ))}
      </p>

      <textarea
        className="border p-2 rounded-lg h-40 text-lg"
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        disabled={completed}
      />

      {/* Progress bar */}
      <progress value={currentIndex} max={text.length} className="w-full h-2 rounded bg-gray-200" />

      <StatsDisplay wpm={wpm} accuracy={accuracy} />

      {completed && <p className="text-green-600 font-semibold">✅ Lesson Complete!</p>}
    </div>
  );
}
