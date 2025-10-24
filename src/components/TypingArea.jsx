import { useState, useEffect } from 'react';
import { useTyping } from '../context/TypingContext';
import StatsDisplay from './StatsDisplay';

export default function TypingArea({ lessonId, text }) {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const { addStat } = useTyping();

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
    const correctChars = input.split('').filter((ch, i) => ch === text[i]).length;
    setAccuracy(Math.round((correctChars / input.length) * 100 || 100));

    if (input === text) {
      const duration = (Date.now() - startTime) / 1000 / 60;
      const words = text.split(' ').length;
      const calculatedWpm = Math.round(words / duration);
      setWpm(calculatedWpm);
      setCompleted(true);
      addStat(lessonId, calculatedWpm, accuracy);
    }
  }, [input]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-600">{text}</p>
      <textarea
        className="border p-2 rounded-lg h-32"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Start typing..."
        disabled={completed}
      />
      <StatsDisplay wpm={wpm} accuracy={accuracy} />
      {completed && <p className="text-green-600 font-semibold">✅ Lesson Complete!</p>}
    </div>
  );
}
