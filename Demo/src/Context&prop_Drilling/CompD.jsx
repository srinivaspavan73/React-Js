import React, { useContext } from 'react'
import MessageContext from './MessageContext'

function CompD() {
    const {msg} = useContext(MessageContext);
  return (
    <div className='box'>
      <h4>Component D</h4>
      <h1>Bye {msg}</h1>
    </div>
  )
}

export default CompD
