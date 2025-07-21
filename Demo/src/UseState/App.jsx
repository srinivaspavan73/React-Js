import { useState } from 'react';

function ArjunBatting() {
  const [score, setScore] = useState(10); // Initial score is 0

  function hitFour() {
    setScore(score + 4);  // Arjun hits a 4
  }

  function hitSix() {
    setScore(score + 6);  // Arjun hits a 6
  }

  function resetScore() {
    setScore(0);  // Reset score to 0
    }

  return (
    <div>
      <h2> Arjun’s Score: {score}</h2>
      <button onClick={hitFour}>Hit 4️</button>
      <button onClick={hitSix}>Hit 6️</button>
      <button onClick={resetScore}>Reset Score</button>
    </div>
  );
}
export default ArjunBatting