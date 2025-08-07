import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">User Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome to your dashboard! You are logged in as a <strong>User</strong>.
        </p>

        <div className="dashboard-grid">
          <div className="card card-blue">
            <h2>Submit New Complaint</h2>
            <p>You can file a new complaint here.</p>
            {/* Corrected route */}
            <button onClick={() => navigate('/user/complaint')}>Submit</button>
          </div>

          <div className="card card-green">
            <h2>View My Complaints</h2>
            <p>See the status of your submitted complaints.</p>
            {/* Corrected route */}
            <button onClick={() => navigate('/user/my-complaints')}>View</button>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
