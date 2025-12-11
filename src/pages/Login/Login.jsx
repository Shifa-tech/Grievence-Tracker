import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    // Simulate login
    setUser({ name: formData.username, email: `${formData.username}@circus.com` })
    navigate('/')
  }

  return (
    <div className="register-container">
      <div className="form-container">  
        <h2>Login</h2>
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
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              required 
            />
          </div>
         
          <button type="submit">Login</button>

          <p className="login-link">
            Not Registered? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;