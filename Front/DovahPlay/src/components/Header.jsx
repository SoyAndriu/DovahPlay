import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinkBase = ({ isActive }) =>
  isActive
    ? "text-yellow-400 font-bold"
    : "text-slate-300 hover:text-yellow-400";

export default function Header() {
  return (
    <header className="bg-linear-to-b from-slate-900/90 to-transparent text-white py-3 sticky z-20 top-0" >
        <div className="flex items-center justify-between px-4 gap-4">
          {/* Logo + nombre */}
          <Link to="/" className="" >
            <div className="flex items-center gap-2 text-2xl font-bold">
              <img src="/images/logo.png" alt="DovahPlay Logo" className="w-10 cursor-pointer"/>
              <span>
                Dovah<span>Play</span>
              </span>
            </div>
          </Link>

          {/* Navegacion */}
          <nav className="flex gap-4 ml-4">
            <NavLink 
              to="/" 
              className={navLinkBase}
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/series" 
              className={navLinkBase}
            >
              Series
            </NavLink>
            <NavLink 
              to="/movies" 
              className={navLinkBase}
            >
              Peliculas
            </NavLink>
            <NavLink 
              to="/myList" 
              className={navLinkBase}
            >
              Mi Lista
            </NavLink>
          </nav>

          {/* Perfil usuario */}
            <Link 
              to="/login" 
              className="px-3 py-1 rounded text-black bg-yellow-400 font-semibold"
            >
              Iniciar Sesion
            </Link>
        </div>
    </header>
  )
}