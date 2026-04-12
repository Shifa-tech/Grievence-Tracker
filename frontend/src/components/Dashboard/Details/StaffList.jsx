import React, { useState, useEffect } from 'react'
import AddStaff from './AddStaff'


const StaffList = () => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/user/staff')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStaff = async (staffData) => {
    console.log(" Received in handleAddStaff:", staffData)  
    if (!staffData || !staffData.username || !staffData.email || !staffData.password) {
        console.error(" Missing required fields:", staffData)
        alert("Please fill all required fields")
        return
    }
    try {
      const response = await fetch('/api/user/create-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...staffData, role: 'staff' })
      })

      console.log(response)

      const data =await response.json();

      console.log(data);
      
      
      if (data.success&&response.ok) {
        console.log('====================================');
        console.log("Staff Member Added");
        console.log(data);
        
        console.log('====================================');
        fetchStaff()
        setShowAddModal(false)
      }
    } catch (error) {
      console.error('Error adding staff:', error)
    }
  }

  if (loading) return <div className="text-center py-8">Loading staff...</div>

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 py-20 gap-8">
        {staff && staff.length > 0 ? (
        staff.map(member => (
          <div key={member._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center text-[#8B4513] text-xl">
                👤
              </div>
              <div className="m-4">
                <h3 className="text-lg font-semibold">{member.username}</h3>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex m-4 " >
                <span className="text-sm text-gray-500">Department:</span>
                <span className="text-sm justify-center">{member.department || 'General'}</span>
              </div>
              <div className="flex m-4">
                <span className="text-sm text-gray-500">Joined:</span>
                <span className="text-sm">{new Date(member.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex m-4">
                <span className="text-sm text-gray-500">Status:</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
            <div className="m-4 flex gap-2">
              <button className="flex-1 px-1 py-1 border rounded-md hover:bg-gray-50 text-sm">
                Edit
              </button>
              <button className="flex-1 px-1 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 text-sm">
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
          // ✅ Show message when no staff
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No staff members found</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-6 py-2 bg-[#D2691E] text-white rounded-lg hover:bg-[#B85E1A]"
            >
              + Add Your First Staff Member
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-[#2F1B0A]">Staff Management</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-[#D2691E] text-white rounded-lg hover:bg-[#B85E1A] transition-colors flex items-center gap-2 shadow-md"
        >
          <span className="text-xl">+</span>
          Add New Staff
        </button>
      </div>

      {showAddModal && (
        <AddStaff onClose={() => setShowAddModal(false)} onAdd={handleAddStaff} />
      )}
    </div>
  )
}

export default StaffList