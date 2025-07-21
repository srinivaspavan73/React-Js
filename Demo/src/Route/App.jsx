import React from 'react'
import Navbar from './Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Brahmanandam from './Brahmanandam'
import Sunil from './Sunil'
import MSN from './MSN'

function App() {
  return (
    <div>
      <Navbar/>
      <div className='container'>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/brahmi' element={<Brahmanandam/>}/>
        <Route path='/msn' element={<MSN/>}/>
        <Route path='/sunil' element={<Sunil/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
