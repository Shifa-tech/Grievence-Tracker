import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Circus of Wonders</h3>
            <p>The traveling city that never sleeps. Our grievance tracker keeps our infrastructure running as smoothly as our performances.</p>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#stats">Statistics</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">User Guide</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: grievances@circusofwonders.com</li>
              <li>Office: Manager's Caravan, Center Ring Master</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2025 Circus of Wonders Grievance Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer