import React, { useState } from 'react'
import CitizenHomePanel from './CitizenDetails/CitizenHomePanel'
import CitizenComplaintsList from './CitizenDetails/CitizenComplaintsList'
import CitizenSubmitComplaint from './CitizenDetails/CitizenSubmitComplaint'
import CitizenFeedback from './CitizenDetails/CitizenFeedback'
import PaymentPage from './CitizenDetails/PaymentPage'

const NAV_ITEMS = [
  { tab: 'dashboard',   icon: '🎪', label: 'Dashboard'        },
  { tab: 'complaints',  icon: '📋', label: 'My Complaints'    },
  { tab: 'submit',      icon: '✏️', label: 'Submit Complaint' },
  { tab: 'feedback',    icon: '💬', label: 'Feedback'         },
  { tab: 'donate',      icon: '💰', label: 'Support Us'       }
]

const CitizenDashboard = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  const goToSubmitComplaint = () => setActiveTab('submit')
  const goToTrackComplaint = () => setActiveTab('complaints')

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#F5F5DC' }}>

      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 overflow-hidden transition-all duration-300 ease-in-out z-10 shadow-2xl"
        style={{
          width: sidebarOpen ? '260px' : '72px',
          background: 'linear-gradient(180deg, #2F1B0A 0%, #8B4513 50%, #2F1B0A 100%)',
          borderRight: '3px solid #FFD700',
        }}
      >
        {/* Logo row */}
        <div className="relative flex items-center justify-between px-4 py-5 flex-shrink-0"
          style={{ borderBottom: '2px solid rgba(255,215,0,0.3)' }}>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 12px, transparent 12px, transparent 24px)' }} />

          {sidebarOpen && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: '#FFD700', border: '2px solid #8B4513' }}>
                <span className="text-lg">🎪</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-black uppercase tracking-widest text-sm leading-tight whitespace-nowrap"
                  style={{ fontFamily: 'Georgia, serif', color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Citizen Panel
                </p>
                <p className="text-xs whitespace-nowrap" style={{ color: 'rgba(255,215,0,0.5)' }}>✦ Circus Family ✦</p>
              </div>
            </div>
          )}

          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
            style={{ background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700' }}>
            <span className="text-sm font-bold">{sidebarOpen ? '←' : '→'}</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map(({ tab, icon, label }) => {
            const active = activeTab === tab
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 group relative overflow-hidden"
                style={{
                  padding: sidebarOpen ? '10px 14px' : '10px',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  background: active ? 'rgba(255,215,0,0.18)' : 'transparent',
                  border: active ? '1px solid rgba(255,215,0,0.5)' : '1px solid transparent',
                }}>
                {active && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full" style={{ background: '#FFD700' }} />
                )}
                <span className="text-lg flex-shrink-0" title={!sidebarOpen ? label : ''}>{icon}</span>
                {sidebarOpen && (
                  <span className="font-bold uppercase tracking-wider text-sm whitespace-nowrap"
                    style={{ color: active ? '#FFD700' : 'rgba(245,245,220,0.75)', fontFamily: 'Georgia, serif' }}>
                    {label}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="px-4 py-4 flex-shrink-0" style={{ borderTop: '2px solid rgba(255,215,0,0.2)' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30">
              <span className="text-sm">🎪</span>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#FFD700' }}>
                Role: Citizen
              </span>
            </div>
            <div className="h-1 rounded-full mt-3" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 10px, #FFD700 10px, #FFD700 20px, #2F1B0A 20px, #2F1B0A 30px)' }} />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 py-4 shadow-md"
          style={{ background: 'linear-gradient(90deg, #2F1B0A, #8B4513)', borderBottom: '3px solid #FFD700' }}>
          <div>
            <h1 className="text-2xl" style={{ color: 'rgba(255,215,0,0.5)' }}>✦ Citizen Experience Portal ✦</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-lg"
              style={{ background: '#FFD700', color: '#2F1B0A', border: '2px solid #8B4513' }}>
              {user?.username?.[0]?.toUpperCase() || 'C'}
            </div>
            <span className="text-sm font-bold hidden md:block" style={{ color: '#F5F5DC' }}>
              {user?.username || 'Citizen'}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <CitizenHomePanel user={user} onGoToSubmit={goToSubmitComplaint}
              onGoToTrack={goToTrackComplaint} />}
          {activeTab === 'complaints' && <CitizenComplaintsList user={user} />}
          {activeTab === 'submit' && <CitizenSubmitComplaint user={user} />}
          {activeTab === 'feedback' && <CitizenFeedback user={user} />}
          {activeTab === 'donate' && <PaymentPage user={user} />}
        </main>
      </div>
    </div>
  )
}

export default CitizenDashboard