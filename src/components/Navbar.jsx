import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">typer.live</Link>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-300">Home</Link>
        <Link to="/progress" className="hover:text-blue-500 dark:hover:text-blue-300">Progress</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 border rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  );
}
