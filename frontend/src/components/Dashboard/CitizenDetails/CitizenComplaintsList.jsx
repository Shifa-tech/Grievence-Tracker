// frontend/src/components/Dashboard/CitizenDetails/CitizenComplaintsList.jsx
import React, { useState, useEffect } from 'react'

const CitizenComplaintsList = ({ user }) => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  useEffect(() => {
    fetchUserComplaints()
  }, [user])

  const fetchUserComplaints = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`/api/complaint/user/${user?.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setComplaints(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching complaints:', error)
      setComplaints([])
    } finally {
      setLoading(false)
    }
  }

  const openModal = (complaint) => {
    setSelectedComplaint(complaint)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedComplaint(null)
    document.body.style.overflow = 'auto'
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-6xl animate-spin">🎠</span>
        <p className="mt-4 font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>Loading your complaints...</p>
      </div>
    )
  }

  return (
    <>
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
              style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
              <span className="text-3xl">📋</span>
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
                My Complaints
              </h1>
              <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
                ✦ Click on any complaint to view full details ✦
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
              <p className="mt-4 text-xl font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>No complaints yet</p>
              <p className="text-sm mt-2" style={{ color: '#5a3a1a' }}>Click "Submit Complaint" to report an issue</p>
            </div>
          ) : (
            complaints.map(complaint => (
              <div key={complaint._id} 
                onClick={() => openModal(complaint)}
                className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513] cursor-pointer hover:-translate-y-1 transition-all duration-300"
              >
                <div className="px-8 py-5 flex justify-between items-center"
                  style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)' }}>
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-lg text-white">{complaint.title}</h3>
                    <p className="text-xs text-[#FFD700] mt-1">ID: {complaint._id?.slice(-8)}</p>
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
                  <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <span className="font-bold" style={{ color: '#8B4513' }}>📍 {complaint.location}</span>
                    <span className="font-bold" style={{ color: '#8B4513' }}>📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedComplaint && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(47,27,10,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFD700] animate-fadeInUp"
            style={{ animation: 'fadeInUp 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative px-10 py-8 overflow-hidden flex justify-between items-center"
              style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)' }}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'
              }}/>
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h2 className="font-black uppercase tracking-widest text-xl text-white"
                    style={{ fontFamily: 'Georgia, serif' }}>
                    Complaint Details
                  </h2>
                  <p className="text-xs text-[#FFD700] mt-1">ID: {selectedComplaint._id}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="relative w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#2F1B0A] transition-all duration-200 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="h-2" style={{
              background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
            }}/>

            {/* Modal Body */}
            <div className="px-10 py-8 space-y-5" style={{ background: '#F5F5DC' }}>
              {/* Title */}
              <div className="border-b-2 border-[#D2691E] pb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Title</p>
                <p className="text-xl font-black" style={{ color: '#2F1B0A' }}>{selectedComplaint.title}</p>
              </div>

              {/* Description */}
              <div className="border-b-2 border-[#D2691E] pb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Description</p>
                <p className="text-gray-700 mt-1 leading-relaxed">{selectedComplaint.description}</p>
              </div>

              {/* Status & Urgency */}
              <div className="grid grid-cols-2 gap-4 border-b-2 border-[#D2691E] pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Status</p>
                  <span className={`inline-block mt-1 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                    selectedComplaint.status === 'open' ? 'bg-yellow-500 text-black' :
                    selectedComplaint.status === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Urgency</p>
                  <span className={`inline-block mt-1 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                    selectedComplaint.urgency === 'high' ? 'bg-red-500 text-white' :
                    selectedComplaint.urgency === 'medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
                  }`}>
                    {selectedComplaint.urgency}
                  </span>
                </div>
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-2 gap-4 border-b-2 border-[#D2691E] pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Location</p>
                  <p className="text-base font-bold mt-1" style={{ color: '#8B4513' }}>📍 {selectedComplaint.location}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Submitted On</p>
                  <p className="text-base font-bold mt-1" style={{ color: '#8B4513' }}>📅 {new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Category & Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Category</p>
                  <p className="text-base font-bold mt-1" style={{ color: '#D2691E' }}>{selectedComplaint.category || 'General'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Contact Preference</p>
                  <p className="text-base font-bold mt-1" style={{ color: '#D2691E' }}>{selectedComplaint.contactPreference || 'Email'}</p>
                </div>
              </div>

              {/* Photos if any */}
              {selectedComplaint.photos?.length > 0 && (
                <div className="pt-3">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>Attachments</p>
                  <p className="text-sm text-gray-600 mt-1">📸 {selectedComplaint.photos.length} photo(s) uploaded</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="h-2" style={{
              background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
            }}/>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default CitizenComplaintsList