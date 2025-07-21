  import StudentList from "./StudentList.jsx"

  function App(){
    const students = [
      { id : 1, name: "Raghava" , score: 98 , rank: 1},
      { id : 2, name: "Kesava" , score: 91 , rank: 2},
      { id : 3, name: "Madhav" , score: 86 , rank: 3},
      { id : 4, name: "Mohan" , score:  83, rank: 4},
      { id : 5, name: "Venkatesh" , score: 76 , rank: 5},
      { id : 6, name: "Pavan" , score: 73 , rank: 6},
      { id : 7, name: "Krishna" , score: 64 , rank: 7},
    ]

    return(
      <div className="title">
        <h1>Student Rankings</h1>
        <StudentList students={students} />
      </div>
    );
  }

export default App;


// import React from 'react';


// function App() {
//   const fruits = ['Apple', 'Banana', 'Cherry', 'Mango'];
//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h2>Fruit List (with Key)</h2>
//       {/* ✅ Proper usage with key */}
//       <ul>
//         {fruits.map((fruit, index) => (
//           <li key={index}>{fruit}</li>
//         ))}
//       </ul>
//       <hr />
//       <h2>Fruit List (without Key)</h2>
//       {/* ⚠️ Without key — React will warn in console */}
//       <ul>
//         {fruits.map((fruit) => (
//           <li>{fruit}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default App;