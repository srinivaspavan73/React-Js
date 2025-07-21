import { useRef, useState } from 'react';
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const renderCount = useRef(0);
  const inoutRef = useRef();

  // Increment render count on each render
  renderCount.current += 1;
  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  function focusInput() {
    inoutRef.current.style.border="2px solid red"; 
  }
  return (
    <div>
      <h1>{seconds}s</h1>
      <p>Render Count: {renderCount.current}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>

      <input type="text" ref={inoutRef} />
      <button onClick={focusInput}></button>
    </div>
  );
}

export default Timer;
