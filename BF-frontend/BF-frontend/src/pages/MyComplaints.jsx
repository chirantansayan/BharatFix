import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../services/axiosInstance'; // Use the unified instance
import './MyComplaints.css';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        // Endpoint matches backend ComplaintController
        const res = await axios.get('/api/complaints/allcomplaints');
        setComplaints(res.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        toast.error('Could not fetch your complaints.');
      }
    };
    fetchMyComplaints();
  }, []);

  return (
    <div className="my-complaints-page">
      <h2>📋 My Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <div className="complaint-list">
          {complaints.map((c) => (
            <div key={c.id} className="complaint-card">
              <h3>{c.title}</h3>
              <p>
                <strong>Status:</strong> {c.status}
              </p>
              <p>{c.description}</p>
              <p>
                <strong>Department:</strong> {c.department}
              </p>
              <p>
                <strong>Submitted:</strong> {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
