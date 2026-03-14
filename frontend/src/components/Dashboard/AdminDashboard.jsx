import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(()=>{
    getStaffs
  },[])
  async function getStaffs() {
     try {
      const response=await fetch('/api/user',{
        headers:{
          "Accept":"application/json",
        },
        method:"GET",
      })
      const res=response.json()
      console.log(res);
      
      if(response.ok){
        console.log("response is received successfully");
        return res
      }
      
     } catch (error) {
        console.log(`Error while Fetching staff data ${error}`);
        
     }
  }


  return (
    <div className="admin-dashboard">
      <h2>👑 Admin Dashboard</h2>
      <p>Welcome, {user.name}! Manage the entire circus system.</p>
      
      {/* Stats Overview */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>{stats.totalstaffs || 0}</h3>
          <p>Total Staffs</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalComplaints || 0}</h3>
          <p>Total Complaints</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pendingComplaints || 0}</h3>
          <p>Pending Complaints</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeStaff || 0}</h3>
          <p>Active Staff</p>
        </div>
      </div>

      {/* User Management */}
      <div className="user-management">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="role-select"
                  >
                    <option value="citizen">Citizen</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* System Controls */}
      <div className="system-controls">
        <h3>System Controls</h3>
        <div className="control-buttons">
          <button className="btn btn-warning">Backup Database</button>
          <button className="btn btn-danger">Purge Old Complaints</button>
          <button className="btn btn-info">Send System Announcement</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
