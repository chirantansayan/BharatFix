import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../services/axiosInstance'; // Use the unified instance
import './AllComplaints.css';

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Endpoint matches backend ComplaintController
        const res = await axios.get('/api/complaints/all');
        setComplaints(res.data);
      } catch (err) {
        console.error('Failed to fetch complaints', err);
        toast.error('Could not fetch all complaints.');
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="all-complaints-container">
      <h2 className="page-title">📋 All Complaints</h2>
      <div className="complaints-table-wrapper">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Title</th>
              <th>Status</th>
              <th>Department</th>
              <th>Location</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                {/* The user object is nested in the response */}
                <td>{c.user?.username || 'Unknown'}</td>
                <td>{c.title}</td>
                <td>{c.status}</td>
                <td>{c.department}</td>
                <td>
                  {c.latitude}, {c.longitude}
                </td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllComplaints;
