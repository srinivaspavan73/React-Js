import { useState } from "react";
import "./Styles.css";

function LoginPage({ onRegisterClick, onLoginSuccess }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!studentId.trim()) {
      setError('Student ID is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.studentId === studentId && user.password === password
    );

    if (matchedUser) {
      setError('');
      onLoginSuccess(matchedUser);
    } else {
      setError('Invalid Student ID or Password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-heading">Student Login</h2>

        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input 
            className="form-input"
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your Student ID"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input 
            className="form-input"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn-primary" onClick={handleSubmit}>Login</button>

        <button 
          className="btn-secondary" 
          style={{ width: '100%', marginBottom: '1rem' }}
          onClick={() => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const adminExists = users.find(user => user.studentId === 'ADMIN001');
            
            if (!adminExists) {
              const updatedUsers = [...users, {
                name: "System Administrator",
                email: "admin@mallareddyuniversity.ac.in",
                password: "admin123",
                studentId: "ADMIN001",
                department: "Administration",
                terms: true,
                isAdmin: true,
                hasVoted: false,
                votedCandidates: []
              }];
              localStorage.setItem('users', JSON.stringify(updatedUsers));
              alert('Admin user created! You can now login with ADMIN001/admin123');
            } else {
              alert('Admin user already exists. Credentials: ADMIN001/admin123');
            }
          }}
        >
          🔧 Create/Check Admin User
        </button>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button className="btn-link" onClick={onRegisterClick}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;