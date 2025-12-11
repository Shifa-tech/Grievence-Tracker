import React from 'react'
import Features_data from "../../assets/Features_data"
const Features = () => {

  return (
    <section id="features">
      <div className="container">
        <div className="section-title">
          <h2>Key Features</h2>
          <p>Everything you need to keep our traveling city running smoothly</p>
        </div>
        
        <div className="features-grid">
          {Features_data.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features;