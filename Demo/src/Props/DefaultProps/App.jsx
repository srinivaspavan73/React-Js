import React from 'react';
import Child from './Child';

function App() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <Child name="John" /> {/* age is missing */}
    </div>
  );
}

export default App;




















// import React from 'react';
// import Child from './Child';

// function App() {
//   return (
//     <div>
//       <h1>Welcome to React!</h1>
//       <Child name="John" />
//       {/* Age is missing, so it will use the default age */}
//     </div>
//   );
// }

// export default App;
