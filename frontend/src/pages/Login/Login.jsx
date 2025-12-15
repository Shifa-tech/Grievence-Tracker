import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
const Login = () => {
  
  const [formData,setform]=useState({username:"",password:""})
  const navigate=useNavigate();
  function handleInputChange(event){
      if(event.target.name==="username"){
        setform((prev)=>{
          return{
          ...prev,username:event.target.value
          }
        })
      }
      else if(event.target.name==="password"){
        setform((prev)=>{
          return{
          ...prev,password:event.target.value
          }
        })
      }
  }
  async function handleSubmit(event){
    event.preventDefault();
    try {
      const response=await fetch("/api/user/login",{
        method:"POST",
        body:JSON.stringify(formData)
      })
    } catch (error) {
      console.log("error in login");
    }
    if(response.ok){
    navigate("../Dashboard/Dashboard.jsx")
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