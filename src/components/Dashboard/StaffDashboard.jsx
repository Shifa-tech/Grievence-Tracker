// frontend/src/components/Dashboards/StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const StaffDashboard = ({ user }) => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/complaints', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setAllComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (complaintId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/complaints/${complaintId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchAllComplaints(); // Refresh
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredComplaints = filter === 'all' 
    ? allComplaints 
    : allComplaints.filter(c => c.status === filter);

  return (
    <div className="staff-dashboard">
      <h2>🛠️ Staff Dashboard</h2>
      <p>Welcome, {user.name}! Manage all circus complaints.</p>
      
      <div className="dashboard-controls">
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
            All ({allComplaints.length})
          </button>
          <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>
            Pending ({allComplaints.filter(c => c.status === 'pending').length})
          </button>
          <button onClick={() => setFilter('in-progress')} className={filter === 'in-progress' ? 'active' : ''}>
            In Progress ({allComplaints.filter(c => c.status === 'in-progress').length})
          </button>
          <button onClick={() => setFilter('resolved')} className={filter === 'resolved' ? 'active' : ''}>
            Resolved ({allComplaints.filter(c => c.status === 'resolved').length})
          </button>
        </div>
      </div>

      <div className="complaints-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Submitted By</th>
              <th>Type</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : filteredComplaints.length === 0 ? (
              <tr><td colSpan="7">No complaints found</td></tr>
            ) : (
              filteredComplaints.map(complaint => (
                <tr key={complaint._id}>
                  <td>{complaint._id.substring(0, 8)}...</td>
                  <td>{complaint.title}</td>
                  <td>{complaint.userId?.username || 'Unknown'}</td>
                  <td>{complaint.type}</td>
                  <td>
                    <span className={`urgency-badge ${complaint.urgency}`}>
                      {complaint.urgency}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${complaint.status}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={complaint.status}
                      onChange={(e) => updateStatus(complaint._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;