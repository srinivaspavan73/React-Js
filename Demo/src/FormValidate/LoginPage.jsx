import { useState } from "react";

function LoginPage({onRegisterClick,onLoginSuccess}){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateEmail(email)){
            setError('Invalid email format');
            return;
        }
        if(password.length<6){
            setError('Password must be aleast 6 characters');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matchedUser = users.find(
            (user) => user.email === email && user.password === password
        );
        if(matchedUser){
            setError('');
            onLoginSuccess(matchedUser);
        } else{
            setError('Invalid Email or Password');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label>Email:</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}/>                
            </div>

            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>                
            </div>

            {error && <p>{error}</p>}

            <button type="submit">Login</button>

            <p>
                Don't have an Account?{' '}
                <button type="button" onClick={onRegisterClick}>
                    Register here
                </button>
            </p>
        </form>
    );
}

export default LoginPage;