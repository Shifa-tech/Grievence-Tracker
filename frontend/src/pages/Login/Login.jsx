import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
const Login = () => {
  
  const [formData,setForm]=useState({username:"",password:""})
  const [error, setError] = useState("");
  const navigate=useNavigate();

  function handleInputChange(event){
      setForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }
  async function handleSubmit(event){
    event.preventDefault();
    try {
      const response=await fetch("/api/user/login",{
        method:"POST",
        header:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await response.json();
      
      if (response.ok) {
        console.log("Login successful:", data);
        navigate("/dashboard", { state: { data: data.data } }); // Pass user data
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log("Error in login:", error);
      setError("Network error. Please try again.");
    }
    
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
         
          <button type="submit" className='login_btn'>Login</button>

          <p className="login-link">
            Not Registered? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;