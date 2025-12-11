import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Header from './components/Master page elements/Header'  
import Footer from './components/Master page elements/Footer'
import SubmitComplaint from './pages/SubmitComplaint/SubmitComplaint'
import './App.css'

const App= ()=> {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/submit-complaint" element={<SubmitComplaint user={user} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App