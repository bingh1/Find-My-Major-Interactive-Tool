import { useState } from 'react';
import { questions, options, type RiasecType } from './data/types';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<RiasecType, number>>({
    R: 0, I: 0, A: 0, S: 0, E: 0, C: 0
  });
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  // 1. Add a new state for history
const [history, setHistory] = useState<Record<RiasecType, number>[]>([]);

const handleAnswer = (weight: number) => {
  // Save current scores to history before updating
  setHistory(prev => [...prev, scores]);

  setScores(prev => ({
    ...prev,
    [currentQuestion.type]: prev[currentQuestion.type] + weight
  }));

  if (currentIndex < questions.length - 1) {
    setCurrentIndex(prev => prev + 1);
  } else {
    setShowResults(true);
  }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      // 1. Move index back
      setCurrentIndex(prev => prev - 1);

      // 2. Restore the last score from history
      const lastScores = history[history.length - 1];
      setScores(lastScores);

      // 3. Remove that last entry from history
      setHistory(prev => prev.slice(0, -1));
    }
  };

  // Result View
  if (showResults) {
    const topCategory = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

    return (
      <div className="app-container">
        <main className="app-main" style={{alignItems: 'center'}}>
          <div className="quiz-card" style={{textAlign: 'center'}}>
            <h2>Test Complete!</h2>
            <p>Your primary interest area is:</p>
            <h1 style={{color: '#2563eb'}}>{topCategory[0]}</h1>
            <button onClick={() => window.location.reload()} className="option-btn" style={{backgroundColor: '#64748b', marginTop: '1rem'}}>
              Restart Test
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">RIASEC Career Test</h1>
      </header>

      <main className="app-main">
        <div className="quiz-card">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h2 className="question-text">{currentQuestion.text}</h2>

          <div className="options-list">
            {options.map((opt) => (
              <button
                key={opt.value}
                className="option-btn"
                style={{ backgroundColor: opt.color }}
                onClick={() => handleAnswer(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
            {/* Back Button - only shows if we aren't on the first question */}
            {currentIndex > 0 && (
              <button onClick={handleBack} className="back-btn">
                ← Back
              </button>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;