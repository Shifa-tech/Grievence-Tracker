import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Simulate registration
    setUser({ name: formData.username, email: formData.email })
    navigate('/')
  }

  return (
    <div className="register-container">
      <div className="form-container">  
        <h2>Register yourself</h2>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username" 
              value={formData.username}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Create a password" 
              value={formData.password}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Re-enter your password" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
            />
          </div>
          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register;