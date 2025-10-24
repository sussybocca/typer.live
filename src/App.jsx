import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TypingProvider } from './context/TypingContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Progress from './pages/Progress';

function App() {
  return (
    <TypingProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Router>
    </TypingProvider>
  );
}

export default App;
