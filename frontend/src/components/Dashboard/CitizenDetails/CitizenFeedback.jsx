// frontend/src/components/Dashboard/CitizenDetails/CitizenFeedback.jsx
import React, { useState } from 'react'

const CitizenFeedback = ({ user }) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hover, setHover] = useState(0)

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user?.id,
          username: user?.username,
          rating,
          feedback,
          date: new Date().toISOString()
        })
      })
      
      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setRating(0)
          setFeedback('')
        }, 3000)
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback')
    }
  }

  return (
    <div className="min-h-screen p-12" style={{ background: '#F5F5DC' }}>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
            <span className="text-3xl">💬</span>
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#2F1B0A' }}>
              Your Feedback
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
              ✦ Help us improve the circus experience ✦
            </p>
          </div>
        </div>
        <div className="h-2 rounded-full mt-6" style={{
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
        }} />
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-6 p-6 rounded-2xl border-2 border-green-500 bg-green-50 text-green-700 text-center">
          <span className="text-3xl block mb-2">🎉</span>
          <p className="font-bold">Thank you for your feedback!</p>
          <p className="text-sm">Your input helps us serve you better.</p>
        </div>
      )}

      {/* Feedback Card */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          
          <div className="relative px-10 py-8 overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)' }}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'
            }} />
            <div className="relative">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
                style={{ background: 'radial-gradient(circle, #D2691E, #8B4513)' }}>
                <span className="text-4xl">🎪</span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-white"
                style={{ fontFamily: 'Georgia, serif' }}>
                Share Your Experience
              </h2>
              <p className="text-sm text-[#FFD700] mt-2">We value your opinion</p>
            </div>
          </div>

          <div className="px-10 py-10" style={{ background: '#F5F5DC' }}>

            {/* Star Rating */}
            <div className="mb-8 text-center">
              <label className="block text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#8B4513' }}>
                ✦ How would you rate our service? ✦
              </label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="text-4xl transition-all duration-200 hover:scale-110"
                  >
                    <span style={{ color: (hover || rating) >= star ? '#FFD700' : '#D2691E' }}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-sm mt-3" style={{ color: '#8B4513' }}>
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent!"}
              </p>
            </div>

            {/* Feedback Text */}
            <div className="mb-8">
              <label className="block text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8B4513' }}>
                ✦ Your Feedback ✦
              </label>
              <textarea
                rows="5"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience with the grievance system..."
                className="w-full px-6 py-4 rounded-2xl border-2 text-base outline-none transition-all duration-200 resize-none"
                style={{
                  background: '#fff',
                  borderColor: feedback ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
              />
            </div>

            <div className="h-1.5 rounded-full my-8" style={{
              background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
            }} />

            <button
              onClick={handleSubmit}
              className="w-full py-5 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', color: '#FFD700', fontFamily: 'Georgia, serif' }}
            >
              📢 Submit Feedback
            </button>
          </div>

          <div className="h-2" style={{
            background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'
          }} />
        </div>
      </div>
    </div>
  )
}

export default CitizenFeedback