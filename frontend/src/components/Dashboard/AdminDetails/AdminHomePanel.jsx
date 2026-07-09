import React from 'react'

const CAPABILITIES = [
  { icon: "👥", title: "User Management",      description: "View, add, edit, and remove all users in the system"     },
  { icon: "👔", title: "Staff Management",     description: "Hire, manage, and monitor staff performance"             },
  { icon: "📋", title: "Complaint Oversight",  description: "View and manage all complaints in the circus"           },
  { icon: "⚙️", title: "System Configuration", description: "Configure SLA deadlines, categories, and zones"         },
  { icon: "📊", title: "Reports & Analytics",  description: "Generate insights and export data"                      },
  { icon: "🔧", title: "System Controls",      description: "Backup database, purge old data, and audit logs"        },
]

const QUICK_ACTIONS = [
  { icon: "➕", label: "Add Staff",       action: "onAddStaff"       },
  { icon: "👔", label: "View Staff",      action: "onGoToStaff"      },
  { icon: "📋", label: "View Complaints", action: "onGoToComplaints" },
  { icon: "⚙️", label: "Settings",        action: "onGoToSettings"   },
]

const Stripe = () => (
  <div className="h-2 rounded-full" style={{background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 20px, #FFD700 20px, #FFD700 40px, #2F1B0A 40px, #2F1B0A 60px, #FFD700 60px, #FFD700 80px)'}} />
)

const AdminHomePanel = ({ user, onAddStaff, onGoToStaff, onGoToComplaints, onGoToSettings }) => {
  const handlers = { onAddStaff, onGoToStaff, onGoToComplaints, onGoToSettings }

  return (
    <div className="min-h-screen p-12" style={{background: '#F5F5DC'}}>

      {/* ── Welcome Banner ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513] mb-16">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #2F1B0A 0%, #8B4513 50%, #2F1B0A 100%)'}} />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'}} />
        {['top-5 left-5','top-5 right-5','bottom-5 left-5','bottom-5 right-5'].map(pos => (
          <span key={pos} className={`absolute ${pos} text-[#FFD700] text-2xl opacity-50`}>★</span>
        ))}
        <div className="relative px-14 py-20 text-center">
          <div className="w-28 h-10 rounded-full mx-auto mb-10 flex items-center justify-center shadow-2xl border-4 border-[#FFD700]"
            style={{background: 'radial-gradient(circle, #D2691E, #8B4513)'}}>
            <span className="text-4xl">👑</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6"
            style={{fontFamily: 'Georgia, serif', color: '#F5F5DC', textShadow: '2px 2px 0px #2F1B0A', letterSpacing: '0.08em'}}>
            Welcome back, <span style={{color: '#FFD700'}}>{user?.username || 'Admin'}</span>
          </h1>
          <p className="text-lg font-semibold uppercase tracking-widest mb-10" style={{color: 'rgba(255,215,0,0.7)'}}>
            You have full control over the Circus of Wonders grievance system
          </p>
          <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base uppercase tracking-widest shadow-lg"
            style={{background: '#FFD700', color: '#2F1B0A', border: '2px solid #8B4513'}}>
            🔐 Full Administrative Access ✓
          </span>
        </div>
      </div>
          <br></br>
      <Stripe />

      {/* ── What You Can Do ── */}
      <div className="mt-16 mb-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-0.5" style={{background: 'linear-gradient(to right, transparent, #8B4513)'}} />
          <h2 className="font-black uppercase tracking-widest text-2xl px-4"
            style={{fontFamily: 'Georgia, serif', color: '#2F1B0A'}}>✦ What You Can Do ✦</h2>
          <div className="flex-1 h-0.5" style={{background: 'linear-gradient(to left, transparent, #8B4513)'}} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CAPABILITIES.map(({ icon, title, description }) => (
            <div key={title}
              className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="px-8 py-6 flex items-center gap-4"
                style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513)'}}>
                <span className="text-3xl">{icon}</span>
                <span className="font-black uppercase tracking-wider text-base"
                  style={{fontFamily: 'Georgia, serif', color: '#FFD700'}}>{title}</span>
              </div>
              <div className="px-8 py-10" style={{background: '#F5F5DC'}}>
                <p className="text-base leading-loose" style={{color: '#5a3a1a'}}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        <br></br>
      <Stripe />

      {/* ── Quick Actions ── */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513] mt-16 mb-16">
        <div className="relative px-10 py-8 overflow-hidden" style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)'}}>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'}} />
          {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map(pos => (
            <span key={pos} className={`absolute ${pos} text-[#FFD700] text-xs opacity-60`}>★</span>
          ))}
          <h2 className="relative font-black uppercase tracking-widest text-2xl text-center"
            style={{fontFamily: 'Georgia, serif', color: '#FFD700', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
            ⚡ Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 p-14" style={{background: '#F5F5DC'}}>
          {QUICK_ACTIONS.map(({ icon, label, action }) => (
            <button key={label} onClick={handlers[action]}
              className="group flex flex-col items-center gap-5 py-12 rounded-2xl font-black uppercase tracking-wider text-base shadow-lg border-2 transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
              style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513)', borderColor: '#FFD700', color: '#FFD700', fontFamily: 'Georgia, serif'}}>
              <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
          <br></br>
      <Stripe />

      {/* ── Admin Tip ── */}
      <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513] mt-16  ">
        <div className="px-8 py-6 flex items-center gap-4"
          style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513)'}}>
          <span className="text-2xl">💡</span>
          <span className="font-black uppercase tracking-widest text-base"
            style={{fontFamily: 'Georgia, serif', color: '#FFD700'}}>Admin Tip</span>
        </div>
        <div className="px-10 py-10" style={{background: '#F5F5DC', borderLeft: '5px solid #FFD700'}}>
          <p className="text-base leading-loose" style={{color: '#5a3a1a'}}>
            Use the sidebar to navigate between sections. You have full access to all features.
            Regular backups ensure data safety for the entire circus.
          </p>
        </div>
      </div>

    </div>
  )
}

export default AdminHomePanel