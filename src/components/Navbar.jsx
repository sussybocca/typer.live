import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <Link to="/" className="text-2xl font-bold text-blue-600">typer.live</Link>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/progress" className="hover:text-blue-600">Progress</Link>
      </div>
    </nav>
  );
}
