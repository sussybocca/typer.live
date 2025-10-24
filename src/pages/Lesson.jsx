import { useParams } from 'react-router-dom';
import lessons from '../data/lessons.json';
import TypingArea from '../components/TypingArea';

export default function Lesson() {
  const { id } = useParams();
  const lesson = lessons.find((l) => l.id === Number(id));

  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <TypingArea lessonId={lesson.id} text={lesson.text} />
    </div>
  );
}
