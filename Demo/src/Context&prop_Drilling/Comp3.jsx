import React from 'react'
import Comp4 from './Comp4'

function Comp3({msg}) {
  return (
    <div className='box'>
        <h4>Component 3</h4>

      <Comp4 msg={msg}/>
    </div>
  )
}

export default Comp3
