import React from 'react'
import Comp3 from './Comp3'

function Comp2({msg}) {
  return (
    <div className='box'>
        <h4>Component 2</h4>
      <Comp3 msg={msg}/>
    </div>
  )
}

export default Comp2
