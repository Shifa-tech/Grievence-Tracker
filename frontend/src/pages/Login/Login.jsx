import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ user, setUser }) => {
  
  const [formData, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [redirected, setRedirected] = useState(false)
  const navigate = useNavigate()

   if (user) {
    navigate("/dashboard" , {state  :{user:user}})
  }

  function handleInputChange(event) {
    setForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        console.log("Login successful:", data)
        const token = data.accessToken
        localStorage.setItem("user", JSON.stringify(data.data))
        localStorage.setItem('accessToken', token)
        setUser(data.data)
        navigate("/dashboard", { state: { user: data.data } })
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      console.log("Error in login:", err)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative"
      style={{ 
        background: '#F5F5DC',
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(139,69,19,0.03) 0px, rgba(139,69,19,0.03) 2px, transparent 2px, transparent 8px),
          repeating-linear-gradient(135deg, rgba(210,105,30,0.03) 0px, rgba(210,105,30,0.03) 3px, transparent 3px, transparent 12px),
          radial-gradient(circle at 20% 40%, rgba(255,215,0,0.05) 0%, transparent 30%),
          radial-gradient(circle at 80% 70%, rgba(139,69,19,0.05) 0%, transparent 40%)
        `
      }}>
      
      {/* Decorative top stripe */}
      <div className="fixed top-0 left-0 right-0 h-3 z-10" style={{
        background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 24px, #FFD700 24px, #FFD700 48px, #2F1B0A 48px, #2F1B0A 72px, #FFD700 72px, #FFD700 96px)'
      }} />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(47,27,10,0.85)', backdropFilter: 'blur(4px)' }}>
          <div className="text-center">
            <span className="text-8xl animate-spin inline-block">🎠</span>
            <p className="mt-6 font-black uppercase tracking-widest text-xl"
              style={{ fontFamily: 'Georgia, serif', color: '#FFD700' }}>
              Logging in...
            </p>
            <div className="w-48 h-1 mt-4 rounded-full mx-auto overflow-hidden" style={{ background: 'rgba(255,215,0,0.3)' }}>
              <div className="w-1/2 h-full rounded-full animate-pulse" style={{ background: '#FFD700' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Card - Bigger Size */}
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
        
        {/* Card Header with Gradient */}
        <div className="relative px-14 py-12 overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)' }}>
          
          {/* Star Decorations */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'
          }} />
          <span className="absolute top-4 left-4 text-[#FFD700] text-sm opacity-60">★</span>
          <span className="absolute top-4 right-4 text-[#FFD700] text-sm opacity-60">★</span>
          <span className="absolute bottom-4 left-4 text-[#FFD700] text-sm opacity-60">★</span>
          <span className="absolute bottom-4 right-4 text-[#FFD700] text-sm opacity-60">★</span>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#FFD700] text-8xl opacity-5">🎪</span>

          {/* Icon */}
          <div className="relative w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-5xl">👑</span>
          </div>
          
          <h2 className="relative text-4xl font-black uppercase tracking-widest text-white"
            style={{ fontFamily: 'Georgia, serif', textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
            Welcome Back
          </h2>
          <p className="relative text-sm font-bold uppercase tracking-widest mt-3" style={{ color: 'rgba(255,215,0,0.8)' }}>
            ✦ Sign in to your account ✦
          </p>
        </div>

        {/* Form Body */}
        <div className="px-14 py-12" style={{ background: '#F5F5DC' }}>
          
          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 rounded-2xl border-2 border-red-500 bg-red-50 text-red-700 text-sm font-bold text-center">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Username Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">1</span>
                Username
              </label>
              <input 
                type="text" 
                name="username" 
                placeholder="Enter your username" 
                value={formData.username}
                onChange={handleInputChange}
                required 
                className="w-full px-8 py-5 rounded-2xl border-2 text-base font-bold outline-none transition-all duration-200"
                style={{
                  background: '#fff',
                  borderColor: formData.username ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
                onFocus={e => e.target.style.borderColor = '#8B4513'}
                onBlur={e => e.target.style.borderColor = formData.username ? '#8B4513' : '#D2691E'}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">2</span>
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                value={formData.password}
                onChange={handleInputChange}
                required 
                className="w-full px-8 py-5 rounded-2xl border-2 text-base font-bold outline-none transition-all duration-200"
                style={{
                  background: '#fff',
                  borderColor: formData.password ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
                onFocus={e => e.target.style.borderColor = '#8B4513'}
                onBlur={e => e.target.style.borderColor = formData.password ? '#8B4513' : '#D2691E'}
              />
            </div>

            {/* Decorative Stripe */}
            <div className="h-2 rounded-full my-8" style={{
              background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
            }} />

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', color: '#FFD700', fontFamily: 'Georgia, serif' }}>
              {loading ? '⏳ Logging in...' : '🔐 Login'}
            </button>

            {/* Register Link */}
            <p className="text-center text-base font-bold mt-8 pt-4" style={{ color: '#8B4513' }}>
              Not Registered?{' '}
              <Link to="/register" className="uppercase tracking-wider hover:text-[#D2691E] transition-colors text-lg" style={{ color: '#FFD700' }}>
                Create Account
              </Link>
            </p>
          </form>
        </div>

        {/* Bottom Stripe */}
        <div className="h-3" style={{
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
        }} />
      </div>
    </div>
  )
}

export default Login