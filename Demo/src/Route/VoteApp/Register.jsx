import { useState } from "react";
import "./Styles.css";

function RegisterPage({ onRegisterSuccess, onLoginClick }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    department: '',
    terms: false
  });

  const [errors, setErrors] = useState({});

  const validatePassword = (password) => password.length >= 6;
  const validateUniversityEmail = (email) => {
    const emailRegex = /^[^\s@]+@mallareddyuniversity\.ac\.in$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !validateUniversityEmail(formData.email)) {
      newErrors.email = "Valid university email (@mallareddyuniversity.ac.in) is required";
    }
    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.studentId) newErrors.studentId = "Student ID is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.terms) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      const userExists = existingUsers.find((user) => 
        user.email === formData.email || user.studentId === formData.studentId
      );
      
      if (userExists) {
        alert('User with this email or Student ID already exists');
        return;
      }

      const newUser = {
        ...formData,
        isAdmin: false,
        hasVoted: false,
        votedCandidates: []
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      onRegisterSuccess();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-heading">Student Registration</h2>

        <div className="form-group">
          <label className="form-label">Full Name:</label>
          <input 
            className="form-input"
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">University Email:</label>
          <input 
            className="form-input"
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange}
            placeholder="student@mallareddyuniversity.ac.in"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input 
            className="form-input"
            name="studentId" 
            value={formData.studentId} 
            onChange={handleChange}
            placeholder="Enter your Student ID"
          />
          {errors.studentId && <p className="error-message">{errors.studentId}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input 
            className="form-input"
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Department:</label>
          <select 
            className="form-select" 
            name="department" 
            value={formData.department} 
            onChange={handleChange}
          >
            <option value="">--Select Department--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
          </select>
          {errors.department && <p className="error-message">{errors.department}</p>}
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange}
              className="checkbox-input"
            />
            I accept the terms and conditions
          </label>
          {errors.terms && <p className="error-message">{errors.terms}</p>}
        </div>

        <button className="btn-primary" onClick={handleSubmit}>Register</button>

        <p className="auth-switch">
          Already have an account?{' '}
          <button className="btn-link" onClick={onLoginClick}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;