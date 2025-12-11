import React from 'react'

const Stats = () => {
  const stats = [
    { number: '1,247', label: 'Issues Resolved' },
    { number: '94%', label: 'Satisfaction Rate' },
    { number: '2.3', label: 'Avg. Resolution Days' },
    { number: '432', label: 'Active Citizens' }
  ]

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

export default Stats;