import React, { useState, useEffect } from 'react'

const Stripe = () => (
  <div className="h-2 rounded-full" style={{background:'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 20px,#FFD700 20px,#FFD700 40px,#2F1B0A 40px,#2F1B0A 60px,#FFD700 60px,#FFD700 80px)'}}/>
)

const CardHeader = ({icon, title}) => (
  <div className="relative px-8 py-5 overflow-hidden flex items-center gap-3" style={{background:'linear-gradient(135deg,#2F1B0A,#8B4513,#2F1B0A)'}}>
    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(45deg,#FFD700 0px,#FFD700 10px,transparent 10px,transparent 22px)'}}/>
    {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map(p=><span key={p} className={`absolute ${p} text-[#FFD700] text-xs opacity-50`}>★</span>)}
    <div className="relative w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg flex-shrink-0"><span className="text-xl">{icon}</span></div>
    <h3 className="relative font-black uppercase tracking-widest text-lg text-white" style={{fontFamily:'Georgia,serif',textShadow:'1px 1px 2px rgba(0,0,0,0.5)'}}>{title}</h3>
  </div>
)

const ComplaintLoadMeter = ({totalComplaints, maxExpected=500}) => {
  const pct = Math.min((totalComplaints/maxExpected)*100,100)
  const angle = 180-(pct*1.8)
  const rad = angle*(Math.PI/180)
  const nx = 100+72*Math.cos(rad)
  const ny = 100-72*Math.sin(rad)
  const status = pct<=33?['Light Load','#28A745','bg-green-100 text-green-700 border-green-300']:pct<=66?['Moderate Load','#FFC107','bg-yellow-100 text-yellow-700 border-yellow-300']:['Heavy Load','#DC3545','bg-red-100 text-red-700 border-red-300']

  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
      <CardHeader icon="📊" title="Staff Workload Meter"/>
      <div className="px-10 py-10" style={{background:'#F5F5DC'}}>
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 200 105" className="w-64">
            <path d="M18 100 A82 82 0 0 1 182 100" fill="none" stroke="rgba(139,69,19,0.15)" strokeWidth="14" strokeLinecap="round"/>
            <path d="M18 100 A82 82 0 0 1 59 30.8"  fill="none" stroke="#28A745" strokeWidth="14" strokeLinecap="round"/>
            <path d="M59 30.8 A82 82 0 0 1 141 30.8" fill="none" stroke="#FFC107" strokeWidth="14" strokeLinecap="round"/>
            <path d="M141 30.8 A82 82 0 0 1 182 100" fill="none" stroke="#DC3545" strokeWidth="14" strokeLinecap="round"/>
            <line x1="100" y1="100" x2={nx.toFixed(1)} y2={ny.toFixed(1)} stroke="#2F1B0A" strokeWidth="3" strokeLinecap="round" style={{transition:'all 0.7s ease'}}/>
            <circle cx="100" cy="100" r="6" fill="#2F1B0A" stroke="#FFD700" strokeWidth="2"/>
          </svg>
          <p className="text-6xl font-black -mt-2" style={{fontFamily:'Georgia,serif',color:status[1]}}>{Math.round(pct)}<span className="text-3xl">%</span></p>
          <p className="text-xs font-bold uppercase tracking-widest mt-2 mb-4" style={{color:'#8B4513'}}>of maximum capacity</p>
          <span className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest border-2 ${status[2]}`}>{status[0]}</span>
        </div>

        <div className="flex justify-around mt-8 py-6 px-4 rounded-2xl border-2 border-dashed border-[#D2691E]" style={{background:'rgba(139,69,19,0.04)'}}>
          {[['#28A745','Light'],['#FFC107','Moderate'],['#DC3545','Heavy']].map(([c,l])=>(
            <div key={l} className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{background:c}}/>
              <span className="text-xs font-bold uppercase tracking-wider" style={{color:'#5a3a1a'}}>{l}</span>
            </div>
          ))}
        </div>

        {/* Count box — two centered columns */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col items-center justify-center py-6 rounded-2xl border-2 border-[#8B4513]"
            style={{background:'linear-gradient(135deg,#2F1B0A,#8B4513)'}}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'rgba(255,215,0,0.6)'}}>Current</p>
            <p className="text-4xl font-black" style={{fontFamily:'Georgia,serif',color:'#FFD700'}}>{totalComplaints}</p>
          </div>
          <div className="flex flex-col items-center justify-center py-6 rounded-2xl border-2 border-[#8B4513]"
            style={{background:'linear-gradient(135deg,#2F1B0A,#8B4513)'}}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'rgba(255,215,0,0.6)'}}>Max</p>
            <p className="text-4xl font-black" style={{fontFamily:'Georgia,serif',color:'rgba(245,245,220,0.8)'}}>{maxExpected}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fully centered stat card
const StatCard = ({icon, label, value, accent}) => (
  <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#8B4513] hover:-translate-y-1 transition-all duration-300">
    <div className="px-5 py-2.5 flex items-center justify-center gap-2" style={{background:`linear-gradient(135deg,#2F1B0A,${accent})`}}>
      <span className="text-sm">{icon}</span>
      <span className="text-xs font-black uppercase tracking-widest" style={{color:'#FFD700',fontFamily:'Georgia,serif'}}>{label}</span>
    </div>
    <div className="flex flex-col items-center justify-center py-6 gap-2" style={{background:'#F5F5DC'}}>
      <span className="text-2xl">{icon}</span>
      <p className="text-4xl font-black" style={{fontFamily:'Georgia,serif',color:'#2F1B0A'}}>{value}</p>
    </div>
  </div>
)

const StatisticsPanel = () => {
  const [stats, setStats] = useState({
    users:{total:0,staff:0,citizens:0,admins:0},
    complaints:{total:0,open:0,inProgress:0,resolved:0,resolutionRate:0,avgResolutionTime:0},
    byCategory:{}, byLocation:{}, byUrgency:{low:0,medium:0,high:0}
  })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async()=>{
      try {
        const res  = await fetch('/api/complaint/stats',{headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}})
        const data = await res.json()
        if(data.success) setStats(data.stats)
      } catch(e){console.error(e)} finally{setLoading(false)}
    })()
  },[])

  if(loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{background:'#F5F5DC'}}>
      <span className="text-5xl animate-spin">🎠</span>
      <p className="font-black uppercase tracking-widest" style={{color:'#8B4513'}}>Loading Statistics...</p>
    </div>
  )

  const maxCat = Math.max(...Object.values(stats.byCategory),1)

  return (
    <div className="min-h-screen p-10 space-y-12" style={{background:'#F5F5DC'}}>

      {/* Title */}
      <div>
        <div className="h-3 rounded-full mb-8" style={{background:'repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 24px,#FFD700 24px,#FFD700 48px,#2F1B0A 48px,#2F1B0A 72px,#FFD700 72px,#FFD700 96px)'}}/>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#FFD700] shadow-xl" style={{background:'radial-gradient(circle,#D2691E,#8B4513)'}}>
            <span className="text-3xl">📊</span>
          </div>
          <div>
            <h1 className="text-5xl font-black uppercase" style={{fontFamily:'Georgia,serif',color:'#2F1B0A',textShadow:'3px 3px 0px #FFD700',letterSpacing:'0.1em'}}>Statistics</h1>
            <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{color:'#8B4513'}}>✦ System Overview & Analytics ✦</p>
          </div>
        </div>
      </div>
        <br></br>
      {/* User Stats */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-5" style={{color:'#8B4513'}}>— User Overview</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard icon="👔" label="Total Staff"    value={stats.users.staff}    accent="#8B4513"/>
          <StatCard icon="👥" label="Total Citizens" value={stats.users.citizens} accent="#6B3410"/>
          <StatCard icon="👑" label="Total Admins"   value={stats.users.admins}   accent="#5a2d0c"/>
        </div>
      </div>

      <Stripe/>
        <br></br>
      {/* Complaint Stats */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest mb-5" style={{color:'#8B4513'}}>— Complaint Overview</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard icon="📋" label="Total Complaints" value={stats.complaints.total}    accent="#7B3F9E"/>
          <StatCard icon="⏳" label="Open / Pending"   value={stats.complaints.open}     accent="#b8860b"/>
          <StatCard icon="✅" label="Resolved"         value={stats.complaints.resolved}  accent="#1e7e34"/>
        </div>
      </div>

      <Stripe/>
        <br></br>
      {/* Resolution + Time + Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          <CardHeader icon="🎯" title="Resolution Rate"/>
          <div className="px-10 py-12 flex flex-col items-center gap-6" style={{background:'#F5F5DC'}}>
            <p className="text-7xl font-black" style={{fontFamily:'Georgia,serif',color:'#2F1B0A'}}>{stats.complaints.resolutionRate}<span className="text-4xl">%</span></p>
            <div className="w-full h-4 rounded-full overflow-hidden border-2 border-[#8B4513]" style={{background:'rgba(139,69,19,0.15)'}}>
              <div className="h-full rounded-full transition-all duration-700" style={{width:`${stats.complaints.resolutionRate}%`,background:'linear-gradient(90deg,#8B4513,#FFD700)'}}/>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{color:'#8B4513'}}>of complaints resolved</p>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          <CardHeader icon="⏱️" title="Avg Resolution Time"/>
          <div className="px-10 py-12 flex flex-col items-center justify-center gap-6" style={{background:'#F5F5DC'}}>
            <p className="text-7xl font-black" style={{fontFamily:'Georgia,serif',color:'#2F1B0A'}}>{stats.complaints.avgResolutionTime}</p>
            <span className="px-6 py-3 rounded-full font-black uppercase tracking-widest text-sm border-2" style={{background:'linear-gradient(135deg,#2F1B0A,#8B4513)',borderColor:'#FFD700',color:'#FFD700'}}>hours average</span>
            <p className="text-xs font-bold uppercase tracking-widest" style={{color:'#8B4513'}}>mean time to resolution</p>
          </div>
        </div>

        <ComplaintLoadMeter totalComplaints={stats.complaints.total} maxExpected={500}/>
      </div>

      <Stripe/>
        <br></br>
      {/* By Category */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
        <CardHeader icon="📂" title="Complaints by Category"/>
        <div className="px-10 py-10 space-y-6" style={{background:'#F5F5DC'}}>
          {Object.entries(stats.byCategory).map(([cat,count])=>(
            <div key={cat}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold uppercase tracking-wider capitalize" style={{color:'#2F1B0A'}}>{cat.replace('-',' ')}</span>
                <span className="px-4 py-1 rounded-full text-xs font-black border" style={{background:'linear-gradient(135deg,#8B4513,#D2691E)',color:'#FFD700',borderColor:'#FFD700'}}>{count}</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden border border-[#D2691E]" style={{background:'rgba(139,69,19,0.1)'}}>
                <div className="h-full rounded-full transition-all duration-500" style={{width:`${(count/maxCat)*100}%`,background:'linear-gradient(90deg,#8B4513,#FFD700)'}}/>
              </div>
            </div>
          ))}
          {!Object.keys(stats.byCategory).length && <p className="text-center py-10 font-bold uppercase tracking-widest opacity-40" style={{color:'#8B4513'}}>No data available</p>}
        </div>
      </div>

      <Stripe/>
          <br></br>
      {/* Locations + Urgency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          <CardHeader icon="📍" title="Top Complaint Locations"/>
          <div className="px-10 py-10 space-y-4" style={{background:'#F5F5DC'}}>
            {Object.entries(stats.byLocation).slice(0,5).map(([loc,count],i)=>(
              <div key={loc} className="flex items-center justify-between px-6 py-5 rounded-2xl border-2 hover:-translate-y-0.5 transition-transform"
                style={{background:i===0?'rgba(139,69,19,0.08)':'white',borderColor:i===0?'#D2691E':'#e5d5c0'}}>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{background:i===0?'#8B4513':'#D2691E'}}>{i+1}</span>
                  <span className="font-bold capitalize" style={{color:'#2F1B0A'}}>{loc.replace('-',' ')}</span>
                </div>
                <span className="px-4 py-2 rounded-full text-sm font-black border" style={{background:'linear-gradient(135deg,#2F1B0A,#8B4513)',color:'#FFD700',borderColor:'#FFD700'}}>{count}</span>
              </div>
            ))}
            {!Object.keys(stats.byLocation).length && <p className="text-center py-10 font-bold uppercase tracking-widest opacity-40" style={{color:'#8B4513'}}>No data available</p>}
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
          <CardHeader icon="⚠️" title="Urgency Distribution"/>
          <div className="px-10 py-10 grid grid-cols-3 gap-6" style={{background:'#F5F5DC'}}>
            {[
              {key:'high',  label:'High',  hdr:'#DC3545',bg:'#fff5f5',border:'#fca5a5',text:'#DC3545'},
              {key:'medium',label:'Medium',hdr:'#e6a817',bg:'#fffbeb',border:'#fde68a',text:'#b8860b'},
              {key:'low',   label:'Low',   hdr:'#28A745',bg:'#f0fdf4',border:'#86efac',text:'#28A745'},
            ].map(({key,label,hdr,bg,border,text})=>(
              <div key={key} className="rounded-2xl overflow-hidden border-2 shadow-lg hover:-translate-y-1 transition-transform" style={{borderColor:border}}>
                <div className="py-4 text-center" style={{background:hdr}}>
                  <span className="text-xs font-black uppercase tracking-wider text-white">{label}</span>
                </div>
                <div className="flex items-center justify-center py-12" style={{background:bg}}>
                  <p className="text-5xl font-black" style={{fontFamily:'Georgia,serif',color:text}}>{stats.byUrgency[key]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default StatisticsPanel