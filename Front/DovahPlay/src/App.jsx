import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Series from './pages/Series.jsx'
import Movies from './pages/Movies.jsx'
import MyList from './pages/MyList.jsx'
import Login from './auth/Login.jsx'



function App() {

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-10">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/series' element={<Series />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/myList' element={<MyList />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
