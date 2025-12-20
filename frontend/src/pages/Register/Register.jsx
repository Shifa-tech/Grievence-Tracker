import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

    const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e){
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response=await fetch("/api/user/register",{
      method:"POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(formData)
    })

    const data = await response.json();
    console.log("Registration response data:", data);

    if (response.ok) {
      console.log("Navigating to dashboard with data:", data.data);
      navigate("/dashboard", { state: { data: data.data } });
    } else {
      console.error("Registration failed:", data);
      setError(data.message || "Registration failed");
    }
    } catch (error) {
    console.error("Fetch error:", error);
    setError("Network error. Please try again.");
    }
  }

  return (
    <div className="register-container">
      <div className="form-container">  
        <h2>Register yourself</h2>
        {error && <div className="error-message">{error}</div>}
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