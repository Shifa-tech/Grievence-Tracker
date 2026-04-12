import React, { useState } from 'react'

const AddStaff = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    username: '',

    email: '',
    password: '',
    department: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("📤 Submitting staff data:", formData)  // Debug log
    
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all required fields")
      return
    }
    onAdd(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
            <h2 className="text-2xl text-center font-bold mb-4">Add New Staff</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className='px-5'>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input 
                    type="text"
                    name = "username" 
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D2691E] focus:ring focus:ring-[#D2691E]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                    type="email" 
                    required
                    name = "email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D2691E] focus:ring focus:ring-[#D2691E]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                    type="password" 
                    required
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D2691E] focus:ring focus:ring-[#D2691E]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select 
                    name = "department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D2691E] focus:ring focus:ring-[#D2691E]"
                    >
                    <option value="">Select Department</option>
                    <option value="road-damage">Road Damage</option>
                    <option value="water-leakage">Sanitation</option>
                    <option value="garbage">Garbage</option>
                    <option value="safety">Security</option>
                    <option value="electrical">Electrical</option>
                    </select>
                </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-50">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B85E1A]">
                    Add Staff
                </button>
                </div>
            </form>
            </div>
      </div>
    </div>
  )
}

export default AddStaff