import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Tlo from './Tlo'

export default function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Tlo blur={!isHomePage} />
      <Navigation />
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}