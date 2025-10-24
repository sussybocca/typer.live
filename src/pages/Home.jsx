import { useEffect, useState } from 'react';
import lessons from '../data/lessons.json';
import { Link } from 'react-router-dom';
import localforage from 'localforage';

export default function Home() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const loadProgress = async () => {
      const data = {};
      for (const lesson of lessons) {
        const completed = await localforage.getItem(`completed_${lesson.id}`);
        if (completed) data[lesson.id] = completed;
      }
      setProgress(data);
    };
    loadProgress();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Typing Lessons</h1>
      <ul className="space-y-4">
        {lessons.map((lesson) => {
          const stat = progress[lesson.id];
          return (
            <li key={lesson.id} className="border p-4 rounded-lg flex justify-between items-center hover:shadow-md transition">
              <Link to={`/lesson/${lesson.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {lesson.title}
              </Link>
              {stat ? (
                <span className="text-green-600 font-semibold">✅ Completed</span>
              ) : (
                <span className="text-gray-500 font-medium">Not started</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
