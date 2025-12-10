import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
    const { theme } = useTheme();

    const [gpwData, setGpwData] = useState({ godzina: '--:--', czyOtwarta: false });
    const [nyseData, setNyseData] = useState({ godzina: '--:--', czyOtwarta: false });

    // Kolory zależne od motywu
    const kolorWykresu = theme === 'dark' ? '#34d399' : '#10b981';
    const cardBg = theme === 'dark' ? '#1e293b' : '#f8fafc'; // Ciemny granat / Jasny szary
    const textColor = theme === 'dark' ? '#fff' : '#1e293b';

    useEffect(() => {
        const interval = setInterval(() => {
            const teraz = new Date();
            setGpwData(sprawdzGielde(teraz, 'Europe/Warsaw', 9, 17));
            setNyseData(sprawdzGielde(teraz, 'America/New_York', 9.5, 16));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
// działaj test test
    return (
        // Usunąłem tło z tego miejsca, bo jest teraz w Layout
        <div style={{ width: '100%', minHeight: '80vh', color: textColor }}>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px' }}>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Karta nazwa="GPW Warszawa" dane={gpwData} godziny="09:00 - 17:00" kolor={kolorWykresu} bg={cardBg} />
                    <Karta nazwa="NYSE New York" dane={nyseData} godziny="15:30 - 22:00 (PL)" kolor={kolorWykresu} bg={cardBg} />
                </div>

                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px' }}>
                    Twoja Giełda <span style={{ color: kolorWykresu }}>StockSim</span>
                </h1>

                <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', marginBottom: '40px' }}>
                    Symulator inwestycyjny. "Jak zarobić, aby się nie narobić".
                </p>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {/* Guziki */}
                    <Link to="/portfolio" style={{ ...btnBase, background: textColor, color: theme === 'dark' ? '#000' : '#fff' }}>
                        Zacznij Grać
                    </Link>

                    <Link to="/market" style={{ ...btnBase, border: '2px solid gray', background: 'transparent', color: 'inherit' }}>
                        Rynek
                    </Link>
                </div>
            </div>
        </div>
    );
}

// --- FUNKCJE POMOCNICZE ---

function sprawdzGielde(data, strefa, start, koniec) {
    const czas = new Date(data.toLocaleString("en-US", { timeZone: strefa }));
    const h = czas.getHours() + (czas.getMinutes() / 60);
    const dzien = czas.getDay();
    const otwarte = (dzien !== 0 && dzien !== 6) && (h >= start && h < koniec);
    return { godzina: czas.toLocaleTimeString('pl-PL'), czyOtwarta: otwarte };
}

function Karta({ nazwa, dane, godziny, kolor, bg }) {
    return (
        <div style={{
            background: bg,
            padding: '20px',
            borderRadius: '12px',
            minWidth: '220px',
            border: `1px solid ${dane.czyOtwarta ? kolor : 'gray'}`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '5px' }}>{nazwa}</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{dane.godzina}</div>
            <div style={{ color: dane.czyOtwarta ? kolor : '#ef4444', fontWeight: 'bold', margin: '5px 0' }}>
                {dane.czyOtwarta ? '🟢 OTWARTA' : '🔴 ZAMKNIĘTA'}
            </div>
            <small style={{ opacity: 0.6 }}>{godziny}</small>
        </div>
    );
}

const btnBase = {
    padding: '15px 35px',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    transition: '0.2s',
    display: 'inline-block'
};