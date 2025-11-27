import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

export default function Portfolio() {
    const { theme } = useTheme();

    // --- DANE I STANY ---
    const generateHistory = () => {
        let data = [];
        let price = 100;
        for (let i = 0; i < 50; i++) {
            price = Math.max(10, price + (Math.random() - 0.5) * 4);
            data.push({ id: i, price: price, akcja: null });
        }
        return data;
    };

    const [history, setHistory] = useState(generateHistory);
    const [price, setPrice] = useState(history[history.length - 1].price);
    const [money, setMoney] = useState(() => parseFloat(localStorage.getItem('gameMoney')) || 1000);
    const [shares, setShares] = useState(() => parseInt(localStorage.getItem('gameShares')) || 0);
    const [predkosc, setPredkosc] = useState(1000);
    const [komunikat, setKomunikat] = useState("");
    const counterRef = useRef(50);

    // ZAPIS
    useEffect(() => {
        localStorage.setItem('gameMoney', money);
        localStorage.setItem('gameShares', shares);
    }, [money, shares]);

    // --- SILNIK GRY ---
    useEffect(() => {
        const interval = setInterval(() => {
            setPrice((prevPrice) => {
                const los = Math.random();
                let change = (Math.random() - 0.5) * 6;

                // EVENTY
                if (los < 0.01) { // 1% szans na Krach
                    change = -(prevPrice * 0.30);
                    setKomunikat("📉 KRACH RYNKOWY!");
                    setTimeout(() => setKomunikat(""), 2500);
                }
                else if (los > 0.99) { // 1% szans na Hossę
                    change = (prevPrice * 0.30);
                    setKomunikat("🚀 TO THE MOON!");
                    setTimeout(() => setKomunikat(""), 2500);
                }

                let newPrice = Math.max(1, prevPrice + change);

                setHistory((prev) => {
                    const newPoint = { id: counterRef.current++, price: newPrice, akcja: null };
                    const newHistory = [...prev, newPoint];
                    if (newHistory.length > 50) newHistory.shift();
                    return newHistory;
                });
                return newPrice;
            });
        }, predkosc);
        return () => clearInterval(interval);
    }, [predkosc]);

    // --- FUNKCJE POMOCNICZE ---
    const oznacz = (typ) => {
        setHistory(prev => {
            const kopia = [...prev];
            kopia[kopia.length - 1] = { ...kopia[kopia.length - 1], akcja: typ };
            return kopia;
        });
    };

    const kup = () => { if (money >= price) { setShares(shares + 1); setMoney(money - price); oznacz('kupno'); } };
    const kupMax = () => { const ile = Math.floor(money / price); if (ile > 0) { setShares(shares + ile); setMoney(money - ile * price); oznacz('kupno'); } };
    const sprzedaj = () => { if (shares > 0) { setShares(shares - 1); setMoney(money + price); oznacz('sprzedaz'); } };
    const sprzedajMax = () => { if (shares > 0) { setMoney(money + shares * price); setShares(0); oznacz('sprzedaz'); } };
    const reset = () => { setMoney(1000); setShares(0); setHistory(generateHistory()); setKomunikat(""); };

    // Kropka na wykresie
    const Kropka = ({ cx, cy, payload }) => {
        if (payload.akcja === 'kupno') return <circle cx={cx} cy={cy} r={6} fill="#10b981" stroke="white" strokeWidth={2} />;
        if (payload.akcja === 'sprzedaz') return <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="white" strokeWidth={2} />;
        return null;
    };

    const txtColor = theme === 'dark' ? 'white' : '#1e293b';

    return (
        // DODANO position: relative, żeby alert wiedział względem czego się ustawić
        <div style={{ position: 'relative', padding: '20px', maxWidth: '800px', margin: '0 auto', color: txtColor, minHeight: '85vh' }}>

            <h1 style={{ textAlign: 'center' }}>Giełda: CyberCoin</h1>

            {/* ALERT / KOMUNIKAT (TERAZ LATA NAD WSZYSTKIM) */}
            {komunikat && (
                <div style={{
                    position: 'absolute',      // To sprawia, że nie przesuwa innych elementów
                    top: '150px',              // Pozycja od góry
                    left: '50%',               // Środek poziomo
                    transform: 'translate(-50%, 0)', // Idealne wyśrodkowanie
                    zIndex: 100,               // Musi być nad wykresem
                    padding: '15px 30px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)', // Cień dla efektu 3D
                    backgroundColor: komunikat.includes('KRACH') ? '#ef4444' : '#10b981',
                    color: 'white',
                    border: '2px solid white',
                    animation: 'wyskoczenie 0.3s ease-out forwards' // Animacja wejścia
                }}>
                    {komunikat}
                </div>
            )}

            {/* DEFINICJA ANIMACJI CSS */}
            <style>{`
                @keyframes wyskoczenie {
                    0% { transform: translate(-50%, 20px); opacity: 0; }
                    80% { transform: translate(-50%, -5px); opacity: 1; }
                    100% { transform: translate(-50%, 0); opacity: 1; }
                }
            `}</style>

            {/* GÓRNY PASEK */}
            <div style={{ display: 'flex', justifyContent: 'space-around', background: theme === 'dark' ? '#334155' : '#f1f5f9', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                <div>Kasa: <b style={{ color: '#10b981' }}>${money.toFixed(2)}</b></div>
                <div>Akcje: <b style={{ color: '#3b82f6' }}>{shares}</b></div>
                <div>Wartość: <b>${(money + shares * price).toFixed(2)}</b></div>
            </div>

            {/* WYKRES */}
            <div style={{ height: '350px', background: theme === 'dark' ? '#0f172a' : '#fff', borderRadius: '12px', padding: '10px', border: '1px solid #ccc' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#eee'} />
                        <YAxis domain={['auto', 'auto']} width={40} tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: theme === 'dark' ? '#000' : '#fff' }} formatter={(v) => [v.toFixed(2), 'Cena']} />
                        <Line type="linear" dataKey="price" stroke={theme === 'dark' ? '#4ade80' : '#2563eb'} strokeWidth={3} isAnimationActive={false} dot={<Kropka />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', margin: '10px 0' }}>${price.toFixed(2)}</h2>

            {/* PRĘDKOŚĆ */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>Prędkość:</span>
                <button onClick={() => setPredkosc(2000)} style={btnSpeed(predkosc === 2000)}>Wolno</button>
                <button onClick={() => setPredkosc(1000)} style={btnSpeed(predkosc === 1000)}>Normalnie</button>
                <button onClick={() => setPredkosc(250)} style={btnSpeed(predkosc === 250)}>🔥 Szybko</button>
            </div>

            {/* PRZYCISKI AKCJI */}
            <div style={{ maxWidth: '450px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={kup} disabled={money < price} style={btnAction('green')}>KUP</button>
                    <button onClick={sprzedaj} disabled={shares === 0} style={btnAction('red')}>SPRZEDAJ</button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={kupMax} disabled={money < price} style={{ ...btnAction('green'), border: '2px solid gold' }}>KUP MAX</button>
                    <button onClick={sprzedajMax} disabled={shares === 0} style={{ ...btnAction('red'), border: '2px solid orange' }}>SPRZEDAJ MAX</button>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button onClick={reset} style={{ background: 'none', border: 'none', color: 'gray', cursor: 'pointer', textDecoration: 'underline' }}>Reset gry</button>
            </div>
        </div>
    );
}

// Style pomocnicze
const btnAction = (col) => ({
    flex: 1, padding: '15px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer',
    background: col === 'green' ? '#10b981' : '#ef4444', opacity: 0.9
});
const btnSpeed = (active) => ({
    padding: '5px 15px', borderRadius: '20px', border: '1px solid gray', cursor: 'pointer',
    background: active ? '#3b82f6' : 'transparent', color: active ? 'white' : 'inherit', fontWeight: active ? 'bold' : 'normal'
});