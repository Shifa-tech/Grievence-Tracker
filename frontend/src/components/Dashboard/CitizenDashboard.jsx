import React, { useState, useEffect } from 'react';
import "./CitizenDashboard.css"
import Header from '../Master page elements/Header';
import TrackComplaint from '../Cards/TrackComplaint';

const CitizenDashboard = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchUserComplaints();
  }, [user]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedComplaint) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedComplaint]);

  const fetchUserComplaints = async () => {
    try {
      const response = await fetch(`/api/complaint/${user.id}`,{
        headers:{
          "Accept":"application/json",
        },
        method:"GET"
      })
      if (response.ok) {
      const data = await response.json();
      setComplaints(data);
      }else {
        console.log("Fetching complaint failed");
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const openComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintDetails = () => {
    setSelectedComplaint(null);
  };

  return (
    <div>
      <Header user={user} />
      <div className="citizen-dashboard">
        <h2>🎪 Your Complaints Dashboard</h2>
        <p>Welcome, {user.username}! Here are your submitted issues.</p>
        
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
                  <button 
                    onClick={() => openComplaintDetails(complaint)}
                    className='btn'
                  >
                    View full details
                  </button>
                </div>
                <div className="complaint-footer">
                  <h4 className="urgency">Urgency: {complaint.urgency}</h4>
                  <h4>Status : {complaint.status}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Complaint Details Modal/Popup */}
      {selectedComplaint && (
        <div className="complaint-modal-overlay" onClick={closeComplaintDetails}>
          <div className="complaint-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <TrackComplaint 
                userComplaint={selectedComplaint} 
                onClose={closeComplaintDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;