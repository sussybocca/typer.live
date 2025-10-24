import { useEffect, useState } from 'react';

const KEY_ROWS = [
  ['Esc','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'],
  ['`','1','2','3','4','5','6','7','8','9','0','-','=', 'Backspace'],
  ['Tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
  ['Caps','A','S','D','F','G','H','J','K','L',';','\'','Enter'],
  ['Shift','Z','X','C','V','B','N','M',',','.','/','Shift'],
  ['Ctrl','Win','Alt','Space','Alt','Win','Menu','Ctrl']
];

export default function KeyboardVisualizer({ pressedKeys = [] }) {
  const [keysDown, setKeysDown] = useState([]);

  useEffect(() => {
    setKeysDown(pressedKeys.map(k => k.toLowerCase()));
  }, [pressedKeys]);

  const renderKey = (key) => {
    const isPressed = keysDown.includes(key.toLowerCase());
    return (
      <div
        key={key}
        className={`px-2 py-1 m-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm text-center min-w-[2rem] 
          ${isPressed ? 'bg-blue-400 dark:bg-blue-600 text-white font-bold' : ''}`}
      >
        {key}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-1 select-none mt-4">
      {KEY_ROWS.map((row, idx) => (
        <div key={idx} className="flex justify-center gap-1">
          {row.map(renderKey)}
        </div>
      ))}
    </div>
  );
}
