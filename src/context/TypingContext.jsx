import { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

const TypingContext = createContext();

export const TypingProvider = ({ children }) => {
  const [stats, setStats] = useState({});
  const [lessonsCompleted, setLessonsCompleted] = useState({});

  // Load all progress from localforage on init
  useEffect(() => {
    const loadAll = async () => {
      const keys = await localforage.keys();
      const allStats = {};
      for (const key of keys) {
        allStats[key] = await localforage.getItem(key);
      }
      setStats(allStats);
    };
    loadAll();
  }, []);

  // Save progress for a lesson
  const saveProgress = async (lessonId, data) => {
    await localforage.setItem(`lesson_${lessonId}`, data);
    setStats(prev => ({ ...prev, [`lesson_${lessonId}`]: data }));
  };

  // Mark lesson as completed
  const completeLesson = async (lessonId, wpm, accuracy) => {
    await localforage.setItem(`completed_${lessonId}`, { wpm, accuracy, date: new Date().toISOString() });
    setLessonsCompleted(prev => ({
      ...prev,
      [lessonId]: { wpm, accuracy }
    }));
  };

  return (
    <TypingContext.Provider value={{ stats, lessonsCompleted, saveProgress, completeLesson }}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
