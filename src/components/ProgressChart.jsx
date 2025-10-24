import { useTyping } from '../context/TypingContext';

export default function ProgressChart() {
  const { stats } = useTyping();

  if (!stats.length) return <p>No stats recorded yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Progress History</h2>
      <ul>
        {stats.map((s, i) => (
          <li key={i} className="border-b py-2">
            Lesson {s.lessonId}: {s.wpm} WPM — {s.accuracy}% Accuracy on {new Date(s.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
