// frontend/src/components/Dashboard/Details/SettingsPanel.jsx
import React, { useState, useEffect } from 'react'

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    sla: { high: 24, medium: 48, low: 72 },
    categories: [],
    locations: []
  })
  const [newCategory, setNewCategory] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Load settings on mount
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken')      
      const response = await fetch('/api/user/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setSettings(data.settings)
      }
      
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Save everything to database
  const saveSettings = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      })
      
      const data = await response.json()
      if (data.success) {
        setMessage('✅ Settings saved!')
        setTimeout(() => setMessage(''), 2000)
      }
    } catch (error) {
      setMessage('❌ Error saving')
    } finally {
      setSaving(false)
    }
  }

  const addCategory = () => {
    if (newCategory && !settings.categories.includes(newCategory)) {
      setSettings({
        ...settings,
        categories: [...settings.categories, newCategory]
      })
      setNewCategory('')
    }
  }

  const removeCategory = (cat) => {
    setSettings({
      ...settings,
      categories: settings.categories.filter(c => c !== cat)
    })
  }

  const addLocation = () => {
    if (newLocation && !settings.locations.includes(newLocation)) {
      setSettings({
        ...settings,
        locations: [...settings.locations, newLocation]
      })
      setNewLocation('')
    }
  }

  const removeLocation = (loc) => {
    setSettings({
      ...settings,
      locations: settings.locations.filter(l => l !== loc)
    })
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-10">
      
      {message && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="min-h-screen p-10" style={{background: '#F5F5DC'}}>

        {/* Header */}
        <div className="mb-12">
          <div className="h-3 rounded-full mb-8" style={{background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 24px, #FFD700 24px, #FFD700 48px, #2F1B0A 48px, #2F1B0A 72px, #FFD700 72px, #FFD700 96px)'}} />
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-[#FFD700] flex-shrink-0" style={{background: 'radial-gradient(circle, #D2691E, #8B4513)'}}>
              <span className="text-3xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-5xl font-black uppercase" style={{fontFamily: 'Georgia, serif', color: '#2F1B0A', letterSpacing: '0.12em', textShadow: '3px 3px 0px #FFD700'}}>Settings</h1>
              <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{color: '#8B4513'}}>✦ Manage System Configuration ✦</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 h-0.5" style={{background: 'linear-gradient(to right, transparent, #8B4513)'}} />
            <span className="text-xl" style={{color: '#FFD700'}}>✦ ★ ✦</span>
            <div className="flex-1 h-0.5" style={{background: 'linear-gradient(to left, transparent, #8B4513)'}} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── SLA Deadlines ── */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
            <div className="relative px-8 py-6 overflow-hidden" style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)'}}>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'}} />
              <span className="absolute top-3 left-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute top-3 right-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute bottom-3 left-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute bottom-3 right-3 text-[#FFD700] text-xs opacity-70">★</span>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-white" style={{fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.6)'}}>SLA Deadlines</h2>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{color: '#FFD700'}}>✦ Resolution Time Limits ✦</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6" style={{background: '#F5F5DC'}}>
              {/* High */}
              <div className="rounded-2xl overflow-hidden border-2 border-red-200 shadow-md">
                <div className="px-5 py-3 flex items-center gap-2" style={{background: 'linear-gradient(90deg, #DC3545, #c0392b)'}}>
                  <span className="text-base">🔴</span>
                  <span className="text-sm font-black uppercase tracking-widest text-white">High Urgency</span>
                </div>
                <div className="px-6 py-5 bg-red-50 flex items-center gap-5">
                  <input type="number" value={settings.sla.high}
                    onChange={(e) => setSettings({...settings, sla: {...settings.sla, high: parseInt(e.target.value)}})}
                    className="w-28 px-3 py-3 text-center text-xl font-bold rounded-xl border-2 border-red-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 shadow-inner"
                    style={{color: '#2F1B0A'}} />
                  <div>
                    <p className="font-bold text-red-700">hours</p>
                    <p className="text-xs text-gray-400 mt-1">Safety hazards, major disruptions</p>
                  </div>
                </div>
              </div>

              {/* Medium */}
              <div className="rounded-2xl overflow-hidden border-2 border-yellow-200 shadow-md">
                <div className="px-5 py-3 flex items-center gap-2" style={{background: 'linear-gradient(90deg, #e6a817, #b8860b)'}}>
                  <span className="text-base">🟡</span>
                  <span className="text-sm font-black uppercase tracking-widest text-white">Medium Urgency</span>
                </div>
                <div className="px-6 py-5 bg-yellow-50 flex items-center gap-5">
                  <input type="number" value={settings.sla.medium}
                    onChange={(e) => setSettings({...settings, sla: {...settings.sla, medium: parseInt(e.target.value)}})}
                    className="w-28 px-3 py-3 text-center text-xl font-bold rounded-xl border-2 border-yellow-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
                    style={{color: '#2F1B0A'}} />
                  <div>
                    <p className="font-bold text-yellow-700">hours</p>
                    <p className="text-xs text-gray-400 mt-1">Significant inconvenience</p>
                  </div>
                </div>
              </div>

              {/* Low */}
              <div className="rounded-2xl overflow-hidden border-2 border-green-200 shadow-md">
                <div className="px-5 py-3 flex items-center gap-2" style={{background: 'linear-gradient(90deg, #28A745, #1e7e34)'}}>
                  <span className="text-base">🟢</span>
                  <span className="text-sm font-black uppercase tracking-widest text-white">Low Urgency</span>
                </div>
                <div className="px-6 py-5 bg-green-50 flex items-center gap-5">
                  <input type="number" value={settings.sla.low}
                    onChange={(e) => setSettings({...settings, sla: {...settings.sla, low: parseInt(e.target.value)}})}
                    className="w-28 px-3 py-3 text-center text-xl font-bold rounded-xl border-2 border-green-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner"
                    style={{color: '#2F1B0A'}} />
                  <div>
                    <p className="font-bold text-green-700">hours</p>
                    <p className="text-xs text-gray-400 mt-1">Minor issues, no immediate impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Complaint Categories ── */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
            <div className="relative px-8 py-6 overflow-hidden" style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)'}}>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'}} />
              <span className="absolute top-3 left-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute top-3 right-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute bottom-3 left-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute bottom-3 right-3 text-[#FFD700] text-xs opacity-70">★</span>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl">📂</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-white" style={{fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.6)'}}>Complaint Categories</h2>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{color: '#FFD700'}}>✦ Manage Complaint Types ✦</p>
                </div>
              </div>
            </div>

            <div className="p-8" style={{background: '#F5F5DC'}}>
              <div className="rounded-2xl p-5 mb-6 border-2 border-dashed border-[#D2691E] min-h-[220px] flex flex-wrap gap-3 content-start" style={{background: 'rgba(139,69,19,0.04)'}}>
                {settings.categories.length > 0 ? settings.categories.map(cat => (
                  <span key={cat} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 shadow-md hover:-translate-y-0.5 transition-transform"
                    style={{background: 'linear-gradient(135deg, #8B4513, #D2691E)', borderColor: '#FFD700', color: '#F5F5DC'}}>
                    <span className="text-[#FFD700] text-xs">✦</span>
                    {cat.replace('-', ' ')}
                    <button onClick={() => removeCategory(cat)}
                      className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black hover:bg-red-500 hover:text-white transition-all"
                      style={{color: '#FFD700', background: 'rgba(0,0,0,0.25)'}}>✕</button>
                  </span>
                )) : (
                  <div className="w-full flex flex-col items-center justify-center py-12">
                    <span className="text-5xl mb-3 opacity-20">🎪</span>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-40" style={{color: '#8B4513'}}>No categories added yet</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <input type="text" value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  placeholder="   Enter new category name..."
                  className="flex-1 px-5 py-3.5 rounded-xl border-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D2691E] bg-white transition"
                  style={{borderColor: '#D2691E', color: '#2F1B0A'}} />
                <button onClick={addCategory}
                  className="px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center gap-2"
                  style={{background: 'linear-gradient(135deg, #8B4513, #D2691E)', color: '#FFD700', border: '2px solid #FFD700'}}>
                  <span className="text-lg">+</span> Add
                </button>
              </div>
            </div>
          </div>

          {/* ── Location Zones ── */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8B4513]">
            <div className="relative px-8 py-6 overflow-hidden" style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)'}}>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 22px)'}} />
              <span className="absolute top-3 left-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute top-3 right-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute bottom-3 left-3 text-[#FFD700] text-xs opacity-70">★</span>
              <span className="absolute bottom-3 right-3 text-[#FFD700] text-xs opacity-70">★</span>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl">🗺️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-white" style={{fontFamily: 'Georgia, serif', textShadow: '1px 1px 3px rgba(0,0,0,0.6)'}}>Location Zones</h2>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{color: '#FFD700'}}>✦ Territory Management ✦</p>
                </div>
              </div>
            </div>

            <div className="p-8" style={{background: '#F5F5DC'}}>
              <div className="flex flex-wrap gap-3 mb-6 min-h-[70px] items-start content-start">
                {settings.locations.length > 0 ? settings.locations.map(loc => (
                  <span key={loc} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 shadow-md hover:-translate-y-0.5 transition-transform"
                    style={{background: 'white', borderColor: '#8B4513', color: '#2F1B0A'}}>
                    <span style={{color: '#D2691E'}}>📍</span>
                    {loc.replace('-', ' ')}
                    <button onClick={() => removeLocation(loc)}
                      className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black hover:bg-red-500 hover:text-white transition-all"
                      style={{color: '#8B4513', background: 'rgba(139,69,19,0.12)'}}>✕</button>
                  </span>
                )) : (
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40 self-center" style={{color: '#8B4513'}}>No locations added yet</p>
                )}
              </div>
              <div className="flex gap-3">
                <input type="text" value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                  placeholder="   Enter new location name..."
                  className="flex-1 px-5 py-3.5 rounded-xl border-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D2691E] bg-white transition"
                  style={{borderColor: '#D2691E', color: '#2F1B0A'}} />
                <button onClick={addLocation}
                  className="px-6 py-3.5 rounded-xl font-black uppercase tracking-wider text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center gap-2"
                  style={{background: 'linear-gradient(135deg, #8B4513, #D2691E)', color: '#FFD700', border: '2px solid #FFD700'}}>
                  <span className="text-lg">+</span> Add
                </button>
              </div>
            </div>
          </div>

          {/* ── Save Button ── */}
          <div className="lg:col-span-2 flex justify-end pt-2">
            <button onClick={saveSettings} disabled={saving}
              className="relative overflow-hidden px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              style={{background: 'linear-gradient(135deg, #2F1B0A, #8B4513, #2F1B0A)', color: '#FFD700', border: '3px solid #FFD700', fontFamily: 'Georgia, serif'}}>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 6px, transparent 6px, transparent 16px)'}} />
              <span className="relative text-2xl">{saving ? '⏳' : '💾'}</span>
              <span className="relative">{saving ? 'Saving...' : 'Save All Settings'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SettingsPanel