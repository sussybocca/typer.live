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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Typing Lessons</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {lessons.map((lesson) => {
          const stat = progress[lesson.id];
          return (
            <li key={lesson.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition">
              <div>
                <Link to={`/lesson/${lesson.id}`} className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  {lesson.title}
                </Link>
                {stat && (
                  <p className="text-green-500 font-medium mt-2 text-sm">
                    ✅ Completed — WPM: {stat.wpm}, Accuracy: {stat.accuracy}%
                  </p>
                )}
              </div>
              {!stat && (
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Not started</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
