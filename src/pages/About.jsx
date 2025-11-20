import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Portfolio() {

    // 1. GENEROWANIE HISTORII NA START
    const generateHistory = () => {
        const data = [];
        let currentPrice = 100;
        for (let i = 0; i < 50; i++) { // 50 punktów historii
            const change = (Math.random() - 0.5) * 4;
            currentPrice = Math.max(10, currentPrice + change);
            data.push({ id: i, price: currentPrice }); // Każdy punkt ma unikalne ID
        }
        return data;
    };

    // 2. STANY
    const [history, setHistory] = useState(() => generateHistory());
    const [price, setPrice] = useState(() => history[history.length - 1].price);

    // Licznik, żeby każdy kolejny punkt miał wyższe ID (dzięki temu wykres się przesuwa)
    const counterRef = useRef(50);

    const [money, setMoney] = useState(() => {
        const saved = localStorage.getItem('gameMoney');
        return saved ? parseFloat(saved) : 1000;
    });

    const [shares, setShares] = useState(() => {
        const saved = localStorage.getItem('gameShares');
        return saved ? parseInt(saved) : 0;
    });

    // 3. ZAPIS DO PAMIĘCI
    useEffect(() => {
        localStorage.setItem('gameMoney', money);
        localStorage.setItem('gameShares', shares);
    }, [money, shares]);

    // 4. SYMULACJA RYNKU (Interwał)
    useEffect(() => {
        const interval = setInterval(() => {
            setPrice((prevPrice) => {
                const change = (Math.random() - 0.5) * 6; // Zmienność ceny
                let newPrice = prevPrice + change;
                if (newPrice < 10) newPrice = 10; // Minimalna cena to 10$

                setHistory((prevHistory) => {
                    const newId = counterRef.current++; // Zwiększamy licznik
                    const newHistory = [...prevHistory, { id: newId, price: newPrice }];

                    // Usuwamy stary punkt, żeby wykres nie był nieskończenie długi
                    if (newHistory.length > 50) newHistory.shift();

                    return newHistory;
                });

                return newPrice;
            });
        }, 1000); // Co 1 sekundę

        return () => clearInterval(interval);
    }, []);

    // KUPNO / SPRZEDAŻ
    const handleBuy = () => {
        if (money >= price) {
            setShares(shares + 1);
            setMoney(money - price);
        }
    };

    const handleSell = () => {
        if (shares > 0) {
            setShares(shares - 1);
            setMoney(money + price);
        }
    };

    const handleReset = () => {
        setMoney(1000);
        setShares(0);
        counterRef.current = 50;
        const newHistory = generateHistory();
        setHistory(newHistory);
        setPrice(newHistory[newHistory.length - 1].price);
    };

    const totalValue = money + (shares * price);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>

            <h1 style={{ textAlign: 'center' }}>Giełda: CyberCoin (CBC)</h1>

            {/* PANEL WYNIKÓW */}
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                background: '#1e293b', color: 'white', padding: '20px',
                borderRadius: '12px', marginBottom: '20px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8em', opacity: 0.7 }}>GOTÓWKA</div>
                    <div style={{ fontSize: '1.4em', color: '#4caf50', fontWeight: 'bold' }}>${money.toFixed(2)}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8em', opacity: 0.7 }}>AKCJE</div>
                    <div style={{ fontSize: '1.4em', color: '#3b82f6', fontWeight: 'bold' }}>{shares}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8em', opacity: 0.7 }}>WARTOŚĆ</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 'bold' }}>${totalValue.toFixed(2)}</div>
                </div>
            </div>

            {/* WYKRES */}
            <div style={{ height: '300px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px', marginBottom: '20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        {/* domain=['auto', 'auto'] sprawia, że wykres skaluje się do ceny */}
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide={false} width={40} tick={{ fontSize: 11 }} />
                        <Tooltip
                            isAnimationActive={false} // Wyłączamy animację tooltipa
                            labelStyle={{ display: 'none' }}
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Cena']}
                        />
                        <Line
                            type="linear" // 'linear' jest bardziej kanciasty i stabilny niż 'monotone'
                            dataKey="price"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false} // KLUCZOWE: Wyłącza "pływanie" linii
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* PRZYCISKI */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                    ${price.toFixed(2)}
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button
                        onClick={handleBuy}
                        disabled={money < price}
                        style={{
                            padding: '12px 40px', fontSize: '1.1em', fontWeight: 'bold',
                            backgroundColor: money >= price ? '#10b981' : '#cbd5e1',
                            color: 'white', border: 'none', borderRadius: '8px', cursor: money >= price ? 'pointer' : 'not-allowed'
                        }}
                    >
                        KUP
                    </button>

                    <button
                        onClick={handleSell}
                        disabled={shares === 0}
                        style={{
                            padding: '12px 40px', fontSize: '1.1em', fontWeight: 'bold',
                            backgroundColor: shares > 0 ? '#ef4444' : '#cbd5e1',
                            color: 'white', border: 'none', borderRadius: '8px', cursor: shares > 0 ? 'pointer' : 'not-allowed'
                        }}
                    >
                        SPRZEDAJ
                    </button>
                </div>

                <button onClick={handleReset} style={{ marginTop: '20px', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#888' }}>
                    Zresetuj grę
                </button>
            </div>

        </div>
    );
}