import React, { useState, useEffect } from 'react'

const DEPARTMENTS = [
  { value: 'road-damage',   label: 'Road Damage',  icon: '🛣️' },
  { value: 'water-leakage', label: 'Sanitation',   icon: '🚰' },
  { value: 'garbage',       label: 'Garbage',      icon: '🗑️' },
  { value: 'safety',        label: 'Security',     icon: '🛡️' },
  { value: 'electrical',    label: 'Electrical',   icon: '⚡' },
]

const AddStaff = ({ onClose, onAdd, member = null, onUpdate }) => {
  const isEditMode = !!member
  
  const [formData, setFormData] = useState({
    username:   '',
    email:      '',
    password:   '',
    department: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (member) {
      setFormData({
        username: member.username || '',
        email: member.email || '',
        password: '', // Password field empty for edit (optional)
        department: member.department || ''
      })
    }
  }, [member])

  const field = (key, value) => setFormData(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.email) {
      alert('Please fill all required fields')
      return
    }
    
    if (!isEditMode && !formData.password) {
      alert('Password is required for new staff')
      return
    }
    
    setLoading(true)
    
    try {
      const token = localStorage.getItem('accessToken')
      let response
      
      if (isEditMode) {
        // Update existing staff
        response = await fetch(`/api/user/staff/${member._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            department: formData.department,
            ...(formData.password && { password: formData.password }) // Only send password if changed
          })
        })
      } else {
        // Create new staff
        response = await fetch('/api/user/create-staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role: 'staff' })
        })
      }
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        alert(isEditMode ? 'Staff member updated successfully!' : 'Staff member added successfully!')
        if (isEditMode && onUpdate) {
          onUpdate(data.staff || data.data)
        } else if (onAdd) {
          onAdd(formData)
        }
        // Reset form
        setFormData({ username: '', email: '', password: '', department: '' })
        setShowPassword(false)
        onClose()
      } else {
        alert(data.message || (isEditMode ? 'Failed to update staff' : 'Failed to add staff'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedDept = DEPARTMENTS.find(d => d.value === formData.department)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(47,27,10,0.75)', backdropFilter: 'blur(6px)' }}
    >
      <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]"
        style={{ maxHeight: '95vh', overflowY: 'auto' }}>

        <div className="relative px-10 py-7 overflow-hidden flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513,#2F1B0A)' }}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg,#FFD700 0px,#FFD700 10px,transparent 10px,transparent 22px)'
          }}/>
          {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map(p =>
            <span key={p} className={`absolute ${p} text-[#FFD700] text-xs opacity-50`}>★</span>
          )}

          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg">
              <span className="text-2xl">{isEditMode ? '✏️' : '👤'}</span>
            </div>
            <div>
              <h2 className="font-black uppercase tracking-widest text-xl text-white"
                style={{ fontFamily: 'Georgia,serif', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                {isEditMode ? 'Edit Staff' : 'Add New Staff'}
              </h2>
              <p className="text-xs font-bold mt-0.5 tracking-widest" style={{ color: 'rgba(255,215,0,0.65)' }}>
                ✦ {isEditMode ? 'Update member details' : 'Fill in member details below'} ✦
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#FFD700] font-black text-[#FFD700] hover:bg-[#FFD700] hover:text-[#2F1B0A] transition-all duration-200 text-lg"
          >✕</button>
        </div>

        <div className="h-2" style={{
          background: 'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 20px,#FFD700 20px,#FFD700 40px,#2F1B0A 40px,#2F1B0A 60px,#FFD700 60px,#FFD700 80px)'
        }}/>

        <form onSubmit={handleSubmit}>
          <div className="px-10 py-10 space-y-8" style={{ background: '#F5F5DC' }}>

            {/* Username */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                style={{ color: '#8B4513' }}>
                <span className="w-6 h-6 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-xs">1</span>
                Username <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name…"
                value={formData.username}
                onChange={e => field('username', e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 text-sm font-bold outline-none transition-all duration-200"
                style={{
                  background: '#fff',
                  borderColor: formData.username ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                style={{ color: '#8B4513' }}>
                <span className="w-6 h-6 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-xs">2</span>
                Email Address <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="staff@example.com"
                value={formData.email}
                onChange={e => field('email', e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 text-sm font-bold outline-none transition-all duration-200"
                style={{
                  background: '#fff',
                  borderColor: formData.email ? '#8B4513' : '#D2691E',
                  color: '#2F1B0A'
                }}
              />
            </div>

            {/* Password - optional in edit mode */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                style={{ color: '#8B4513' }}>
                <span className="w-6 h-6 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-xs">3</span>
                Password {!isEditMode && <span className="text-red-500 ml-1">*</span>}
                {isEditMode && <span className="text-xs font-normal ml-2">(leave blank to keep current)</span>}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isEditMode ? "Enter new password (optional)…" : "Create a secure password…"}
                  value={formData.password}
                  onChange={e => field('password', e.target.value)}
                  className="w-full px-6 py-4 pr-14 rounded-2xl border-2 text-sm font-bold outline-none transition-all duration-200"
                  style={{
                    background: '#fff',
                    borderColor: '#D2691E',
                    color: '#2F1B0A'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg opacity-60 hover:opacity-100 transition-opacity"
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Department */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                style={{ color: '#8B4513' }}>
                <span className="w-6 h-6 rounded-full bg-[#8B4513] flex items-center justify-center text-[#FFD700] text-xs">4</span>
                Department
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => field('department', '')}
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: !formData.department ? 'linear-gradient(135deg,#2F1B0A,#8B4513)' : 'rgba(245,245,220,0.6)',
                    borderColor: !formData.department ? '#FFD700' : '#D2691E',
                    color: !formData.department ? '#FFD700' : '#8B4513'
                  }}>
                  <span className="text-lg">🏢</span>
                  <span className="text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'Georgia,serif' }}>
                    General
                  </span>
                </button>

                {DEPARTMENTS.map(dept => {
                  const active = formData.department === dept.value
                  return (
                    <button
                      key={dept.value}
                      type="button"
                      onClick={() => field('department', dept.value)}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: active ? 'linear-gradient(135deg,#2F1B0A,#8B4513)' : 'rgba(245,245,220,0.6)',
                        borderColor: active ? '#FFD700' : '#D2691E',
                        color: active ? '#FFD700' : '#8B4513'
                      }}>
                      <span className="text-lg">{dept.icon}</span>
                      <span className="text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'Georgia,serif' }}>
                        {dept.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {selectedDept && (
                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 mt-1"
                  style={{ background: 'rgba(139,69,19,0.06)', borderColor: '#D2691E' }}>
                  <span className="text-sm">{selectedDept.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
                    Selected: {selectedDept.label}
                  </span>
                </div>
              )}
            </div>

            <div className="h-1.5 rounded-full" style={{
              background: 'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 20px,#FFD700 20px,#FFD700 40px,#2F1B0A 40px,#2F1B0A 60px,#FFD700 60px,#FFD700 80px)'
            }}/>

            <div className="flex gap-5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: '#D2691E', color: '#8B4513', background: 'rgba(139,69,19,0.05)' }}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 flex-grow-[2] py-4 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513)', color: '#FFD700', fontFamily: 'Georgia,serif' }}>
                {loading ? '⏳ Saving...' : (isEditMode ? '✏️ Update Staff' : '＋ Add Staff Member')}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStaff