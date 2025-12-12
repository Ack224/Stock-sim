import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Navigation.css'

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const toggleHamburger = () => setHamburgerOpen(!hamburgerOpen)
  const closeHamburger = () => setHamburgerOpen(false)

  return (
    <nav className="navbar" style={{ backgroundColor: 'var(--nav-bg)' }}>
      <Link to="/" className="nav-logo" style={{ color: 'var(--text-color)' }}>StockSim 📈</Link>
      <button className="hamburger-toggle" onClick={toggleHamburger} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }} aria-label="Menu">☰</button>
      <div className={`hamburger-menu ${hamburgerOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeHamburger} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Home</NavLink>
        <NavLink to="/market" onClick={closeHamburger} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Rynek</NavLink>
        <NavLink to="/obserwacje" onClick={closeHamburger} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Obserwacje</NavLink>
        <NavLink to="/kontakt" onClick={closeHamburger} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kontakt</NavLink>
      </div>
      <style>{`.nav-item.active { font-weight: bold; border-bottom: 2px solid var(--accent-color);  }`}</style>
      <div className="nav-actions">
        <button onClick={toggleTheme} style={{ border:'none',background: 'transparent', width: '40px', height: '40px', cursor: 'pointer', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px', color: 'var(--text-color)' }} title="Zmień motyw">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}