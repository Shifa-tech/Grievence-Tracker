// frontend/src/components/Dashboard/Details/StaffHomePanel.jsx
import React, { useState, useEffect } from 'react'

const Stripe = () => (
  <div className="h-2 rounded-full my-8" style={{
    background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
  }}/>
)

const StaffHomePanel = ({ user }) => {
  const [stats, setStats] = useState({
    totalResolved: 0,
    totalAssigned: 0,
    inProgress: 0,
    pending: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStaffStats()
  }, [user])

  const fetchStaffStats = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`/api/complaint/staff/${user?.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-6xl animate-spin">🎠</span>
        <p className="mt-4 font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>Loading stats...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-12" style={{ background: '#F5F5DC' }}>

      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513] mb-16">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2F1B0A 0%, #8B4513 50%, #2F1B0A 100%)' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)' }} />
        <div className="relative px-14 py-20 text-center">
          <div className="w-28 h-10 rounded-full mx-auto mb-10 flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-4xl">🛠️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6"
            style={{ fontFamily: 'Georgia, serif', color: '#F5F5DC', textShadow: '2px 2px 0px #2F1B0A', letterSpacing: '0.08em' }}>
            Welcome back, <span style={{ color: '#FFD700' }}>{user?.username || 'Staff'}</span>
          </h1>
          <p className="text-lg font-semibold uppercase tracking-widest mb-10" style={{ color: 'rgba(255,215,0,0.7)' }}>
            Department: {user?.department || 'General'} | Keeping the circus running smoothly
          </p>
          <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base uppercase tracking-widest shadow-lg"
            style={{ background: '#FFD700', color: '#2F1B0A', border: '2px solid #8B4513' }}>
            🔧 Staff Access ✓
          </span>
        </div>
      </div>

      <Stripe />

      {/* Performance Stats */}
      <div className="mt-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #8B4513)' }} />
          <h2 className="font-black uppercase tracking-widest text-2xl px-4"
            style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>✦ Your Performance ✦</h2>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(to left, transparent, #8B4513)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513]">
            <div className="px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
              <span className="text-3xl">✅</span>
              <h3 className="text-white font-black uppercase tracking-wider mt-2">Resolved</h3>
            </div>
            <div className="px-6 py-8 text-center" style={{ background: '#F5F5DC' }}>
              <p className="text-5xl font-black text-[#8B4513]">{stats.totalResolved}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: '#5a3a1a' }}>Problems Solved</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513]">
            <div className="px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
              <span className="text-3xl">👤</span>
              <h3 className="text-white font-black uppercase tracking-wider mt-2">Assigned</h3>
            </div>
            <div className="px-6 py-8 text-center" style={{ background: '#F5F5DC' }}>
              <p className="text-5xl font-black text-[#8B4513]">{stats.totalAssigned}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: '#5a3a1a' }}>Total Assigned</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513]">
            <div className="px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
              <span className="text-3xl">⏳</span>
              <h3 className="text-white font-black uppercase tracking-wider mt-2">In Progress</h3>
            </div>
            <div className="px-6 py-8 text-center" style={{ background: '#F5F5DC' }}>
              <p className="text-5xl font-black text-[#8B4513]">{stats.inProgress}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: '#5a3a1a' }}>Working On</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513]">
            <div className="px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
              <span className="text-3xl">📋</span>
              <h3 className="text-white font-black uppercase tracking-wider mt-2">Pending</h3>
            </div>
            <div className="px-6 py-8 text-center" style={{ background: '#F5F5DC' }}>
              <p className="text-5xl font-black text-[#8B4513]">{stats.pending}</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: '#5a3a1a' }}>Needs Attention</p>
            </div>
          </div>
        </div>
      </div>

      <Stripe />

      {/* Resolution Rate Progress */}
      <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
        <div className="relative px-10 py-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)' }}>
          <h2 className="relative font-black uppercase tracking-widest text-xl text-center text-white">🎯 Resolution Rate</h2>
        </div>
        <div className="p-10" style={{ background: '#F5F5DC' }}>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span style={{ color: '#8B4513' }}>Progress</span>
            <span style={{ color: '#8B4513' }}>
              {stats.totalAssigned > 0 ? Math.round((stats.totalResolved / stats.totalAssigned) * 100) : 0}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${stats.totalAssigned > 0 ? (stats.totalResolved / stats.totalAssigned) * 100 : 0}%`,
                background: 'linear-gradient(90deg, #D2691E, #FFD700)'
              }}
            />
          </div>
          <p className="text-center text-sm font-bold uppercase tracking-widest mt-4" style={{ color: '#5a3a1a' }}>
            {stats.totalResolved} out of {stats.totalAssigned} complaints resolved
          </p>
        </div>
      </div>

    </div>
  )
}

export default StaffHomePanel