import { createContext, useState, useContext } from 'react';

const TypingContext = createContext();

export const TypingProvider = ({ children }) => {
  const [stats, setStats] = useState([]);

  const addStat = (lessonId, wpm, accuracy) => {
    const newEntry = { lessonId, wpm, accuracy, date: new Date().toISOString() };
    setStats(prev => [...prev, newEntry]);
    localStorage.setItem('typingStats', JSON.stringify([...stats, newEntry]));
  };

  return (
    <TypingContext.Provider value={{ stats, addStat }}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
