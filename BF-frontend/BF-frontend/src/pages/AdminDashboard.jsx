import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          You are logged in with <strong>Admin</strong> privileges.
        </p>

        <div className="dashboard-grid">
          <div className="card card-yellow">
            <h2>View All Complaints</h2>
            <p>Manage and assign complaints.</p>
            {/* Corrected route */}
            <button onClick={() => navigate('/admin/all-complaints')}>Manage</button>
          </div>

          <div className="card card-blue">
            <h2>Manage Users</h2>
            <p>
              View or edit registered <br /> users.
            </p>
            {/* Placeholder for future functionality */}
            <button onClick={() => navigate('/users/all')}>Users</button>
          </div>

          <div className="card card-green">
            <h2>Staff Workload</h2>
            <p>See staff allocation and workload.</p>
            {/* Placeholder for future functionality */}
            <button onClick={() => navigate('/admin/staff')}>Workload</button>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
