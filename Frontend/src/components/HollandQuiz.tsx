import { useState } from 'react';
import { questions, type RiasecType } from '../data/types';

export default function HollandQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<RiasecType, number>>({
    R: 0, I: 0, A: 0, S: 0, E: 0, C: 0
  });
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  // Inside your HollandQuiz component
  const handleAnswer = (weight: number) => {
    // Add the specific weight (1-5) to the current category score
    setScores(prev => ({
      ...prev,
      [currentQuestion.type]: prev[currentQuestion.type] + weight
    }));

    // Move to next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return <div>Your top score is: {Object.entries(scores).sort((a,b) => b[1] - a[1])[0][0]}</div>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      {/* Progress Bar */}
      <div style={{ width: '100%', backgroundColor: '#eee', height: '10px', borderRadius: '5px', marginBottom: '20px' }}>
        <div style={{ width: `${progress}%`, background: 'blue', height: '100%', transition: '0.3s' }} />
      </div>

      {/* Question Card */}
      <div style={{ border: '1px solid #ddd', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
        <h2>{currentQuestion.text}</h2>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => handleAnswer(false)}>No</button>
          <button onClick={() => handleAnswer(true)}>Yes / Next</button>
        </div>
      </div>
    </div>
  );
}