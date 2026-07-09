import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ user: propUser, setUser }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setLocalUser] = useState(propUser)
  const navigate = useNavigate()

  useEffect(() => {
    setLocalUser(propUser)
  }, [propUser])

  useEffect(() => {
    if (!propUser) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setLocalUser(parsedUser)
        if (setUser) {
          setUser(parsedUser)
        }
      }
    }
  }, [propUser, setUser])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Navigation items (only shown when logged out)
  const navItems = [
    { to: '/', label: 'Home', icon: '🏠' },
    { href: '#features', label: 'Features', icon: '🎪' },
    { href: '#how-it-works', label: 'How It Works', icon: '⚙️' },
    { href: '#stats', label: 'Stats', icon: '📊' },
    { href: '#contact', label: 'Contact', icon: '📞' },
  ]

  return (
    <header className="sticky top-0 z-50 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, #2F1B0A 0%, #8B4513 50%, #2F1B0A 100%)',
        borderBottom: '3px solid #FFD700',
      }}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{ width: '50px', height: '50px' }} />
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-[#FFD700] transition-all duration-300 group-hover:scale-105"
              style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
              <span className="text-2xl font-black" style={{ color: '#FFD700' }}>C</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider"
              style={{ fontFamily: 'Georgia, serif', color: '#FFD700', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
              Circus of <span style={{ color: '#F5F5DC' }}>Wonders</span>
            </h1>
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] mt-0.5" style={{ color: 'rgba(255,215,0,0.6)' }}>
              ✦ Grievance Tracker ✦
            </p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
          style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)' }}>
          <span className="text-xl" style={{ color: '#FFD700' }}>☰</span>
        </button>

        {/* Navigation - ONLY SHOW WHEN LOGGED OUT */}
        {!user && (
          <nav className={`
            ${mobileMenuOpen ? 'flex' : 'hidden'} 
            md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto
            bg-[#2F1B0A] md:bg-transparent p-6 md:p-0 shadow-xl md:shadow-none
            transition-all duration-300 z-40
          `}>
            <ul className="flex flex-col md:flex-row gap-5 md:gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5 group"
                      style={{ color: '#F5F5DC' }}>
                      <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5 group"
                      style={{ color: '#F5F5DC' }}>
                      <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.3)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: '#FFD700' }}>
                  <span className="text-sm font-black" style={{ color: '#2F1B0A' }}>
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-bold uppercase tracking-wide hidden sm:block" style={{ color: '#FFD700' }}>
                  {user.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(220,53,69,0.15)',
                  color: '#ff6b6b',
                  border: '1px solid rgba(220,53,69,0.4)',
                }}>
                <span className="text-base">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'transparent',
                  color: '#FFD700',
                  border: '2px solid #FFD700',
                }}>
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #D2691E)',
                  color: '#2F1B0A',
                  border: '2px solid #8B4513',
                }}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu for Logged Out Users */}
        {mobileMenuOpen && !user && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-6 rounded-b-3xl shadow-2xl z-50"
            style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', borderTop: '2px solid #FFD700' }}>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <React.Fragment key={item.label}>
                  {item.to ? (
                    <Link to={item.to} onClick={closeMobileMenu} className="flex items-center gap-3 py-3 px-4 rounded-xl" style={{ color: '#FFD700' }}>
                      <span className="text-xl">{item.icon}</span> {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} onClick={closeMobileMenu} className="flex items-center gap-3 py-3 px-4 rounded-xl" style={{ color: '#FFD700' }}>
                      <span className="text-xl">{item.icon}</span> {item.label}
                    </a>
                  )}
                </React.Fragment>
              ))}
              <div className="pt-3 mt-2 border-t border-[#FFD700]/30">
                <Link to="/login" onClick={closeMobileMenu} className="flex items-center gap-3 py-3 px-4 rounded-xl" style={{ color: '#FFD700' }}>
                  <span className="text-xl">🔑</span> Login
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="flex items-center gap-3 py-3 px-4 rounded-xl" style={{ color: '#FFD700' }}>
                  <span className="text-xl">📝</span> Register
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu for Logged In Users - Just simple */}
        {mobileMenuOpen && user && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-6 rounded-b-3xl shadow-2xl z-50"
            style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', borderTop: '2px solid #FFD700' }}>
            <div className="flex flex-col gap-3">
              <button onClick={handleLogout} className="flex items-center gap-3 py-3 px-4 rounded-xl text-left" style={{ color: '#ff6b6b' }}>
                <span className="text-xl">🚪</span> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header