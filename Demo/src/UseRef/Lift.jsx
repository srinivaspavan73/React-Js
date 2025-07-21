import React, { useState } from 'react';
import CounterButton from './CounterButton';
import CounterDisplay from './CounterDisplay';

function Lift() {
  const [count, setCount] = useState(0); // State lifted here

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔼 Lifting State Up Example</h2>
      
      <CounterDisplay count={count} />
      <CounterButton label="Button A" onIncrement={increment} />
      <CounterButton label="Button B" onIncrement={increment} />
    </div>
  );
}

export default Lift;
