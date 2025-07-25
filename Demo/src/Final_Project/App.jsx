import { useState, useEffect } from "react";

// Sample candidates data
const initialCandidates = [
  { id: 1, name: "Alice Johnson", department: "Computer Science", position: "President", votes: 0 },
  { id: 2, name: "Bob Smith", department: "Computer Science", position: "Vice President", votes: 0 },
  { id: 3, name: "Carol Brown", department: "Engineering", position: "President", votes: 0 },
  { id: 4, name: "David Wilson", department: "Engineering", position: "Vice President", votes: 0 },
  { id: 5, name: "Eva Davis", department: "Business", position: "President", votes: 0 },
  { id: 6, name: "Frank Miller", department: "Business", position: "Vice President", votes: 0 }
];

// Styles object
const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif'
  },
  authForm: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  checkboxGroup: {
    marginBottom: '1rem'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#555'
  },
  checkbox: {
    marginRight: '0.5rem'
  },
  primaryBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem'
  },
  secondaryBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  error: {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  authSwitch: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  dashboard: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ddd'
  },
  dashboardContent: {
    maxWidth: '800px'
  },
  userInfo: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '2rem'
  },
  votingSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  votedStatus: {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '1rem',
    borderRadius: '4px',
    color: '#155724'
  },
  adminSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  votingContainer: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  votingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ddd'
  },
  positionSection: {
    marginBottom: '2rem',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  candidatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  candidateCard: {
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  candidateCardSelected: {
    border: '2px solid #007bff',
    backgroundColor: '#f0f8ff'
  },
  candidateLabel: {
    cursor: 'pointer'
  },
  voteSubmit: {
    textAlign: 'center',
    marginTop: '2rem'
  },
  largeBtn: {
    padding: '1rem 2rem',
    fontSize: '1.1rem'
  },
  resultsContainer: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ddd'
  },
  positionResults: {
    marginBottom: '2rem',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  resultCard: {
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '0.5rem'
  },
  resultCardWinner: {
    border: '2px solid #28a745',
    backgroundColor: '#f8fff9'
  },
  voteBar: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
    marginTop: '0.5rem',
    overflow: 'hidden'
  },
  voteFill: {
    height: '100%',
    backgroundColor: '#007bff',
    transition: 'width 0.3s ease'
  },
  accessDenied: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    margin: '2rem auto'
  }
};

// Initialize candidates in localStorage if not exists
const initializeCandidates = () => {
  const existingCandidates = JSON.parse(localStorage.getItem('candidates'));
  if (!existingCandidates) {
    localStorage.setItem('candidates', JSON.stringify(initialCandidates));
  }
};

function RegisterPage({ onRegisterSuccess, onLoginClick }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    department: '',
    terms: false,
    isAdmin: false
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

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
    if (!formData.email || !validateEmail(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.password || !validatePassword(formData.password)) newErrors.password = "Password must be at least 6 characters";
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
        hasVoted: false,
        votedCandidates: []
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      onRegisterSuccess();
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authForm}>
        <h2 style={styles.heading}>Student Registration</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name:</label>
          <input 
            style={styles.input}
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input 
            style={styles.input}
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Student ID:</label>
          <input 
            style={styles.input}
            name="studentId" 
            value={formData.studentId} 
            onChange={handleChange}
            placeholder="Enter your Student ID"
          />
          {errors.studentId && <p style={styles.error}>{errors.studentId}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input 
            style={styles.input}
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Department:</label>
          <select style={styles.select} name="department" value={formData.department} onChange={handleChange}>
            <option value="">--Select Department--</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
          </select>
          {errors.department && <p style={styles.error}>{errors.department}</p>}
        </div>

        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              name="isAdmin" 
              checked={formData.isAdmin} 
              onChange={handleChange}
              style={styles.checkbox}
            />
            Register as Admin
          </label>
        </div>

        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange}
              style={styles.checkbox}
            />
            I accept the terms and conditions
          </label>
          {errors.terms && <p style={styles.error}>{errors.terms}</p>}
        </div>

        <button style={styles.primaryBtn} onClick={handleSubmit}>Register</button>

        <p style={styles.authSwitch}>
          Already have an account?{' '}
          <button style={styles.linkBtn} onClick={onLoginClick}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

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
    <div style={styles.authContainer}>
      <div style={styles.authForm}>
        <h2 style={styles.heading}>Student Login</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Student ID:</label>
          <input 
            style={styles.input}
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your Student ID"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input 
            style={styles.input}
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.primaryBtn} onClick={handleSubmit}>Login</button>

        <p style={styles.authSwitch}>
          Don't have an account?{' '}
          <button style={styles.linkBtn} onClick={onRegisterClick}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout, onNavigateToVoting, onNavigateToResults }) {
  return (
    <div style={styles.dashboard}>
      <div style={styles.dashboardHeader}>
        <h2 style={styles.heading}>Welcome, {user.name}</h2>
        <button style={styles.secondaryBtn} onClick={onLogout}>Logout</button>
      </div>

      <div style={styles.dashboardContent}>
        <div style={styles.userInfo}>
          <p><strong>Student ID:</strong> {user.studentId}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          {user.isAdmin && <p><strong>Role:</strong> Administrator</p>}
        </div>

        <div>
          {!user.isAdmin && (
            <div style={styles.votingSection}>
              <h3>Student Elections</h3>
              {user.hasVoted ? (
                <div style={styles.votedStatus}>
                  <p>✅ You have already cast your vote!</p>
                  <p>Thank you for participating in the election.</p>
                </div>
              ) : (
                <div>
                  <p>Cast your vote for the student representatives.</p>
                  <button style={styles.primaryBtn} onClick={onNavigateToVoting}>
                    Vote Now
                  </button>
                </div>
              )}
            </div>
          )}

          {user.isAdmin && (
            <div style={styles.adminSection}>
              <h3>Admin Panel</h3>
              <button style={styles.primaryBtn} onClick={onNavigateToResults}>
                View Live Results
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VotingPage({ user, onVoteSubmit, onBackToDashboard }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const allCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const departmentCandidates = allCandidates.filter(
      candidate => candidate.department === user.department
    );
    setCandidates(departmentCandidates);

    // Get unique positions
    const uniquePositions = [...new Set(departmentCandidates.map(c => c.position))];
    setPositions(uniquePositions);
  }, [user.department]);

  const handleCandidateSelect = (position, candidateId) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [position]: candidateId
    }));
  };

  const handleSubmitVote = () => {
    if (Object.keys(selectedCandidates).length !== positions.length) {
      alert('Please select a candidate for each position');
      return;
    }

    if (window.confirm('Are you sure you want to submit your vote? This action cannot be undone.')) {
      onVoteSubmit(selectedCandidates);
    }
  };

  if (user.hasVoted) {
    return (
      <div style={styles.votingContainer}>
        <div style={styles.accessDenied}>
          <h2>Vote Already Cast</h2>
          <p>You have already participated in this election.</p>
          <button style={styles.primaryBtn} onClick={onBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.votingContainer}>
      <div style={styles.votingHeader}>
        <div>
          <h2>Student Election Voting</h2>
          <p>Department: {user.department}</p>
        </div>
        <button style={styles.secondaryBtn} onClick={onBackToDashboard}>Back</button>
      </div>

      <div>
        {positions.map(position => (
          <div key={position} style={styles.positionSection}>
            <h3>{position}</h3>
            <div style={styles.candidatesGrid}>
              {candidates
                .filter(candidate => candidate.position === position)
                .map(candidate => (
                  <div 
                    key={candidate.id} 
                    style={{
                      ...styles.candidateCard,
                      ...(selectedCandidates[position] === candidate.id ? styles.candidateCardSelected : {})
                    }}
                    onClick={() => handleCandidateSelect(position, candidate.id)}
                  >
                    <input
                      type="radio"
                      id={`candidate-${candidate.id}`}
                      name={position}
                      value={candidate.id}
                      checked={selectedCandidates[position] === candidate.id}
                      onChange={() => handleCandidateSelect(position, candidate.id)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <label htmlFor={`candidate-${candidate.id}`} style={styles.candidateLabel}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{candidate.name}</h4>
                        <p style={{ margin: 0, color: '#666' }}>{candidate.position}</p>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div style={styles.voteSubmit}>
          <button 
            style={{ ...styles.primaryBtn, ...styles.largeBtn }} 
            onClick={handleSubmitVote}
          >
            Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ user, onBackToDashboard }) {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const allCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    setCandidates(allCandidates);

    const total = allCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);
    setTotalVotes(total);
  }, []);

  const groupedCandidates = candidates.reduce((acc, candidate) => {
    const key = `${candidate.department}-${candidate.position}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(candidate);
    return acc;
  }, {});

  if (!user.isAdmin) {
    return (
      <div style={styles.resultsContainer}>
        <div style={styles.accessDenied}>
          <h2>Access Denied</h2>
          <p>Only administrators can view election results.</p>
          <button style={styles.primaryBtn} onClick={onBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.resultsContainer}>
      <div style={styles.resultsHeader}>
        <div>
          <h2>Live Election Results</h2>
          <p>Total Votes Cast: {totalVotes}</p>
        </div>
        <button style={styles.secondaryBtn} onClick={onBackToDashboard}>Back</button>
      </div>

      <div>
        {Object.entries(groupedCandidates).map(([key, candidates]) => {
          const [department, position] = key.split('-');
          const maxVotes = Math.max(...candidates.map(c => c.votes));
          
          return (
            <div key={key} style={styles.positionResults}>
              <h3>{position} - {department}</h3>
              <div>
                {candidates
                  .sort((a, b) => b.votes - a.votes)
                  .map(candidate => {
                    const percentage = totalVotes > 0 ? (candidate.votes / totalVotes * 100).toFixed(1) : 0;
                    const isWinner = candidate.votes === maxVotes && maxVotes > 0;
                    
                    return (
                      <div 
                        key={candidate.id} 
                        style={{
                          ...styles.resultCard,
                          ...(isWinner ? styles.resultCardWinner : {})
                        }}
                      >
                        <div>
                          <h4 style={{ margin: '0 0 0.5rem 0' }}>
                            {candidate.name} {isWinner && maxVotes > 0 ? '👑' : ''}
                          </h4>
                          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                            {candidate.votes} votes ({percentage}%)
                          </p>
                        </div>
                        <div style={styles.voteBar}>
                          <div 
                            style={{
                              ...styles.voteFill,
                              width: `${percentage}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VotingApp() {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initializeCandidates();
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleRegisterSuccess = () => {
    alert('Registration successful! Please login with your credentials.');
    setCurrentView('login');
  };

  const handleVoteSubmit = (selectedCandidates) => {
    // Update candidate vote counts
    const allCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const updatedCandidates = allCandidates.map(candidate => {
      const isSelected = Object.values(selectedCandidates).includes(candidate.id);
      return isSelected ? { ...candidate, votes: candidate.votes + 1 } : candidate;
    });
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));

    // Update user voting status
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => 
      user.studentId === currentUser.studentId 
        ? { ...user, hasVoted: true, votedCandidates: Object.values(selectedCandidates) }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update current user state
    setCurrentUser(prev => ({ ...prev, hasVoted: true }));
    
    alert('Your vote has been successfully recorded!');
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  return (
    <div>
      {currentView === 'login' && (
        <LoginPage
          onRegisterClick={() => setCurrentView('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'register' && (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onLoginClick={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          user={currentUser}
          onLogout={handleLogout}
          onNavigateToVoting={() => setCurrentView('voting')}
          onNavigateToResults={() => setCurrentView('results')}
        />
      )}

      {currentView === 'voting' && (
        <VotingPage
          user={currentUser}
          onVoteSubmit={handleVoteSubmit}
          onBackToDashboard={() => setCurrentView('dashboard')}
        />
      )}

      {currentView === 'results' && (
        <ResultsPage
          user={currentUser}
          onBackToDashboard={() => setCurrentView('dashboard')}
        />
      )}
    </div>
  );
}

export default VotingApp;