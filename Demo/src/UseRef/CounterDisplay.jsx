import React from 'react';

function CounterDisplay({ count }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <strong>Current Count:</strong> {count}
    </div>
  );
}

export default CounterDisplay;