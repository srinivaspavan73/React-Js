import React from 'react';

function CounterButton({ label, onIncrement }) {
  return (
    <button onClick={onIncrement} style={{ marginRight: '10px' }}>
      {label} ➕
    </button>
  );
}

export default CounterButton;
