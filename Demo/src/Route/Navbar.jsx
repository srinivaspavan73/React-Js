import React from 'react'
// import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  
  return (
    <div className='navbar'>
      <h1>MEMES Page</h1>  
      <ul>
        <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/brahmi'><li>Brahmanandam</li></NavLink>
        <NavLink to='/msn'><li>MS Narayana Rao</li></NavLink>
        <NavLink to='/sunil'><li>Sunil</li></NavLink>   
      </ul>
      <button onClick={()=> navigate('/brahmi',{replace:true})}>MEME God</button>
    </div>
  )
}

export default Navbar
