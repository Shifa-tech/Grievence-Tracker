import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import ComplaintForm from '../../components/Forms/ComplaintForm'

const SubmitComplaint = ({ user }) => {
  const [complaintSubmitted, setComplaintSubmitted] = useState(false)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (complaintSubmitted) {
    return (
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>🎪 Complaint Submitted Successfully!</h2>
            <p>Your issue has been logged and will be addressed by our team. You will receive updates on the resolution progress.</p>
            <div className="hero-buttons">
              <button onClick={() => setComplaintSubmitted(false)} className="btn">
                Submit Another Complaint
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Report an Issue</h2>
            <p>Help us keep our circus city in top condition</p>
          </div>
        </div>
      </section>
      <ComplaintForm onSubmitSuccess={() => setComplaintSubmitted(true)} />
    </>
  )
}

export default SubmitComplaint;