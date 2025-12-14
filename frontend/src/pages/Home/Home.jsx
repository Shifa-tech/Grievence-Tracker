import React from 'react'
import Features from '../../components/Cards/Features'
import HowItWorks from '../../components/Cards/HowItWorks'
import Stats from '../../components/Cards/Stats'
import {Link} from "react-router-dom"
import './Home.css'
const Home = () => {
  return (
    <>
      <section className="hero" id="home">
            <div className="container hero-content">
              <h2>Welcome to the Circus of Wonders Grievance Tracker</h2>
              <p>Your mobile city deserves to run as smoothly as the show itself. Report issues, track resolutions, and help keep our traveling community thriving.</p>
              <div className="hero-buttons">
                <Link to="/submit-complaint" className="btn">Report an Issue</Link>
                <a href="#" className="btn btn-secondary">Track a Complaint</a>
              </div>
            </div>
      </section>

      <Features />
      <HowItWorks />
      <Stats />
      
      <section className="cta">
            <div className="container">
              <div className="cta-content">
                <h2>Ready to Report an Issue?</h2>
                <p>Join our community of citizens working together to keep the Circus of Wonders thriving. Your reports help us maintain our mobile city and ensure everyone enjoys the show.</p>
                <div className="cta-buttons">
                  <Link to="/submit-complaint" className="btn">Get Started Now</Link>
                  <a href="#" className="btn btn-secondary">Learn More</a>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

export default Home