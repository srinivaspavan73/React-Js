import { useState, useEffect } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import "./Styles.css";

// Initial candidates data
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

// Voting time configuration
const VOTING_DURATION_HOURS = 3;
const VOTING_START_TIME = new Date().getTime();
const VOTING_END_TIME = VOTING_START_TIME + (VOTING_DURATION_HOURS * 60 * 60 * 1000);

// Initialize data in localStorage
const initializeData = () => {
  // Initialize candidates
  const existingCandidates = JSON.parse(localStorage.getItem('candidates'));
  if (!existingCandidates) {
    localStorage.setItem('candidates', JSON.stringify(initialCandidates));
  }

  // Initialize admin user
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const adminExists = existingUsers.find(user => user.studentId === 'ADMIN001');
  
  if (!adminExists) {
    const updatedUsers = [...existingUsers, defaultAdmin];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
  
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
    const interval = setInterval(fetchTime, 60000);

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
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="auth-heading">Welcome, {user.name}</h2>
        <button className="btn-secondary" onClick={onLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="user-info">
          <p><strong>Student ID:</strong> {user.studentId}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          {user.isAdmin && <p><strong>Role:</strong> Administrator</p>}
        </div>

        {!isExpired && (
          <div className="countdown">
            <p><strong>Voting ends in:</strong></p>
            <div className="countdown-time">{formattedTime}</div>
          </div>
        )}

        {!user.isAdmin && (
          <div className="voting-section">
            <h3>Student Elections</h3>
            {isExpired ? (
              <div className="voting-closed">
                <p>🕐 Voting has ended!</p>
                <p>Thank you for your participation in the election.</p>
              </div>
            ) : user.hasVoted ? (
              <div className="voted-status">
                <p>✅ You have already cast your vote!</p>
                <p>Thank you for participating in the election.</p>
              </div>
            ) : (
              <div>
                <p>Cast your vote for the student representatives.</p>
                <button className="btn-primary" onClick={onNavigateToVoting}>
                  Vote Now
                </button>
              </div>
            )}
          </div>
        )}

        {user.isAdmin && (
          <div className="admin-section">
            <h3>🛡️ Administrator Control Panel</h3>
            
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-number">{stats.totalUsers}</div>
                <p>Total Registered Users</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.votedUsers}</div>
                <p>Users Who Voted</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.participation}%</div>
                <p>Participation Rate</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">{isExpired ? 'CLOSED' : 'ACTIVE'}</div>
                <p>Election Status</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <button className="btn-primary" onClick={onNavigateToResults}>
                📊 View Live Results
              </button>
              <button 
                className="btn-primary" 
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
                className="btn-primary" 
                style={{ backgroundColor: isExpired ? '#28a745' : '#dc3545' }}
                onClick={() => {
                  if (isExpired) {
                    const newEndTime = new Date().getTime() + (3 * 60 * 60 * 1000);
                    localStorage.setItem('votingEndTime', newEndTime.toString());
                    window.location.reload();
                  } else {
                    localStorage.setItem('votingEndTime', new Date().getTime().toString());
                    window.location.reload();
                  }
                }}
              >
                {isExpired ? '🔄 Restart Voting' : '⏹️ End Voting Now'}
              </button>
            </div>

            <div className="user-info" style={{ marginTop: '2rem' }}>
              <h4>🔐 Admin Privileges:</h4>
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
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
    console.log('All candidates:', allCandidates);
    console.log('User department:', user.department);
    
    const departmentCandidates = allCandidates.filter(
      candidate => candidate.department.toLowerCase() === user.department.toLowerCase()
    );
    console.log('Filtered candidates:', departmentCandidates);
    
    setCandidates(departmentCandidates);

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
      <div className="voting-container">
        <div className="access-denied">
          <h2>{user.hasVoted ? 'Vote Already Cast' : 'Voting Has Ended'}</h2>
          <p>
            {user.hasVoted 
              ? 'You have already participated in this election.' 
              : 'The voting period has expired.'}
          </p>
          <button className="btn-primary" onClick={onBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="voting-container">
      <div className="voting-header">
        <div>
          <h2>Student Election Voting</h2>
          <p>Department: {user.department}</p>
        </div>
        <button className="btn-secondary" onClick={onBackToDashboard}>Back</button>
      </div>

      {!isExpired && (
        <div className="countdown">
          <p><strong>Voting ends in:</strong></p>
          <div className="countdown-time">{formattedTime}</div>
        </div>
      )}

      <div>
        {positions.map(position => (
          <div key={position} className="position-section">
            <h3>{position}</h3>
            <div className="candidates-grid">
              {candidates
                .filter(candidate => candidate.position === position)
                .map(candidate => (
                  <div 
                    key={candidate.id} 
                    className={`candidate-card ${selectedCandidates[position] === candidate.id ? 'candidate-card-selected' : ''}`}
                    onClick={() => handleCandidateSelect(position, candidate.id)}
                  >
                    <img 
                      src={candidate.photo} 
                      alt={candidate.name}
                      className={`candidate-photo ${selectedCandidates[position] === candidate.id ? 'candidate-photo-selected' : ''}`}
                    />
                    <h4 className="candidate-name">{candidate.name}</h4>
                    <p className="candidate-position">{candidate.position}</p>
                    <p className="candidate-department">{candidate.department}</p>
                    <input
                      type="radio"
                      id={`candidate-${candidate.id}`}
                      name={position}
                      value={candidate.id}
                      checked={selectedCandidates[position] === candidate.id}
                      onChange={() => handleCandidateSelect(position, candidate.id)}
                      className="radio-input"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="vote-submit">
          <button 
            className="btn-primary large-btn" 
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
      <div className="results-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Only administrators can view election results.</p>
          <button className="btn-primary" onClick={onBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <div>
          <h2>Live Election Results</h2>
          <p>Total Votes Cast: {totalVotes}</p>
        </div>
        <button className="btn-secondary" onClick={onBackToDashboard}>Back</button>
      </div>

      <div>
        {Object.entries(groupedCandidates).map(([key, candidates]) => {
          const [department, position] = key.split('-');
          const maxVotes = Math.max(...candidates.map(c => c.votes));
          
          return (
            <div key={key} className="position-results">
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
                        className={`result-card ${isWinner ? 'result-card-winner' : ''}`}
                      >
                        <div>
                          <h4 style={{ margin: '0 0 0.5rem 0' }}>
                            {candidate.name} {isWinner && maxVotes > 0 ? '👑' : ''}
                          </h4>
                          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                            {candidate.votes} votes ({percentage}%)
                          </p>
                        </div>
                        <div className="vote-bar">
                          <div 
                            className="vote-fill"
                            style={{ width: `${percentage}%` }}
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
    const allCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const updatedCandidates = allCandidates.map(candidate => {
      const isSelected = Object.values(selectedCandidates).includes(candidate.id);
      return isSelected ? { ...candidate, votes: candidate.votes + 1 } : candidate;
    });
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => 
      user.studentId === currentUser.studentId 
        ? { ...user, hasVoted: true, votedCandidates: Object.values(selectedCandidates) }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

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