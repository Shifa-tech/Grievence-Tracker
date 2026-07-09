import React, { useState, useEffect } from 'react'
import AddStaff from './AddStaff'

const Stripe = () => (
  <div className="h-2 rounded-full my-8" style={{
    background: 'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 20px,#FFD700 20px,#FFD700 40px,#2F1B0A 40px,#2F1B0A 60px,#FFD700 60px,#FFD700 80px)'
  }}/>
)

const CardHeader = ({ icon, title }) => (
  <div className="relative px-8 py-6 overflow-hidden flex items-center gap-4"
    style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513,#2F1B0A)' }}>
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: 'repeating-linear-gradient(45deg,#FFD700 0px,#FFD700 10px,transparent 10px,transparent 22px)'
    }}/>
    {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map(p =>
      <span key={p} className={`absolute ${p} text-[#FFD700] text-xs opacity-50`}>★</span>
    )}
    <div className="relative w-11 h-11 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg flex-shrink-0">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="relative font-black uppercase tracking-widest text-xl text-white"
      style={{ fontFamily: 'Georgia,serif', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
      {title}
    </h3>
  </div>
)

const RemoveModal = ({ member, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
    style={{ background: 'rgba(47,27,10,0.7)', backdropFilter: 'blur(4px)' }}>
    <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
      <CardHeader icon="⚠️" title="Remove Staff Member"/>
      <div className="px-10 py-10 space-y-6" style={{ background: '#F5F5DC' }}>
        <p className="text-center text-base font-bold leading-relaxed" style={{ color: '#5a3a1a' }}>
          Are you sure you want to remove{' '}
          <span className="font-black" style={{ color: '#2F1B0A' }}>{member.username}</span>?
          <br/>
          <span className="text-sm font-medium opacity-70">This action cannot be undone.</span>
        </p>
        <div className="flex gap-4 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border-2 font-black uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: '#D2691E', color: '#8B4513', background: 'rgba(245,245,220,0.6)' }}>
            Cancel
          </button>
          <button
            onClick={() => onConfirm(member._id)}
            className="flex-1 py-3 rounded-2xl border-2 font-black uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            style={{ background: 'linear-gradient(135deg,#DC3545,#a02030)', borderColor: '#ff6b6b', color: '#fff' }}>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
)

const StaffCard = ({ member, index, onRemove ,onEdit }) => (
  <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#8B4513] hover:-translate-y-1 transition-all duration-300 flex flex-col">

    {/* Card header */}
    <div className="relative px-8 py-7 overflow-hidden flex items-center gap-5"
      style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513,#2F1B0A)' }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg,#FFD700 0px,#FFD700 10px,transparent 10px,transparent 22px)'
      }}/>
      {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map(p =>
        <span key={p} className={`absolute ${p} text-[#FFD700] text-xs opacity-40`}>★</span>
      )}

      {/* Avatar */}
      <div className="relative w-14 h-14 rounded-full flex items-center justify-center border-3 border-[#FFD700] shadow-xl flex-shrink-0"
        style={{ background: 'radial-gradient(circle,#D2691E,#8B4513)', border: '3px solid #FFD700' }}>
        <span className="text-2xl">👤</span>
      </div>

      {/* Name + email */}
      <div className="relative flex-1 min-w-0">
        <h3 className="font-black uppercase tracking-wide text-lg leading-snug truncate"
          style={{ fontFamily: 'Georgia,serif', color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
          {member.username}
        </h3>
        <p className="text-xs mt-1 truncate font-medium" style={{ color: 'rgba(245,245,220,0.75)' }}>
          {member.email}
        </p>
      </div>

      {/* Index badge */}
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: '#FFD700', border: '2px solid #2F1B0A' }}>
        <span className="text-xs font-black" style={{ color: '#2F1B0A', fontFamily: 'Georgia,serif' }}>{index + 1}</span>
      </div>
    </div>

    {/* Card body */}
    <div className="flex-1 px-8 py-8 space-y-5" style={{ background: '#F5F5DC' }}>

      {/* Department */}
      <div className="flex items-center justify-between py-3 px-5 rounded-2xl border-2"
        style={{ background: 'rgba(139,69,19,0.05)', borderColor: '#D2691E' }}>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
          🏢 Department
        </span>
        <span className="text-sm font-bold" style={{ color: '#2F1B0A' }}>
          {member.department || 'General'}
        </span>
      </div>

      {/* Joined */}
      <div className="flex items-center justify-between py-3 px-5 rounded-2xl border-2"
        style={{ background: 'rgba(139,69,19,0.05)', borderColor: '#D2691E' }}>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
          🗓 Joined
        </span>
        <span className="text-sm font-bold" style={{ color: '#2F1B0A' }}>
          {new Date(member.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between py-3 px-5 rounded-2xl border-2"
        style={{ background: 'rgba(139,69,19,0.05)', borderColor: '#D2691E' }}>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>
          ⚡ Status
        </span>
        <span className="flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 bg-green-50 text-green-700 border-green-300">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"/>
          Active
        </span>
      </div>
    </div>

    {/* Card footer — actions */}
    <div className="px-8 pb-8 pt-2 flex gap-4" style={{ background: '#F5F5DC' }}>
      <button
        onClick={() => onEdit(member)}  
        className="flex-1 py-3 rounded-2xl border-2 font-black uppercase tracking-widest text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ borderColor: '#8B4513', color: '#8B4513', background: 'rgba(139,69,19,0.06)' }}>
        ✏️ Edit
      </button>
      <button
        onClick={() => onRemove(member)}
        className="flex-1 py-3 rounded-2xl border-2 font-black uppercase tracking-widest text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ borderColor: '#DC3545', color: '#DC3545', background: 'rgba(220,53,69,0.05)' }}>
        🗑 Remove
      </button>
    </div>
  </div>
)

const StaffList = ({ isTrue , onModalClose}) => {
  const [staff, setStaff]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [removeTarget, setRemoveTarget] = useState(null)
  const [editingMember, setEditingMember] = useState(null)

  useEffect(() => { fetchStaff() }, [])

  useEffect(() => {
    if (isTrue) {
      setShowAddModal(true)
      if (onModalClose) {
        onModalClose()
      }
    }
  }, [isTrue, onModalClose])

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/user/staff')
      const data     = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStaff = (updatedMember) => {
    setStaff(prev => prev.map(m => 
      m._id === updatedMember._id ? updatedMember : m
    ))
  }

  const handleAddStaff = async (staffData) => {
    console.log('Received in handleAddStaff:', staffData)
    if (!staffData || !staffData.username || !staffData.email || !staffData.password) {
      console.error('Missing required fields:', staffData)
      alert('Please fill all required fields')
      return
    }
    try {
      const response = await fetch('/api/user/create-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...staffData, role: 'staff' })
      })
      const data = await response.json()
      console.log(data)
      if (data.success && response.ok) {
        fetchStaff()
        setShowAddModal(false)
      }
    } catch (error) {
      console.error('Error adding staff:', error)
    }
  }

  const handleRemoveConfirm = async (memberId) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`/api/user/staff/${memberId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        setStaff(prev => prev.filter(m => m._id !== memberId))
        alert('Staff member removed successfully')
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to remove staff')
      }
    } catch (error) {
      console.error('Error removing staff:', error)
      alert('Network error. Please try again.')
    } finally {
      setRemoveTarget(null)
    }
  }

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5" style={{ background: '#F5F5DC' }}>
      <span className="text-6xl animate-spin">🎠</span>
      <p className="font-black uppercase tracking-widest text-lg" style={{ color: '#8B4513' }}>Loading Staff…</p>
    </div>
  )

  return (
    <div className="min-h-screen p-10 md:p-14" style={{ background: '#F5F5DC' }}>

      {/* ── Page title ── */}
      <div className="mb-12">
        <div className="h-3 rounded-full mb-10" style={{
          background: 'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 24px,#FFD700 24px,#FFD700 48px,#2F1B0A 48px,#2F1B0A 72px,#FFD700 72px,#FFD700 96px)'
        }}/>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Left — title */}
          <div className="flex items-center gap-6">
            <div className="w-18 h-18 rounded-full flex items-center justify-center border-4 border-[#FFD700] shadow-2xl"
              style={{ width: '72px', height: '72px', background: 'radial-gradient(circle,#D2691E,#8B4513)' }}>
              <span className="text-3xl">👔</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase"
                style={{ fontFamily: 'Georgia,serif', color: '#2F1B0A', textShadow: '3px 3px 0px #FFD700', letterSpacing: '0.08em' }}>
                Staff
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest mt-1.5" style={{ color: '#8B4513' }}>
                ✦ Team Management Panel ✦
              </p>
            </div>
          </div>

          {/* Right — Add button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg"
            style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513)', color: '#FFD700', fontFamily: 'Georgia,serif' }}>
            <span className="text-xl">＋</span>
            Add New Staff
          </button>
        </div>
      </div>

      {/* ── Count summary pill ── */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full border-2"
          style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513)', borderColor: '#FFD700' }}>
          <span className="text-sm font-black uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.7)' }}>Total Staff</span>
          <span className="text-2xl font-black" style={{ fontFamily: 'Georgia,serif', color: '#FFD700' }}>{staff.length}</span>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-full border-2 bg-green-50 text-green-700 border-green-300">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"/>
          <span className="text-xs font-black uppercase tracking-widest">{staff.length} Active</span>
        </div>
      </div>

      <Stripe/>

      {/* ── Staff grid ── */}
      {staff && staff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-12">
          {staff.map((member, i) => (
            <StaffCard
              key={member._id}
              member={member}
              index={i}
              onRemove={setRemoveTarget}
              onEdit={setEditingMember} 
            />
          ))}
        </div>
      ) : (
        /* ── Empty state ── */
        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          <CardHeader icon="🎪" title="No Staff Members"/>
          <div className="flex flex-col items-center justify-center gap-6 py-24 px-10" style={{ background: '#F5F5DC' }}>
            <span className="text-7xl">👔</span>
            <p className="font-black uppercase tracking-widest text-center text-lg" style={{ color: '#8B4513' }}>
              No staff members found.
            </p>
            <p className="text-sm font-medium text-center max-w-xs" style={{ color: '#5a3a1a' }}>
              Get started by adding your first team member to the roster.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 flex items-center gap-3 px-10 py-4 rounded-2xl border-2 border-[#FFD700] font-black uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-lg"
              style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513)', color: '#FFD700', fontFamily: 'Georgia,serif' }}>
              <span className="text-xl">＋</span>
              Add Your First Staff Member
            </button>
          </div>
        </div>
      )}

      {/* ── Add staff modal ── */}
      {showAddModal && (
        <AddStaff onClose={() => setShowAddModal(false)} onAdd={handleAddStaff}/>
      )}

      {/* ── Remove confirmation modal ── */}
      {removeTarget && (
        <RemoveModal
          member={removeTarget}
          onConfirm={handleRemoveConfirm}
          onCancel={() => setRemoveTarget(null)}
        />
      )}

      {editingMember && (
        <AddStaff
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onUpdate={handleUpdateStaff}
        />
      )}

    </div>
  )
}

export default StaffList