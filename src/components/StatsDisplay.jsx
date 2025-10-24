export default function StatsDisplay({ wpm, accuracy }) {
  return (
    <div className="flex gap-6 text-lg">
      <p><strong>WPM:</strong> {wpm}</p>
      <p><strong>Accuracy:</strong> {accuracy}%</p>
    </div>
  );
}
