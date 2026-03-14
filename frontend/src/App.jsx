import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register/Register'
import Header from './components/Master page elements/Header'  
import Footer from './components/Master page elements/Footer'
import SubmitComplaint from './pages/SubmitComplaint/SubmitComplaint'
import './App.css'

const App= ()=> {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/submit-complaint" element={<SubmitComplaint/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App