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
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D2691E] focus:ring focus:ring-[#D2691E]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D2691E] focus:ring focus:ring-[#D2691E]"
                    >
                    <option value="">Select Department</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="security">Security</option>
                    <option value="administration">Administration</option>
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