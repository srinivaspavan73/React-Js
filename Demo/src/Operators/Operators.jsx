import { useState } from "react";
import './Operators.css'

function Operators(){
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [username,setUsername] = useState('Bitra');

    return(
        <div className="App">
            <h1>Welcome to thr Application!</h1>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? 'Logout' : 'Login'}
            </button>
            <hr />
            <p>
            {isLoggedIn ? `Hello, ${username}`: "Please login to continue"}
            </p>
            {isLoggedIn && (
                <div className="dashboard">
                    <h3>Dashboard</h3>
                    <p>Here's your Account Dashboard</p>
                </div>
            )}
        </div>
    );
}
export default Operators;