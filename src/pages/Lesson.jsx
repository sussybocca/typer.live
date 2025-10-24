import { useParams } from 'react-router-dom';
import lessons from '../data/lessons.json';
import TypingArea from '../components/TypingArea';

export default function Lesson() {
  const { id } = useParams();
  const lesson = lessons.find(l => l.id === parseInt(id));

  if (!lesson) return <p className="p-8 text-center text-red-500">Lesson not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="w-full p-6 shadow-md bg-white dark:bg-gray-800 flex justify-center">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
      </header>

      <main className="flex flex-col items-center w-full max-w-4xl p-6 gap-8">
        {/* Typing area */}
        <TypingArea lessonId={lesson.id} text={lesson.text} />

        {/* Keyboard visual placeholder */}
        <div className="w-full p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md">
          <p className="text-center text-gray-500 dark:text-gray-400">Keyboard visualization coming soon!</p>
        </div>
      </main>
    </div>
  );
}
