import React, {useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import ComplaintForm from '../../components/Forms/ComplaintForm'
import './SubmitComplaint.css'
import Header from '../../components/Master page elements/Header'

const SubmitComplaint = () => {
  const [complaintSubmitted, setComplaintSubmitted] = useState(false)
  const location=useLocation();
  const user=location.state?.user
  if (!user) {
    return <Navigate to="/login" replace />
  }

useEffect(() => {
    console.log('complaintSubmitted changed to:', complaintSubmitted);
  }, [complaintSubmitted]);

  if (complaintSubmitted) {
    return (
      <>
      <Header user={user}/>
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
      </>
    )
  }

  return (
    <>
      <Header user={user}/>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Report an Issue</h2>
            <p>Help us keep our circus city in top condition</p>
          </div>
        </div>
      </section>
      <ComplaintForm userId={user.id} onSubmitSuccess={() => setComplaintSubmitted(true)} />
    </>
  )
}

export default SubmitComplaint;