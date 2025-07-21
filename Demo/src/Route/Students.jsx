import React from 'react'
import { Link } from 'react-router-dom'

const students = [
    {id:'1',name:'Bitra'},
    {id:'2',name:'Pavan Kumar'},
    {id:'3',name:'Srinivaspavan'},
    {id:'4',name:'Batman'}
];

function Students() {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map(student =>(
            <li key={student.id}>
                <Link to={`/student/${student.id}`}>{student.name}</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Students
