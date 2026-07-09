import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({ user, setUser }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone : '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      })

      const data = await response.json();
      console.log("Registration response data:", data);

      if (response.ok && data.success) {
        console.log("Navigating to dashboard with data:", data.data);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          console.log("✅ Token stored from registration");
        }
        localStorage.setItem("user", JSON.stringify(data.data));
        console.log("✅ Registration successful! Redirecting to dashboard...");
        setUser(data.data);
        navigate("/dashboard", { state: { user: data.data } });
      } else {
        console.error("Registration failed:", data);
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    navigate("/dashboard");
    return null;
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
              Creating Account...
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
            <span className="text-5xl">G</span>
          </div>
          
          <h2 className="relative text-4xl font-black uppercase tracking-widest text-white"
            style={{ fontFamily: 'Georgia, serif', textShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
            Join the Circus
          </h2>
          <p className="relative text-sm font-bold uppercase tracking-widest mt-3" style={{ color: 'rgba(255,215,0,0.8)' }}>
            ✦ Create your account ✦
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

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">1</span>
                Username
              </label>
              <input 
                type="text" 
                name="username" 
                placeholder="Choose a username" 
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

            {/* Email Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">2</span>
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="w-full px-8 py-5 rounded-2xl border-2 text-base font-bold outline-none transition-all duration-200"
                style={{
                  background: '#fff',
                  borderColor: formData.email ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
                onFocus={e => e.target.style.borderColor = '#8B4513'}
                onBlur={e => e.target.style.borderColor = formData.email ? '#8B4513' : '#D2691E'}
              />
            </div>
                {/*Phone Number */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">3</span>
                Phone Number
              </label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+91 9876543210" 
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-8 py-5 rounded-2xl border-2 text-base font-bold outline-none transition-all duration-200"
                style={{ background: '#fff', borderColor: '#D2691E', color: '#2F1B0A' }}
              />
              <p className="text-xs text-gray-500">For SMS notifications about your complaint status</p>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">3</span>
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="Create a password" 
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
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                <span className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-sm">4</span>
                Confirm Password
              </label>
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Re-enter your password" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required 
                className="w-full px-8 py-5 rounded-2xl border-2 text-base font-bold outline-none transition-all duration-200"
                style={{
                  background: '#fff',
                  borderColor: formData.confirmPassword ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
                onFocus={e => e.target.style.borderColor = '#8B4513'}
                onBlur={e => e.target.style.borderColor = formData.confirmPassword ? '#8B4513' : '#D2691E'}
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
              {loading ? '⏳ Creating Account...' : '🎪 Register'}
            </button>

            {/* Login Link */}
            <p className="text-center text-base font-bold mt-8 pt-4" style={{ color: '#8B4513' }}>
              Already have an account?{' '}
              <Link to="/login" className="uppercase tracking-wider hover:text-[#D2691E] transition-colors text-lg" style={{ color: '#FFD700' }}>
                Sign In
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

export default Register