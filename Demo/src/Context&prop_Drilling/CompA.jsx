import React from 'react'
import CompB from './CompB'
import MessageContext from './MessageContext'

function CompA() {
    const name = 'Teja'
  return (
    <div className='box'>
        <h4>Component A</h4>
      <h1>Hi {name}</h1>
      <MessageContext.Provider value={ {msg:name} }>
        <CompB/>    
      </MessageContext.Provider>
    </div>
  )
}

export default CompA
