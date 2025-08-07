import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Register from './components/Register';
import ComplaintForm from './components/ComplaintForm';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AllComplaints from './pages/AllComplaints';
import MyComplaints from './pages/MyComplaints';

function App() {
  return (
    <Router>
      {/* ToastContainer is used to display notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/complaint" element={<ComplaintForm />} />
        <Route path="/user/my-complaints" element={<MyComplaints />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/all-complaints" element={<AllComplaints />} />
      </Routes>
    </Router>
  );
}

export default App;
