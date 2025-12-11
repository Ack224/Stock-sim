import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Tlo({ blur = false }) {
  const { theme } = useTheme()
  
  // Kolory zależnie od motywu
  const isDark = theme === 'dark'
  const accentColor = isDark ? '#34d399' : '#10b981'  // Zielony akcent
  const bgColor = isDark ? '#0f172a' : '#ffffff'      // Tło (ciemne/jasne)

  // Losowo generowana linia wykresu
  const [chartPath, setChartPath] = useState('')

  useEffect(() => {
    let path = 'M0,400'  // Początek linii
    let height = 400
    
    // Generuj 150 punktów wykresu
    for (let i = 1; i <= 150; i++) {
      height += (Math.random() - 0.5) * 150  // Losowy ruch w górę/dół
      if (height < 50) height = 100           // Min wysokość
      if (height > 550) height = 500          // Max wysokość
      path += ` L${i * 40},${height}`         // Dodaj punkt do ścieżki
    }
    
    setChartPath(path + ' L6000,800 L0,800 Z')  // Zamknij kształt
  }, [])

  const bgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor: bgColor,
    transition: 'background 0.3s',
    filter: blur ? 'blur(8px)' : 'none',
    opacity: blur ? 0.8 : 1
  }

  const chartStyle = {
    position: 'absolute',
    bottom: -50,
    left: 0,
    width: '200%',
    height: '80%',
    opacity: 0.5
  }

  return (
    <>
      <div style={bgStyle}>
        <div className="animacja-tla" style={chartStyle}>
          <svg viewBox="0 0 4000 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="gradBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={bgColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={chartPath} fill="url(#gradBg)" stroke={accentColor} strokeWidth="2" />
          </svg>
        </div>
      </div>
      <style>{`
        .animacja-tla {
          animation: ruchTla 60s linear infinite;
        }
        @keyframes ruchTla {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}