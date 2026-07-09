import React, { useState, useEffect } from 'react'

const Stripe = () => (
  <div className="h-2 rounded-full my-6" style={{
    background: 'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 20px,#FFD700 20px,#FFD700 40px,#2F1B0A 40px,#2F1B0A 60px,#FFD700 60px,#FFD700 80px)'
  }}/>
)

const CardHeader = ({ icon, title }) => (
  <div className="relative px-8 py-5 overflow-hidden flex items-center gap-3"
    style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513,#2F1B0A)' }}>
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: 'repeating-linear-gradient(45deg,#FFD700 0px,#FFD700 10px,transparent 10px,transparent 22px)'
    }}/>
    {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map(p =>
      <span key={p} className={`absolute ${p} text-[#FFD700] text-xs opacity-50`}>★</span>
    )}
    <div className="relative w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg flex-shrink-0">
      <span className="text-xl">{icon}</span>
    </div>
    <h3 className="relative font-black uppercase tracking-widest text-lg text-white"
      style={{ fontFamily: 'Georgia,serif', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
      {title}
    </h3>
  </div>
)

const STATUS_META = {
  open:        { label: 'Pending',     icon: '⏳', bg: '#fffbeb', border: '#fde68a', text: '#b8860b', dot: '#FFC107' },
  'in-progress':{ label: 'In Progress', icon: '⚙️', bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', dot: '#3B82F6' },
  resolved:    { label: 'Resolved',    icon: '✅', bg: '#f0fdf4', border: '#86efac', text: '#15803d', dot: '#28A745' },
}

const URGENCY_META = {
  high:   { label: 'High',   bar: '#DC3545', light: '#fff5f5', border: 'border-red-400',    badge: 'bg-red-100 text-red-700 border-red-300' },
  medium: { label: 'Medium', bar: '#FFC107', light: '#fffbeb', border: 'border-yellow-400', badge: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  low:    { label: 'Low',    bar: '#28A745', light: '#f0fdf4', border: 'border-green-400',  badge: 'bg-green-100 text-green-700 border-green-300' },
}

const getStatusMeta  = s => STATUS_META[s]  || { label: s,  icon: '❓', bg: '#f9f9f9', border: '#ccc', text: '#555', dot: '#aaa' }
const getUrgencyMeta = u => URGENCY_META[u] || { label: u, bar: '#8B4513', light: '#F5F5DC', border: 'border-[#8B4513]', badge: 'bg-gray-100 text-gray-700 border-gray-300' }

const ComplaintCard = ({ complaint, index, currentPage, pageSize }) => {
  const globalIndex = (currentPage - 1) * pageSize + index + 1
  const sm = getStatusMeta(complaint.status)
  const um = getUrgencyMeta(complaint.urgency)

  return (
    <div className={`rounded-3xl overflow-hidden shadow-xl border-2 border-[#8B4513] hover:-translate-y-1 transition-all duration-300`}>
      {/* top accent bar (urgency colour) */}
      <div className="h-1.5" style={{ background: um.bar }}/>

      <div className="px-8 py-6" style={{ background: '#F5F5DC' }}>

        {/* Row 1 — index badge + title + status pill */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            {/* index badge */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#FFD700] shadow"
              style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513)' }}>
              <span className="text-xs font-black text-[#FFD700]" style={{ fontFamily: 'Georgia,serif' }}>
                {globalIndex}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-wide leading-snug"
                style={{ fontFamily: 'Georgia,serif', color: '#2F1B0A' }}>
                {complaint.title}
              </h3>
              <p className="text-xs font-bold mt-0.5 tracking-widest uppercase" style={{ color: '#8B4513' }}>
                ID: {complaint._id}
              </p>
            </div>
          </div>

          {/* status pill */}
          <span className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2"
            style={{ background: sm.bg, borderColor: sm.border, color: sm.text }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: sm.dot }}/>
            {sm.label}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: 'repeating-linear-gradient(90deg,#D2691E 0px,#D2691E 8px,transparent 8px,transparent 16px)', opacity: 0.3 }}/>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#5a3a1a' }}>
          {complaint.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3">
          {/* Location */}
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2"
            style={{ background: 'rgba(139,69,19,0.06)', borderColor: '#D2691E', color: '#8B4513' }}>
            📍 {complaint.location}
          </span>

          {/* Urgency */}
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${um.badge}`}>
            ⚡ {um.label} Urgency
          </span>

          {/* Date */}
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 ml-auto"
            style={{ background: 'rgba(47,27,10,0.05)', borderColor: '#8B4513', color: '#8B4513' }}>
            🗓 {new Date(complaint.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const delta = 2
    const left  = Math.max(2, currentPage - delta)
    const right = Math.min(totalPages - 1, currentPage + delta)

    pages.push(1)
    if (left > 2) pages.push('…')
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPages - 1) pages.push('…')
    if (totalPages > 1) pages.push(totalPages)
    return pages
  }

  const btnBase = "w-10 h-10 flex items-center justify-center rounded-full text-sm font-black transition-all duration-200 border-2"

  return (
    <div className="flex items-center justify-center gap-2 pt-6 pb-2 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1
          ? 'opacity-30 cursor-not-allowed border-[#D2691E] text-[#8B4513]'
          : 'border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FFD700] hover:-translate-y-0.5'}`}
        style={{ background: currentPage === 1 ? 'transparent' : undefined }}
      >‹</button>

      {getPages().map((p, i) =>
        p === '…'
          ? <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-[#8B4513] font-bold select-none">…</span>
          : <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${btnBase} ${p === currentPage
                ? 'text-[#FFD700] border-[#FFD700] shadow-lg scale-110'
                : 'border-[#D2691E] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FFD700] hover:-translate-y-0.5'}`}
              style={p === currentPage ? { background: 'linear-gradient(135deg,#2F1B0A,#8B4513)' } : { background: 'rgba(245,245,220,0.8)' }}
            >{p}</button>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages
          ? 'opacity-30 cursor-not-allowed border-[#D2691E] text-[#8B4513]'
          : 'border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FFD700] hover:-translate-y-0.5'}`}
        style={{ background: currentPage === totalPages ? 'transparent' : undefined }}
      >›</button>
    </div>
  )
}

const PAGE_SIZE = 10

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('all')
  const [sortBy, setSortBy]         = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => { fetchComplaints() }, [])

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaint')
      const data     = await response.json()
      setComplaints(data)
    } catch (error) {
      console.error('Error fetching complaints:', error)
    } finally {
      setLoading(false)
    }
  }

  // Reset to page 1 on filter/sort change
  const handleFilter = v => { setFilter(v); setCurrentPage(1) }
  const handleSort   = v => { setSortBy(v); setCurrentPage(1) }

  // Filter
  const filtered = complaints.filter(c => filter === 'all' || c.status === filter)

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'newest':  return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':  return new Date(a.createdAt) - new Date(b.createdAt)
      case 'urgency': {
        const order = { high: 0, medium: 1, low: 2 }
        return (order[a.urgency] ?? 3) - (order[b.urgency] ?? 3)
      }
      case 'status': {
        const order = { open: 0, 'in-progress': 1, resolved: 2 }
        return (order[a.status] ?? 3) - (order[b.status] ?? 3)
      }
      default: return 0
    }
  })

  // Paginate
  const totalPages  = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paginated   = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const counts = {
    all:          complaints.length,
    open:         complaints.filter(c => c.status === 'open').length,
    'in-progress':complaints.filter(c => c.status === 'in-progress').length,
    resolved:     complaints.filter(c => c.status === 'resolved').length,
  }

  const FILTER_TABS = [
    { key: 'all',          label: 'All',         icon: '📋' },
    { key: 'open',         label: 'Pending',      icon: '⏳' },
    { key: 'in-progress',  label: 'In Progress',  icon: '⚙️' },
    { key: 'resolved',     label: 'Resolved',     icon: '✅' },
  ]

  const SORT_OPTIONS = [
    { value: 'newest',  label: 'Newest First' },
    { value: 'oldest',  label: 'Oldest First' },
    { value: 'urgency', label: 'By Urgency'   },
    { value: 'status',  label: 'By Status'    },
  ]

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#F5F5DC' }}>
      <span className="text-5xl animate-spin">🎠</span>
      <p className="font-black uppercase tracking-widest" style={{ color: '#8B4513' }}>Loading Complaints…</p>
    </div>
  )

  return (
    <div className="min-h-screen p-8 md:p-12" style={{ background: '#F5F5DC' }}>

      {/* ── Page title ── */}
      <div className="mb-10">
        <div className="h-3 rounded-full mb-8" style={{
          background: 'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 24px,#FFD700 24px,#FFD700 48px,#2F1B0A 48px,#2F1B0A 72px,#FFD700 72px,#FFD700 96px)'
        }}/>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#FFD700] shadow-xl"
            style={{ background: 'radial-gradient(circle,#D2691E,#8B4513)' }}>
            <span className="text-3xl">📣</span>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase"
              style={{ fontFamily: 'Georgia,serif', color: '#2F1B0A', textShadow: '3px 3px 0px #FFD700', letterSpacing: '0.08em' }}>
              Complaints
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: '#8B4513' }}>
              ✦ Admin Review Panel ✦
            </p>
          </div>
        </div>
      </div>

      {/* ── Controls card ── */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513] mb-10">
        <CardHeader icon="🎛️" title="Filter & Sort"/>

        <div className="px-8 py-8" style={{ background: '#F5F5DC' }}>

          {/* Filter tabs */}
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#8B4513' }}>— Filter by Status</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {FILTER_TABS.map(({ key, label, icon }) => {
              const active = filter === key
              return (
                <button
                  key={key}
                  onClick={() => handleFilter(key)}
                  className="relative flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border-2 font-black uppercase tracking-wider text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={active
                    ? { background: 'linear-gradient(135deg,#2F1B0A,#8B4513)', borderColor: '#FFD700', color: '#FFD700' }
                    : { background: 'rgba(245,245,220,0.6)', borderColor: '#D2691E', color: '#8B4513' }
                  }
                >
                  <span className="text-xl">{icon}</span>
                  <span style={{ fontFamily: 'Georgia,serif' }}>{label}</span>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2"
                    style={active
                      ? { background: '#FFD700', borderColor: '#8B4513', color: '#2F1B0A' }
                      : { background: '#8B4513', borderColor: '#FFD700', color: '#FFD700' }
                    }>
                    {counts[key]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Sort row */}
          <div className="h-px mb-6" style={{ background: 'repeating-linear-gradient(90deg,#D2691E 0,#D2691E 8px,transparent 8px,transparent 16px)', opacity: 0.3 }}/>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs font-black uppercase tracking-widest whitespace-nowrap" style={{ color: '#8B4513' }}>— Sort by:</p>
            <div className="flex flex-wrap gap-3">
              {SORT_OPTIONS.map(({ value, label }) => {
                const active = sortBy === value
                return (
                  <button
                    key={value}
                    onClick={() => handleSort(value)}
                    className="px-5 py-2 rounded-full border-2 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
                    style={active
                      ? { background: 'linear-gradient(135deg,#8B4513,#D2691E)', borderColor: '#FFD700', color: '#FFD700' }
                      : { background: 'rgba(245,245,220,0.6)', borderColor: '#D2691E', color: '#8B4513' }
                    }
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Stripe/>

      {/* ── Results header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 my-8">
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>
          Showing <span className="font-black" style={{ color: '#2F1B0A' }}>{sorted.length}</span> complaint{sorted.length !== 1 ? 's' : ''}
          {filter !== 'all' && <> — <span className="capitalize">{filter.replace('-',' ')}</span></>}
        </p>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8B4513' }}>
          Page <span className="font-black" style={{ color: '#2F1B0A' }}>{currentPage}</span> of {totalPages}
        </p>
      </div>

      {paginated.length === 0
        ? (
          <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#8B4513]">
            <CardHeader icon="🔍" title="No Results"/>
            <div className="flex flex-col items-center justify-center gap-4 py-20 px-8" style={{ background: '#F5F5DC' }}>
              <span className="text-6xl">🎪</span>
              <p className="font-black uppercase tracking-widest text-center" style={{ color: '#8B4513' }}>
                No complaints match the current filter.
              </p>
              <button onClick={() => handleFilter('all')}
                className="mt-2 px-8 py-3 rounded-full border-2 border-[#FFD700] font-black uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#2F1B0A,#8B4513)', color: '#FFD700' }}>
                Show All
              </button>
            </div>
          </div>
        )
        : (
          <div className="space-y-6">
            {paginated.map((complaint, i) => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                index={i}
                currentPage={currentPage}
                pageSize={PAGE_SIZE}
              />
            ))}
          </div>
        )
      }

      {sorted.length > PAGE_SIZE && (
        <>
          <Stripe/>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={p => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          />
          <p className="text-center text-xs font-bold uppercase tracking-widest mt-3" style={{ color: '#8B4513' }}>
            ✦ {PAGE_SIZE} complaints per page ✦
          </p>
        </>
      )}
    </div>
  )
}

export default ComplaintsList