import React, { useState, useEffect } from 'react'
import './Stats.css'

const Stats = () => {
  const [stats, setStats] = useState([
    { number: '0', label: 'Issues Resolved' },
    { number: '0%', label: 'Satisfaction Rate' },
    { number: '0', label: 'Avg. Resolution Days' },
    { number: '0', label: 'Active Citizens' }
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/complaint/stats')
      const data = await response.json()
      
      if (data.success) {
        // ✅ Fix: Ensure avgResolutionTime is a valid number
        let avgTime = data.stats.complaints.avgResolutionTime
        // Convert to number and fix to 1 decimal
        const avgTimeNum = parseFloat(avgTime)
        const displayTime = isNaN(avgTimeNum) ? '0' : avgTimeNum.toFixed(1)
        
        setStats([
          { number: data.stats.complaints.resolved.toLocaleString(), label: 'Issues Resolved' },
          { number: `${data.stats.complaints.resolutionRate}%`, label: 'Satisfaction Rate' },
          { number: displayTime, label: 'Avg. Resolution Days' },
          { number: data.stats.users.citizens.toLocaleString(), label: 'Active Citizens' }
        ])
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="stats" id="stats">
        <div className="container">
          <div className="section-title">
            <h2>Our Impact</h2>
            <p>Loading statistics...</p>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>...</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="section-title">
          <h2>Our Impact</h2>
          <p>Keeping the Circus of Wonders running smoothly</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats