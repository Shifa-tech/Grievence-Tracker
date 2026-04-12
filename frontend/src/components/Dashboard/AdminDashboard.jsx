import React, { useState } from 'react'
import StaffList from './Details/StaffList'
import ComplaintsList from './Details/ComplaintList'

const AdminDashboard = ({user}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#F5F5DC] text-[#2F1B0A]">
      <div className="flex flex-row flex-1 overflow-hidden bg-[#F5F5DC]">
        
        {/* Sidebar with x-direction padding */}
        <aside 
          className={`flex flex-col shrink-0 bg-[#D2691E] text-white overflow-y-auto overflow-x-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm z-5 ${
            sidebarOpen ? 'w-[260px]' : 'w-[70px]'
          }`}
        >
          {/* Added px-4 for horizontal padding */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-white/20">
            {sidebarOpen && (
              <div className="flex items-center space-x-3 px-4 overflow-hidden">
                <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-[#8B4513] text-sm"></i>
                </div>
                <span className="font-semibold text-xl text-white whitespace-nowrap transition-opacity duration-200">
                  Admin Panel
                </span>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="text-white/80 hover:text-[#FFD700] transition-colors p-1 rounded-md hover:bg-white/10 ml-auto"
            >
              <i className={`fas fa-chevron-${sidebarOpen ? 'left' : 'right'} text-sm`}>
                {sidebarOpen ? '←' : '→'}
              </i>
            </button>
          </div>
          
          {/* Added px-3 for horizontal padding on nav items container */}
          <nav className="flex-1 py-6 px-3 space-y-1.5">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('dashboard') }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeTab === 'dashboard' 
                  ? 'bg-[#FFD700]/20 text-[#FFD700]' 
                  : 'text-white/80 hover:bg-[#FFD700]/20 hover:text-[#FFD700]'
              }`}
            >
              <i className="fas fa-tachometer-alt w-5"></i>
              {sidebarOpen && <span className="font-medium transition-opacity duration-200">Dashboard</span>}
            </a>
            
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('statistics') }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'statistics' 
                  ? 'bg-[#FFD700]/20 text-[#FFD700]' 
                  : 'text-white/80 hover:bg-[#FFD700]/20 hover:text-[#FFD700]'
              }`}
            >
              <i className="fas fa-chart-line w-5"></i>
              {sidebarOpen && <span className="font-medium">Statistics</span>}
            </a>
            
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('complaints') }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'complaints' 
                  ? 'bg-[#FFD700]/20 text-[#FFD700]' 
                  : 'text-white/80 hover:bg-[#FFD700]/20 hover:text-[#FFD700]'
              }`}
            >
              <i className="fas fa-file-alt w-5"></i>
              {sidebarOpen && <span className="font-medium">View Complaints</span>}
            </a>
            
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('staff') }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'staff' 
                  ? 'bg-[#FFD700]/20 text-[#FFD700]' 
                  : 'text-white/80 hover:bg-[#FFD700]/20 hover:text-[#FFD700]'
              }`}
            >
              <i className="fas fa-users w-5"></i>
              {sidebarOpen && <span className="font-medium">View Staffs</span>}
            </a>
          </nav>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div></div>
          )}
          
          {activeTab === 'statistics' && (
               <div>
              <h1 className="text-2xl text-center py-5 font-bold mb-6">Statistics</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white text-center px-2 rounded-lg shadow p-6">
                  <h3 className="text-lg px-4 font-semibold mb-2">Total Complaints</h3>
                  <p className="text-3xl px-4 font-bold text-[#D2691E]">0</p>
                </div>
                <div className="bg-white text-center px-2 rounded-lg shadow p-6">
                  <h3 className="text-lg px-4 font-semibold mb-2">Pending</h3>
                  <p className="text-3xl px-4 font-bold text-[#D2691E]">0</p>
                </div>
                <div className="bg-white text-center px-2 rounded-lg shadow p-6">
                  <h3 className="text-lg px-4 font-semibold mb-2">Resolved</h3>
                  <p className="text-3xl px-4 font-bold text-[#D2691E]">0</p>
                </div>
                <div className="bg-white text-center px-2 rounded-lg shadow p-6">
                  <h3 className="text-lg px-4 font-semibold mb-2">Total Staffs</h3>
                  <p className="text-3xl px-4 font-bold text-[#D2691E]">0</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'complaints' && (
            <div>
              <h1 className="text-2xl text-center font-bold mb-6">All Complaints</h1>
              <ComplaintsList/>
            </div>
          )}
          
          {activeTab === 'staff' && (
            <div>
              <h1 className="text-2xl text-center font-bold mb-6">All Staffs</h1>
              <StaffList/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard