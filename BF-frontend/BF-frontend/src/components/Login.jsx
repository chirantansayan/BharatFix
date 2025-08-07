import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Corrected import
import { toast } from 'react-toastify';
import axios from '../services/axiosInstance'; // Use the unified instance
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Endpoint matches the backend AuthController signin
      const res = await axios.post('/api/auth/login', { username, password });
      const token = res.data.token;

      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      toast.success('Login successful!');

      // Navigate based on the role from the token
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (role === 'USER') {
        navigate('/user/dashboard');
      } else {
        // Fallback for guest or other roles
        navigate('/user/complaint');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleGuestLogin = () => {
    // A guest user would likely just go to the complaint form
    navigate('/user/complaint');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <label className="form-label">Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="logine-btn">
          Login
        </button>

        <button type="button" onClick={handleGuestLogin} className="guest-button">
          Continue as Guest
        </button>

        <p className="redirect-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
