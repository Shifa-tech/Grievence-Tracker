// frontend/src/components/Dashboard/Details/StaffAllComplaints.jsx
import React, { useState, useEffect } from 'react'

const StaffAllComplaints = ({ user }) => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchAllComplaints()
  }, [])

  const fetchAllComplaints = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/complaint', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setComplaints(data.complaints || data)
    } catch (error) {
      console.error('Error fetching complaints:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken')
      await fetch(`/api/complaint/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      fetchAllComplaints()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(c => c.status === filter)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-6xl animate-spin">🎠</span>
        <p className="mt-4 font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>Loading complaints...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header with Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-3xl">📋</span>
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
              All Complaints
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
              ✦ Full Circus Issue Tracker ✦
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 flex-wrap">
          {[
            { value: 'all', label: 'All', icon: '📊' },
            { value: 'open', label: 'Open', icon: '🟡' },
            { value: 'in-progress', label: 'In Progress', icon: '🔄' },
            { value: 'resolved', label: 'Resolved', icon: '✅' }
          ].map(btn => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-6 py-3 rounded-2xl border-2 font-black uppercase tracking-widest text-sm transition-all duration-200 ${
                filter === btn.value ? 'shadow-lg -translate-y-0.5' : 'opacity-60'
              }`}
              style={{
                background: filter === btn.value ? 'linear-gradient(135deg, #2F1B0A, #8B4513)' : 'transparent',
                borderColor: '#FFD700',
                color: filter === btn.value ? '#FFD700' : '#8B4513'
              }}
            >
              <span className="mr-2">{btn.icon}</span> {btn.label} ({complaints.filter(c => btn.value === 'all' ? true : c.status === btn.value).length})
            </button>
          ))}
        </div>

        <div className="h-2 rounded-full mt-6" style={{
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
        }} />
      </div>

      {/* Complaints Grid */}
      <div className="space-y-4 mt-8">
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-[#8B4513]" style={{ background: '#F5F5DC' }}>
            <span className="text-6xl opacity-30">📋</span>
            <p className="mt-4 text-xl font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>No complaints found</p>
          </div>
        ) : (
          filteredComplaints.map(complaint => (
            <div key={complaint._id} className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513]">
              <div className="px-8 py-5 flex flex-wrap justify-between items-center gap-4"
                style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
                <div>
                  <h3 className="font-black uppercase tracking-wider text-lg text-white">{complaint.title}</h3>
                  <p className="text-xs text-[#FFD700] mt-1">ID: {complaint._id.slice(-8)} | By: {complaint.userId?.username || 'Unknown'}</p>
                </div>
                <div className="flex gap-3">
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                    complaint.urgency === 'high' ? 'bg-red-500 text-white' :
                    complaint.urgency === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
                  }`}>
                    {complaint.urgency}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                    complaint.status === 'open' ? 'bg-yellow-500 text-black' :
                    complaint.status === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>
              <div className="px-8 py-6" style={{ background: '#F5F5DC' }}>
                <p className="text-gray-700 mb-4">{complaint.description}</p>
                <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
                  <span className="font-bold" style={{ color: '#8B4513' }}>📍 {complaint.location}</span>
                  <span className="font-bold" style={{ color: '#8B4513' }}>📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  <select
                    value={complaint.status}
                    onChange={(e) => updateStatus(complaint._id, e.target.value)}
                    className="px-4 py-2 rounded-xl border-2 font-bold text-sm cursor-pointer"
                    style={{ borderColor: '#D2691E', color: '#2F1B0A' }}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default StaffAllComplaints