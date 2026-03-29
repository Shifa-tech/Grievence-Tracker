import React, { useState, useEffect } from 'react'

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaint')
      const data = await response.json()
      setComplaints(data)
    } catch (error) {
      console.error('Error fetching complaints:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true
    return complaint.status === filter
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'border-red-500'
      case 'medium': return 'border-orange-500'
      case 'low': return 'border-green-500'
      default: return 'border-gray-500'
    }
  }

  if (loading) return <div className="text-center py-8">Loading complaints...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="grid grid-cols-4 gap-5 w-full mb-5">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 text-2xl py-2 rounded ${filter === 'all' ? 'bg-[#D2691E] text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('open')}
            className={`px-4 text-2xl py-2 rounded ${filter === 'open' ? 'bg-[#D2691E] text-white' : 'bg-gray-200'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('in-progress')}
            className={`px-4 text-2xl py-2 rounded ${filter === 'in-progress' ? 'bg-[#D2691E] text-white' : 'bg-gray-200'}`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`px-4 text-2xl py-2 rounded ${filter === 'resolved' ? 'bg-[#D2691E] text-white' : 'bg-gray-200'}`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {filteredComplaints.map(complaint => (
          <div key={complaint._id} className={`bg-white rounded-lg shadow p-6 m-4 border-l-4 ${getUrgencyColor(complaint.urgency)}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold">{complaint.title}</h3>
                <p className="text-sm text-gray-500">ID: {complaint._id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{complaint.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                <span className="font-semibold">Location:</span> {complaint.location}
              </div>
              <div>
                <span className="font-semibold">Urgency:</span> {complaint.urgency}
              </div>
              <div>
                <span className="font-semibold">Submitted:</span> {new Date(complaint.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComplaintsList