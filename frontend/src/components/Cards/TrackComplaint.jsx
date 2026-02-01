import React from 'react'

const TrackComplaint = ({ userComplaint, onClose }) => {
    return (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '600px',
            position: 'relative'
        }}>
            {onClose && (
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer'
                    }}
                >
                    ×
                </button>
            )}
            
            <h2>Complaint Details</h2>
            <p><strong>Title:</strong> {userComplaint.title}</p>
            <p><strong>Type:</strong> {userComplaint.category}</p>
            <p><strong>Location:</strong> {userComplaint.location}</p>
            <p><strong>Urgency:</strong> {userComplaint.urgency}</p>
            <p><strong>Status:</strong> {userComplaint.status}</p>
            <p><strong>Date:</strong> {userComplaint.submission_date}</p>
            <p><strong>Description:</strong> {userComplaint.description}</p>
            
            <h3>Photos</h3>
            {userComplaint.photos && userComplaint.photos.map((photo, index) => {
                // Try direct path first
                const imageUrl = `http://localhost:5000${photo}`
                return (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <img 
                            src={imageUrl} 
                            alt={`Photo ${index + 1}`}
                            style={{ 
                                width: '200px', 
                                height: '150px',
                                objectFit: 'cover',
                                border: '1px solid #ccc'
                            }}
                        />
                        <p>Photo {index + 1}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default TrackComplaint