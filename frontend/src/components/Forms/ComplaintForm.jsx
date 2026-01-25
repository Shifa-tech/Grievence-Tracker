import React, { useState } from 'react'
import './ComplaintForm.css'

const ComplaintForm = ({ userId,onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    complaintType: '',
    complaintTitle: '',
    complaintDescription: '',
    locationArea: '',
    contactPreference : 'email',
    urgency: '',
    photos: [],
    userId:userId
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
 const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }))
  }

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

    const [uploading, setUploading] = useState(false)

  const handleSubmit=async (e)=>{
    e.preventDefault();
   
    try {
     const formDataToSend = new FormData()
      formDataToSend.append('complaintType', formData.complaintType)
      formDataToSend.append('complaintTitle', formData.complaintTitle)
      formDataToSend.append('complaintDescription', formData.complaintDescription)
      formDataToSend.append('locationArea', formData.locationArea)
      formDataToSend.append('contactPreference', formData.contactPreference)
      formDataToSend.append('urgency', formData.urgency)
      formDataToSend.append('userId', userId)
      
      formData.photos.forEach((file, index) => {
        formDataToSend.append('photos', file)
      })
      
      const response = await fetch("/api/complaint", {
        method: "POST",
        body: formDataToSend
      })
      
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        
        // Reset form
        setFormData({
          complaintType: '',
          complaintTitle: '',
          complaintDescription: '',
          locationArea: '',
          contactPreference: 'email',
          urgency: '',
          photos: [],
          userId: userId
        });
        
        onSubmitSuccess();
      }
       else {
        console.error("Submission failed:", await response.text())
      }
    } catch (error) {
      console.error("Complaint submission failed:", error);
    } finally {
      setUploading(false);
    }
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
               <select 
              className="form-control" 
              id="urgency" 
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              required>
              <option value="">Urgency Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              </select> 
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
            <button type="submit" disabled={uploading} className="btn" style={{ width: '100%', padding: '15px' }}>
              {uploading ? 'Uploading...' : '🎪 Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ComplaintForm