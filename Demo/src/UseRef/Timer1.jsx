import { useState } from 'react';

function Timer1() {
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null); // Using useState instead of useRef
  const [renderCount, setRenderCount] = useState(1); // Count renders with state

  const startTimer = () => {
    if (timerId !== null) return; // Already running
    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    setTimerId(id); // Triggers a re-render
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(null); // Triggers a re-render
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Track renders by incrementing count
  // You can't just increment here directly because `setState` causes a render,
  // so we'll use an effect with no dependencies to simulate this:
  useState(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <div>
      <h1>{seconds}s</h1>
      <p>Render Count: {renderCount}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer1;
