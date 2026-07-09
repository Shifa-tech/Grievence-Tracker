import React, { useState } from 'react'
import StaffList from './AdminDetails/StaffList'
import ComplaintsList from './AdminDetails/ComplaintList'
import AdminHomePanel from './AdminDetails/AdminHomePanel'
import SettingsPanel from './AdminDetails/SettingsPanel'
import StatisticsPanel from './AdminDetails/StatisticsPanel'

const NAV_ITEMS = [
  { tab: 'dashboard',   icon: '🎪', label: 'Dashboard'       },
  { tab: 'statistics',  icon: '📊', label: 'Statistics'       },
  { tab: 'complaints',  icon: '📋', label: 'View Complaints'  },
  { tab: 'staff',       icon: '👥', label: 'View Staffs'      },
  { tab: 'settings',    icon: '⚙️', label: 'Settings'         },
]

const AdminDashboard = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab]     = useState('dashboard')
  const [value, changeValue]          = useState(false)             //This state is for quick action of adding staff it turns addstaffmodel value to true when its true
                                                                    //So directly adding staff

  const openAddStaffModal = () => { changeValue(true); setActiveTab('staff') }

   const goToStaffTab = () => {
    changeValue(false)  // Reset modal state
    setActiveTab('staff')
  }

  const goToComplaintsTab = () => {
    changeValue(false)  // Reset modal state
    setActiveTab('complaints')
  }

  const goToSettingsTab = () => {
    changeValue(false)  // Reset modal state
    setActiveTab('settings')
  }

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{background: '#F5F5DC'}}>

      {/* ── Sidebar ── */}
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
          style={{borderBottom: '2px solid rgba(255,215,0,0.3)'}}>
          {/* Stripe accent */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40"
            style={{backgroundImage: 'repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 12px, transparent 12px, transparent 24px)'}} />

          {sidebarOpen && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{background: '#FFD700', border: '2px solid #8B4513'}}>
                <span className="text-lg">🎠</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-black uppercase tracking-widest text-sm leading-tight whitespace-nowrap"
                  style={{fontFamily: 'Georgia, serif', color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                  Admin Panel
                </p>
                <p className="text-xs whitespace-nowrap" style={{color: 'rgba(255,215,0,0.5)'}}>✦ Grand Circus ✦</p>
              </div>
            </div>
          )}

          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
            style={{background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700'}}>
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
                {/* Active left bar */}
                {active && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full" style={{background: '#FFD700'}} />
                )}
                <span className="text-lg flex-shrink-0" title={!sidebarOpen ? label : ''}>{icon}</span>
                {sidebarOpen && (
                  <span className="font-bold uppercase tracking-wider text-sm whitespace-nowrap"
                    style={{color: active ? '#FFD700' : 'rgba(245,245,220,0.75)', fontFamily: 'Georgia, serif'}}>
                    {label}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="px-4 py-4 flex-shrink-0" style={{borderTop: '2px solid rgba(255,215,0,0.2)'}}>
            <div className="h-1 rounded-full" style={{backgroundImage: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 10px, #FFD700 10px, #FFD700 20px, #2F1B0A 20px, #2F1B0A 30px)'}} />
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">

          {activeTab === 'dashboard' && (
            <AdminHomePanel user={user}
              onAddStaff={openAddStaffModal}
              onGoToStaff={goToStaffTab}         
              onGoToComplaints={goToComplaintsTab} 
              onGoToSettings={goToSettingsTab} />
          )}

          {activeTab === 'statistics' && 
              <StatisticsPanel/>
          }

          {activeTab === 'complaints' && (
            <div>
              <div className="h-2 rounded-full mb-8" style={{background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'}} />
              <ComplaintsList />
            </div>
          )}

          {activeTab === 'staff' && (
            <div>
              <div className="h-2 rounded-full mb-8" style={{background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'}} />
              <StaffList isTrue={value} onModalClose={() => changeValue(false)} />
            </div>
          )}

          {activeTab === 'settings' && <SettingsPanel />}

        </main>
      </div>
    </div>
  )
}

export default AdminDashboard