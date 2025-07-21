// import React, { useState, useMemo, useRef } from 'react';

// function Calc() {
//   const [number, setNumber] = useState(0);
//   const [text, setText] = useState('');
//   const renderCount = useRef(0);
//   renderCount.current += 1;

//   // Expensive calculation function
//   const slowSquare = (num) => {
//     console.log('Calculating square...');
//     let result = 0;
//     for (let i = 0; i < 1e8; i++) {
//       result = num * num; // Simulate heavy computation
//     }
//     return result;
//   };

//   // useMemo to avoid recalculating unless number changes
//   const squared = useMemo(() => slowSquare(number), [number]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>🧮 Expensive Square Calculator</h2>
      
//       <input
//         type="number"
//         value={number}
//         onChange={(e) => setNumber(parseInt(e.target.value))}
//         placeholder="Enter a number"
//       />
//       <p>Square: {squared}</p>

//       <hr />

//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type anything"
//       />
//       <p>Text: {text}</p>
//       <hr />
//       <p>Render Count: {renderCount.current}</p>
//     </div>
//   );
// }

// export default Calc;
import React, { useState, useMemo } from 'react';

function Calc() {
  const [number, setNumber] = useState(0);

  // Expensive function (simulated by delay)
  const slowSquare = (num) => {
    console.log('Calculating square...');
    let result = num * num;
    for (let i = 0; i < 1e8; i++) {} // Just delay
    return result;
  };

  // Memoize calculation, run only if `number` changes
  const squared = useMemo(() => slowSquare(number), [number]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
        placeholder="Enter a number"
      />
      <p>Square: {squared}</p>
    </div>
  );
}

export default Calc;
