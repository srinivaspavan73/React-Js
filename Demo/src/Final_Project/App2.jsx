import { useState, useEffect } from "react";

// Enhanced candidates data with photos
const initialCandidates = [
  { 
    id: 1, 
    name: "Aswith", 
    department: "Computer Science", 
    position: "President", 
    votes: 0,
    photo: "https://i.postimg.cc/85Q4K6Mh/1.jpg"
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    department: "Computer Science", 
    position: "Vice President", 
    votes: 0,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: 3, 
    name: "Carol Brown", 
    department: "Engineering", 
    position: "President", 
    votes: 0,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: 4, 
    name: "David Wilson", 
    department: "Engineering", 
    position: "Vice President", 
    votes: 0,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: 5, 
    name: "Eva Davis", 
    department: "Business", 
    position: "President", 
    votes: 0,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: 6, 
    name: "Frank Miller", 
    department: "Business", 
    position: "Vice President", 
    votes: 0,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  }
];

// Default admin user
const defaultAdmin = {
  name: "System Administrator",
  email: "admin@mallareddyuniversity.ac.in",
  password: "admin123",
  studentId: "ADMIN001",
  department: "Administration",
  terms: true,
  isAdmin: true,
  hasVoted: false,
  votedCandidates: []
};

// Voting time configuration (in hours from now)
const VOTING_DURATION_HOURS = 3;
const VOTING_START_TIME = new Date().getTime();
const VOTING_END_TIME = VOTING_START_TIME + (VOTING_DURATION_HOURS * 60 * 60 * 1000);

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
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  votedStatus: {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '1rem',
    borderRadius: '4px',
    color: '#155724'
  },
  votingClosed: {
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '1rem',
    borderRadius: '4px',
    color: '#721c24'
  },
  adminSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  adminStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '6px',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff'
  },
  countdown: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    padding: '1rem',
    borderRadius: '4px',
    color: '#856404',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  countdownTime: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#dc3545'
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  candidateCard: {
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    textAlign: 'center'
  },
  candidateCardSelected: {
    border: '2px solid #007bff',
    backgroundColor: '#f0f8ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,123,255,0.2)'
  },
  candidatePhoto: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 1rem auto',
    display: 'block',
    border: '3px solid #e9ecef'
  },
  candidatePhotoSelected: {
    border: '3px solid #007bff'
  },
  candidateName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    color: '#333'
  },
  candidatePosition: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '0 0 0.5rem 0'
  },
  candidateDepartment: {
    fontSize: '0.8rem',
    color: '#888',
    margin: 0
  },
  radioInput: {
    margin: '1rem 0 0 0'
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

// Initialize data in localStorage
const initializeData = () => {
  // Initialize candidates
  const existingCandidates = JSON.parse(localStorage.getItem('candidates'));
  if (!existingCandidates) {
    localStorage.setItem('candidates', JSON.stringify(initialCandidates));
  }

  // Initialize admin user - ALWAYS ensure admin exists
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const adminExists = existingUsers.find(user => user.studentId === 'ADMIN001');
  
  if (!adminExists) {
    console.log('Creating default admin user...');
    const updatedUsers = [...existingUsers, defaultAdmin];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Admin created:', defaultAdmin);
  } else {
    console.log('Admin already exists:', adminExists);
  }

  // Debug: Log all users
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  console.log('All users in localStorage:', allUsers);

  // Initialize voting time
  const existingVotingTime = localStorage.getItem('votingEndTime');
  if (!existingVotingTime) {
    localStorage.setItem('votingEndTime', VOTING_END_TIME.toString());
  }
};

// Time API hook
const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        const data = await response.json();
        setCurrentTime(new Date(data.datetime));
      } catch (error) {
        console.error('Failed to fetch time, using local time:', error);
        setCurrentTime(new Date());
      }
    };

    fetchTime();
    const interval = setInterval(fetchTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

// Countdown hook
const useCountdown = (endTime) => {
  const currentTime = useCurrentTime();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const votingEndTime = parseInt(localStorage.getItem('votingEndTime')) || endTime;
    const remaining = Math.max(0, votingEndTime - currentTime.getTime());
    setTimeLeft(remaining);

    const timer = setInterval(() => {
      const newRemaining = Math.max(0, votingEndTime - new Date().getTime());
      setTimeLeft(newRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime, endTime]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired: timeLeft <= 0
  };
};

// Enhanced email validation
const validateUniversityEmail = (email) => {
  const emailRegex = /^[^\s@]+@mallareddyuniversity\.ac\.in$/;
  return emailRegex.test(email);
};

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
          <label style={styles.label}>University Email:</label>
          <input 
            style={styles.input}
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange}
            placeholder="student@mallareddyuniversity.ac.in"
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
    console.log('All users during login:', users);
    console.log('Looking for studentId:', studentId, 'password:', password);
    
    const matchedUser = users.find(
      (user) => user.studentId === studentId && user.password === password
    );

    console.log('Matched user:', matchedUser);

    if (matchedUser) {
      setError('');
      onLoginSuccess(matchedUser);
    } else {
      setError('Invalid Student ID or Password');
      // Debug info
      console.error('Login failed. Available users:', users.map(u => ({id: u.studentId, pass: u.password})));
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

        {/* Debug/Fix button for admin creation */}
        <button 
          style={{...styles.secondaryBtn, width: '100%', marginBottom: '1rem'}} 
          onClick={() => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const adminExists = users.find(user => user.studentId === 'ADMIN001');
            
            if (!adminExists) {
              const updatedUsers = [...users, defaultAdmin];
              localStorage.setItem('users', JSON.stringify(updatedUsers));
              alert('Admin user created! You can now login with ADMIN001/admin123');
            } else {
              alert('Admin user already exists. Credentials: ADMIN001/admin123');
            }
            console.log('Current users:', JSON.parse(localStorage.getItem('users')));
          }}
        >
          🔧 Create/Check Admin User
        </button>

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
  const { timeLeft, formattedTime, isExpired } = useCountdown(VOTING_END_TIME);
  const [stats, setStats] = useState({ totalUsers: 0, votedUsers: 0, participation: 0 });

  useEffect(() => {
    if (user.isAdmin) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const totalUsers = users.length - 1; // Exclude admin
      const votedUsers = users.filter(u => u.hasVoted && !u.isAdmin).length;
      const participation = totalUsers > 0 ? ((votedUsers / totalUsers) * 100).toFixed(1) : 0;
      
      setStats({ totalUsers, votedUsers, participation });
    }
  }, [user.isAdmin]);

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

        {/* Countdown Timer */}
        {!isExpired && (
          <div style={styles.countdown}>
            <p><strong>Voting ends in:</strong></p>
            <div style={styles.countdownTime}>{formattedTime}</div>
          </div>
        )}

        {!user.isAdmin && (
          <div style={styles.votingSection}>
            <h3>Student Elections</h3>
            {isExpired ? (
              <div style={styles.votingClosed}>
                <p>🕐 Voting has ended!</p>
                <p>Thank you for your participation in the election.</p>
              </div>
            ) : user.hasVoted ? (
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
            <h3>🛡️ Administrator Control Panel</h3>
            
            <div style={styles.adminStats}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{stats.totalUsers}</div>
                <p>Total Registered Users</p>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{stats.votedUsers}</div>
                <p>Users Who Voted</p>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{stats.participation}%</div>
                <p>Participation Rate</p>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{isExpired ? 'CLOSED' : 'ACTIVE'}</div>
                <p>Election Status</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <button style={styles.primaryBtn} onClick={onNavigateToResults}>
                📊 View Live Results
              </button>
              <button 
                style={styles.primaryBtn} 
                onClick={() => {
                  const users = JSON.parse(localStorage.getItem('users')) || [];
                  const studentUsers = users.filter(u => !u.isAdmin);
                  console.log('All registered students:', studentUsers);
                  alert(`Total Students: ${studentUsers.length}\nCheck console for detailed list`);
                }}
              >
                👥 View All Students
              </button>
              <button 
                style={{...styles.primaryBtn, backgroundColor: isExpired ? '#28a745' : '#dc3545'}} 
                onClick={() => {
                  if (isExpired) {
                    // Reset voting time
                    const newEndTime = new Date().getTime() + (3 * 60 * 60 * 1000);
                    localStorage.setItem('votingEndTime', newEndTime.toString());
                    window.location.reload();
                  } else {
                    // End voting immediately
                    localStorage.setItem('votingEndTime', new Date().getTime().toString());
                    window.location.reload();
                  }
                }}
              >
                {isExpired ? '🔄 Restart Voting' : '⏹️ End Voting Now'}
              </button>
            </div>

            <div style={{...styles.userInfo, marginTop: '2rem'}}>
              <h4>🔐 Admin Privileges:</h4>
              <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
                <li>View real-time election results</li>
                <li>Monitor voting participation</li>
                <li>Control voting session timing</li>
                <li>Access all student information</li>
                <li>Generate election reports</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VotingPage({ user, onVoteSubmit, onBackToDashboard }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [positions, setPositions] = useState([]);
  const { timeLeft, formattedTime, isExpired } = useCountdown(VOTING_END_TIME);

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

  if (user.hasVoted || isExpired) {
    return (
      <div style={styles.votingContainer}>
        <div style={styles.accessDenied}>
          <h2>{user.hasVoted ? 'Vote Already Cast' : 'Voting Has Ended'}</h2>
          <p>
            {user.hasVoted 
              ? 'You have already participated in this election.' 
              : 'The voting period has expired.'}
          </p>
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

      {/* Countdown Timer */}
      {!isExpired && (
        <div style={styles.countdown}>
          <p><strong>Voting ends in:</strong></p>
          <div style={styles.countdownTime}>{formattedTime}</div>
        </div>
      )}

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
                    <img 
                      src={candidate.photo} 
                      alt={candidate.name}
                      style={{
                        ...styles.candidatePhoto,
                        ...(selectedCandidates[position] === candidate.id ? styles.candidatePhotoSelected : {})
                      }}
                    />
                    <h4 style={styles.candidateName}>{candidate.name}</h4>
                    <p style={styles.candidatePosition}>{candidate.position}</p>
                    <p style={styles.candidateDepartment}>{candidate.department}</p>
                    <input
                      type="radio"
                      id={`candidate-${candidate.id}`}
                      name={position}
                      value={candidate.id}
                      checked={selectedCandidates[position] === candidate.id}
                      onChange={() => handleCandidateSelect(position, candidate.id)}
                      style={styles.radioInput}
                    />
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
    initializeData();
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