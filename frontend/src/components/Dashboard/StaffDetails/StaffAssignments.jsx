// frontend/src/components/Dashboard/StaffDetails/StaffAssignments.jsx
import React, { useState, useEffect } from 'react'

const StaffAssignments = ({ user }) => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDepartmentComplaints()
  }, [user])

  const fetchDepartmentComplaints = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const departmentValue = user?.department || 'general'
      const response = await fetch(`/api/complaint/department/${departmentValue}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setComplaints(data.complaints)
      }
    } catch (error) {
      console.error('Error fetching department complaints:', error)
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
      fetchDepartmentComplaints()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-6xl animate-spin">🎠</span>
        <p className="mt-4 font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>Loading assignments...</p>
      </div>
    )
  }

  const departmentName = user?.department?.replace('-', ' ') || 'General'

  return (
    <div>
      {/* Department Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-3xl">🏢</span>
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
              {departmentName} Department
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
              ✦ Complaints assigned to your team ✦
            </p>
          </div>
        </div>
        <div className="h-2 rounded-full mt-6" style={{
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
        }} />
      </div>

      {/* Complaints List */}
      <div className="space-y-4 mt-8">
        {complaints.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-[#8B4513]" style={{ background: '#F5F5DC' }}>
            <span className="text-6xl opacity-30">📋</span>
            <p className="mt-4 text-xl font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>No complaints in your department</p>
            <p className="text-sm mt-2" style={{ color: '#5a3a1a' }}>All caught up! Great work!</p>
          </div>
        ) : (
          complaints.map(complaint => {
            // Get citizen name safely
            let citizenName = 'Unknown'
            if (complaint.userId) {
              if (typeof complaint.userId === 'object') {
                citizenName = complaint.userId.username || 'Unknown'
              } else {
                citizenName = complaint.userId.slice(-6)
              }
            }

            return (
              <div key={complaint._id} className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513]">
                <div className="px-8 py-5 flex justify-between items-center"
                  style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-lg text-white">{complaint.title}</h3>
                    <p className="text-xs text-[#FFD700] mt-1">ID: {complaint._id.slice(-8)}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                    complaint.urgency === 'high' ? 'bg-red-500 text-white' :
                    complaint.urgency === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
                  }`}>
                    {complaint.urgency}
                  </span>
                </div>
                <div className="px-8 py-6" style={{ background: '#F5F5DC' }}>
                  <p className="text-gray-700 mb-4">{complaint.description}</p>
                  <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
                    <span className="font-bold" style={{ color: '#8B4513' }}>📍 {complaint.location}</span>
                    <span className="font-bold" style={{ color: '#8B4513' }}>👤 Citizen: {citizenName}</span>
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
            )
          })
        )}
      </div>
    </div>
  )
}

export default StaffAssignments