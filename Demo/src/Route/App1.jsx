import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Students from './Students'
import StudentDetail from './StudentDetail'

function App1() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Students/>} />
        <Route path='/student/:id' element={<StudentDetail/>} />
      </Routes>
    </div>
  )
}

export default App1
