import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ user, setUser }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleLogout = () => {
    setUser(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <div style={{
            width: '50px', 
            height: '50px', 
            backgroundColor: 'var(--accent-color)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: 'bold', 
            color: 'var(--dark-color)'
          }}>
            C
          </div>
          <h1>Circus of <span>Wonders</span></h1>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>☰</button>
        
        <nav className={mobileMenuOpen ? 'active' : ''}>
          <ul>
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><a href="#features" onClick={closeMobileMenu}>Features</a></li>
            <li><a href="#how-it-works" onClick={closeMobileMenu}>How It Works</a></li>
            <li><a href="#stats" onClick={closeMobileMenu}>Stats</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
          </ul>
        </nav>
        
        <div className="auth-buttons">
          {user ? (
            <>
              <span className="user-welcome">Welcome, {user.name}!</span>
              <Link to="/submit-complaint" className="btn">Report Issue</Link>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header