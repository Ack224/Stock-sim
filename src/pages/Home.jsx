import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
    const { theme } = useTheme();

    const [gpwData, setGpwData] = useState({ godzina: '--:--', czyOtwarta: false });
    const [nyseData, setNyseData] = useState({ godzina: '--:--', czyOtwarta: false });
    const [wykresSciezka, setWykresSciezka] = useState("");

    const kolorWykresu = theme === 'dark' ? '#34d399' : '#10b981';
    const kolorTlaWykresu = theme === 'dark' ? '#0f172a' : '#525252ff';

    useEffect(() => {
        const interval = setInterval(() => {
            const teraz = new Date();
            setGpwData(sprawdzGielde(teraz, 'Europe/Warsaw', 9, 17));
            setNyseData(sprawdzGielde(teraz, 'America/New_York', 9.5, 16));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let sciezka = "M0,400";
        let wys = 400;
        for (let i = 1; i <= 150; i++) {
            const zmiana = (Math.random() - 0.5) * 150;
            wys += zmiana;
            if (wys < 50) wys = 100;
            if (wys > 550) wys = 500;
            sciezka += ` L${i * 40},${wys}`;
        }
        setWykresSciezka(sciezka + " L6000,800 L0,800 Z");
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '92vh', overflow: 'hidden', backgroundColor: theme === 'dark' ? '#111' : 'white', color: theme === 'dark' ? 'white' : 'black' }}>

            <div className="animacja-tla" style={{ position: 'absolute', bottom: -50, left: 0, width: '200%', height: '80%', zIndex: 0, opacity: 0.5 }}>
                <svg viewBox="0 0 4000 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={kolorWykresu} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={kolorTlaWykresu} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={wykresSciezka} fill="url(#grad)" stroke={kolorWykresu} strokeWidth="2" />
                </svg>
            </div>

            <style>{`
                .animacja-tla { animation: ruch 40s linear infinite; }
                @keyframes ruch { from {transform: translateX(0);} to {transform: translateX(-50%);} }
            `}</style>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px', textAlign: 'center' }}>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Karta nazwa="GPW Warszawa" dane={gpwData} godziny="09:00 - 17:00" kolor={kolorWykresu} bg={theme === 'dark' ? '#222' : '#f9f9f9'} />
                    <Karta nazwa="NYSE New York" dane={nyseData} godziny="15:30 - 22:00 (PL)" kolor={kolorWykresu} bg={theme === 'dark' ? '#222' : '#f9f9f9'} />
                </div>

                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px' }}>
                    Twoja Giełda <span style={{ color: kolorWykresu }}>StockSim</span>
                </h1>

                <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', marginBottom: '40px' }}>
                    Symulator inwestycyjny. "jak zarobić aby się nie narobić"
                </p>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/Symulator" style={{ ...btnBase, background: theme === 'dark' ? 'white' : 'black', color: theme === 'dark' ? 'black' : 'white' }}>Zacznij Grać</Link>
                    <Link to="/market" style={{ ...btnBase, border: '2px solid gray', background: 'transparent', color: 'inherit' }}>Rynek</Link>
                </div>
            </div>
        </div>
    );
}

function sprawdzGielde(data, strefa, start, koniec) {
    const czas = new Date(data.toLocaleString("en-US", { timeZone: strefa }));
    const h = czas.getHours() + (czas.getMinutes() / 60);
    const dzien = czas.getDay();
    const otwarte = (dzien !== 0 && dzien !== 6) && (h >= start && h < koniec);
    return { godzina: czas.toLocaleTimeString('pl-PL'), czyOtwarta: otwarte };
}

function Karta({ nazwa, dane, godziny, kolor, bg }) {
    return (
        <div style={{ background: bg, padding: '20px', borderRadius: '12px', minWidth: '220px', border: `1px solid ${dane.czyOtwarta ? kolor : 'gray'}` }}>
            <h3>{nazwa}</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{dane.godzina}</div>
            <div style={{ color: dane.czyOtwarta ? kolor : '#ef4444', fontWeight: 'bold' }}>
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
    transition: '0.2s'
};