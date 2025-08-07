import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../services/axiosInstance'; // Use the unified instance
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
     
      const registrationPath = '/api/users/register'; 

      // The DTO for this endpoint is UserDTO, which matches the fields being sent.
      await axios.post(registrationPath, { username, email, password });
      
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration Error:', err);
      // Provide more specific feedback if the backend sends it
      const errorMessage =
        err.response?.data?.message || `Registration failed. Server returned ${err.response?.status || 'error'}.`;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleRegister}>
        <label className="form-label">Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label">Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="register-btn">
          Register
        </button>
        <p className="redirect-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
