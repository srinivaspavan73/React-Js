import React from 'react'
import Comp2 from './Comp2'

function Comp1() {
    const name = 'Eswar' 
  return (
    <div className='box'>
        <h4>Component 1</h4>
      <h1>Hi {name}</h1>
      <Comp2 msg={name}/>
    </div>
  )
}

export default Comp1
