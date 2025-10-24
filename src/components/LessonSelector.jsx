import lessons from '../data/lessons.json';
import { Link } from 'react-router-dom';

export default function LessonSelector() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Typing Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} className="mb-2">
            <Link
              to={`/lesson/${lesson.id}`}
              className="text-blue-600 hover:underline"
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

