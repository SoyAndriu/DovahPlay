import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Home from './pages/Home.jsx'
import Series from './pages/Series.jsx'



function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-4xl font-bold text-yellow-400">
        DovahPlay + Tailwind
      </h1>
    </div>
  )
}

export default App
