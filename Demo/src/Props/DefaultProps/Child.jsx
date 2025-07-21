import React from 'react';

function Child({ name, age = 25 }) {  // Default value for age
  return (
    <div>
      <h2>Child Component</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default Child;














// function Child(props) {
//   return (
//     <div>
//       <h2>Child Component</h2>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// }

// // Default props
// Child.defaultProps = {
//   age: 25,  // Default age if not provided
// };

// export default Child;
