import React, { useState } from 'react'

const ComplaintForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    complaintType: '',
    complaintTitle: '',
    complaintDescription: '',
    locationArea: '',
    urgency: '',
    contactPreference: 'email',
    photos: []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUrgencySelect = (urgency) => {
    setFormData(prev => ({
      ...prev,
      urgency
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Complaint submitted:', formData)
    onSubmitSuccess()
  }

  return (
    <section>
      <div className="container">
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="complaintType">Issue Type *</label>
            <select 
              className="form-control" 
              id="complaintType" 
              name="complaintType"
              value={formData.complaintType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select issue type</option>
              <option value="road-damage">🚧 Road/Pavement Damage</option>
              <option value="water-leakage">💧 Water Line Leakage</option>
              <option value="garbage">🗑️ Garbage Collection</option>
              <option value="electrical">⚡ Electrical Issues</option>
              <option value="safety">🛡️ Safety Hazard</option>
              <option value="other">🔧 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="complaintTitle">Title *</label>
            <input 
              type="text" 
              className="form-control" 
              id="complaintTitle" 
              name="complaintTitle"
              placeholder="Brief description of the issue" 
              value={formData.complaintTitle}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="complaintDescription">Detailed Description *</label>
            <textarea 
              className="form-control" 
              id="complaintDescription" 
              name="complaintDescription"
              placeholder="Please provide detailed information about the issue..." 
              value={formData.complaintDescription}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <select 
              className="form-control" 
              id="locationArea" 
              name="locationArea"
              value={formData.locationArea}
              onChange={handleInputChange}
              required
            >
              <option value="">Select area</option>
              <option value="big-top">Big Top Area</option>
              <option value="food-stalls">Food Stalls Zone</option>
              <option value="living-quarters">Living Quarters</option>
              <option value="main-path">Main Pathways</option>
              <option value="animal-zone">Animal Care Zone</option>
              <option value="performance">Performance Areas</option>
            </select>
            <div className="map-preview">
              🗺️ Circus Map Location Selector
            </div>
          </div>

          <div className="form-group">
            <label>Urgency Level *</label>
            <div className="urgency-badges">
              {['high', 'medium', 'low'].map(level => (
                <div 
                  key={level}
                  className={`urgency-badge ${level} ${formData.urgency === level ? 'selected' : ''}`}
                  onClick={() => handleUrgencySelect(level)}
                >
                  <strong>
                    {level === 'high' ? '🚨 High' : level === 'medium' ? '⚠️ Medium' : '✅ Low'}
                  </strong>
                  <p>
                    {level === 'high' ? 'Safety hazard or major disruption' : 
                     level === 'medium' ? 'Significant inconvenience' : 
                     'Minor issue, no immediate impact'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Photo Evidence</label>
            <div className="file-upload" onClick={() => document.getElementById('complaintPhotos').click()}>
              <div className="upload-icon">📸</div>
              <p>Click to upload photos of the issue</p>
              <small>Maximum 5 photos, 5MB each</small>
              <input 
                type="file" 
                id="complaintPhotos" 
                accept="image/*" 
                multiple 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
            <div className="file-preview">
              {formData.photos.map((photo, index) => (
                <div key={index} className="file-preview-item">
                  {photo.name}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactPreference">Contact Preference</label>
            <select 
              className="form-control" 
              id="contactPreference" 
              name="contactPreference"
              value={formData.contactPreference}
              onChange={handleInputChange}
            >
              <option value="email">📧 Email Updates</option>
              <option value="sms">📱 SMS Notifications</option>
              <option value="both">Both Email & SMS</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" style={{ width: '100%', padding: '15px' }}>
              🎪 Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ComplaintForm