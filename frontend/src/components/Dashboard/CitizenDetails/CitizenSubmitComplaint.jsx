// frontend/src/components/Dashboard/CitizenDetails/CitizenSubmitComplaint.jsx
import React, { useState } from 'react'
import ComplaintForm from '../../Forms/ComplaintForm'

const CitizenSubmitComplaint = ({ user }) => {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-5xl">✅</span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
            Complaint Submitted!
          </h2>
          <p className="text-gray-600 mb-8">Your issue has been logged. Our team will review it shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', color: '#FFD700' }}
          >
            ✏️ Submit Another Complaint
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-3xl">✏️</span>
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
              Submit Complaint
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
              ✦ Report an issue to the circus crew ✦
            </p>
          </div>
        </div>
        <div className="h-2 rounded-full mt-6" style={{
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
        }} />
      </div>

      <div className="mt-8">
        <ComplaintForm userId={user?.id} onSubmitSuccess={() => setSubmitted(true)} />
      </div>
    </div>
  )
}

export default CitizenSubmitComplaint