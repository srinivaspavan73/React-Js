import React from 'react';
import PropTypes from 'prop-types';

function Child(props) {
  return (
    <div>
      <h2>Child Component</h2>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// PropTypes validation
Child.propTypes = {
  name: PropTypes.string.isRequired,  // 'name' must be a string and is required
  age: PropTypes.number,              // 'age' must be a number (optional)
};

export default Child;
