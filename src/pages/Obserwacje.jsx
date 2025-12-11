import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext'; // Importujemy ulubione
import TradingViewWidget from '../components/TradingViewWidget'; // Importujemy wykres

export default function Portfolio() {
    const { theme } = useTheme();
    const { favorites, toggleFavorite } = useFavorites(); // Pobieramy listę ulubionych i funkcję usuwania

    const isDark = theme === 'dark';
    const [expandedCoin, setExpandedCoin] = useState(null); // Pamięta, który wykres jest otwarty

    // Proste kolory
    const textColor = isDark ? 'white' : 'black';
    const cardBg = isDark ? '#1e293b' : '#f8fafc';
    const borderColor = isDark ? '#334155' : '#ccc';

    // Funkcja otwierania wykresu (kopiuj-wklej z Market)
    const toggleRow = (id) => {
        if (expandedCoin === id) setExpandedCoin(null);
        else setExpandedCoin(id);
    };

    // Funkcja naprawiająca symbol dla wykresu (kopiuj-wklej z Market)
    const getChartSymbol = (symbol) => {
        if (symbol.toUpperCase() === 'USDT') return 'COINBASE:USDTUSD';
        if (symbol.toUpperCase() === 'USDC') return 'KRAKEN:USDCUSD';
        return `BINANCE:${symbol.toUpperCase()}USDT`;
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: textColor }}>

            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Twoje Obserwowane</h1>

            {/* 1. Co pokazać, jak nie ma ulubionych? */}
            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.6 }}>
                    <h2>Nic nie obserwujesz</h2>
                    <p>Idz dodaj coś do obserwacji</p>
                </div>
            ) : (
                /* 2. Lista ulubionych */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {favorites.map((coin) => {
                        const isExpanded = expandedCoin === coin.id;
                        const tvSymbol = getChartSymbol(coin.symbol);

                        return (
                            <div key={coin.id} style={{
                                backgroundColor: cardBg,
                                border: `1px solid ${borderColor}`,
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}>

                                {/* PASEK Z INFORMACJAMI (Klikalny) */}
                                <div
                                    onClick={() => toggleRow(coin.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', padding: '15px',
                                        cursor: 'pointer',
                                        backgroundColor: isExpanded ? 'rgba(0,0,0,0.1)' : 'transparent'
                                    }}
                                >
                                    {/* Obrazek */}
                                    <img src={coin.image} style={{ width: '35px', marginRight: '15px' }} />

                                    {/* Nazwa */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{coin.name}</div>
                                    </div>

                                    {/* Cena */}
                                    <div style={{ fontWeight: 'bold', marginRight: '20px' }}>
                                        ${coin.current_price.toLocaleString()}
                                    </div>

                                    {/* Przycisk USUŃ (Kosz) */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ważne: żeby nie otwierało wykresu przy usuwaniu
                                            toggleFavorite(coin);
                                        }}
                                        style={{
                                            background: 'transparent', border: '1px solid red',
                                            color: 'red', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer'
                                        }}
                                    >
                                        Usuń
                                    </button>
                                </div>

                                {/* WYKRES (Tylko jak rozwinięte) */}
                                {isExpanded && (
                                    <div style={{ height: '350px', borderTop: '1px solid gray', padding: '10px' }}>
                                        <TradingViewWidget symbol={tvSymbol} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}