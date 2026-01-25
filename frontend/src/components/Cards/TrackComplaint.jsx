import React from 'react'
import "./HowItWorks.css"

const TrackComplaint = ({userComplaint}) => {

  return (
      <div className="container">
            <div className="section-title">
              <h2>Your complaint details</h2>
            </div>
            
            <div className="steps-container">
                <h1>Title : {userComplaint.title}</h1>
                <h2>Type : {userComplaint.category}</h2>
                <h2>Location : {userComplaint.location}</h2>
                <h2>Urgency Level : {userComplaint.urgency}</h2>
                <p>Description : {userComplaint.description}</p>
                <p>status : {userComplaint.status}</p>
                <p>Submission Date : {userComplaint.submission_date}</p>
                {userComplaint.photos.map((photo)=>{
                    return <img ></img>
                })}
            </div>
          </div>
  )
}

export default TrackComplaint
