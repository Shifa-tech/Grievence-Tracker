import React, { useState, useEffect } from 'react';
import "./CitizenDashboard.css"

const CitizenDashboard = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserComplaints();
  }, [user]);

  const fetchUserComplaints = async () => {
    try {
      await fetch(`/api/complaint/:${user.id}`,{
        body:{userId:user.id},
        method:"GET"
      })
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="citizen-dashboard">
      <h2>🎪 Your Complaints Dashboard</h2>
      <p>Welcome, {user.name}! Here are your submitted issues.</p>
      
      <div className="stats-summary">
        <div className="stat-card pending">
          <h3>{complaints.filter(c => c.status === 'open').length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card in-progress">
          <h3>{complaints.filter(c => c.status === 'in-progress').length}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card resolved">
          <h3>{complaints.filter(c => c.status === 'resolved').length}</h3>
          <p>Resolved</p>
        </div>
      </div>

      <div className="complaints-list">
        <h3>Your Recent Complaints</h3>
        {loading ? (
          <p>Loading...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          complaints.map(complaint => (
            <div key={complaint._id} className={`complaint-card ${complaint.urgency}`}>
              <div className="complaint-header">
                <h4>{complaint.title}</h4>
                <span className={`status-badge ${complaint.status}`}>
                  {complaint.status}
                </span>
              </div>
              <p>{complaint.description}</p>
              <div className="complaint-footer">
                <span className="urgency">Urgency: {complaint.urgency}</span>
                <span className="date">
                  Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;