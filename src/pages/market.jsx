import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext'; // Importujemy hooka
import TradingViewWidget from '../components/TradingViewWidget';

export default function Market() {
    const { theme } = useTheme();
    // Używamy naszych ulubionych
    // zmana halo działaj to ważne 
    //test
    const { toggleFavorite, isFavorite } = useFavorites();

    const isDark = theme === 'dark';
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCoin, setExpandedCoin] = useState(null);

    const textColor = isDark ? 'white' : 'black';
    const cardBg = isDark ? '#1e293b' : '#f8fafc';
    const borderColor = isDark ? '#334155' : '#ccc';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
                );
                setCoins(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Błąd:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleRow = (id) => {
        if (expandedCoin === id) setExpandedCoin(null);
        else setExpandedCoin(id);
    };

    const getChartSymbol = (symbol) => {
        if (symbol.toUpperCase() === 'USDT') return 'COINBASE:USDTUSD';
        if (symbol.toUpperCase() === 'USDC') return 'KRAKEN:USDCUSD';
        return `BINANCE:${symbol.toUpperCase()}USDT`;
    };

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Ładowanie...</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', color: textColor }}>

            <h1 style={{ textAlign: 'center', fontSize: '40px', marginBottom: '30px' }}>
                Rynek Kryptowalut
            </h1>

            {/* NAGŁÓWEK */}
            <div style={{ display: 'flex', fontWeight: 'bold', padding: '10px 20px', borderBottom: '2px solid gray', marginBottom: '10px' }}>
                <div style={{ width: '50px' }}>#</div>
                <div style={{ flex: 1 }}>Nazwa</div>
                <div style={{ width: '120px', textAlign: 'right' }}>Cena</div>
                <div style={{ width: '80px', textAlign: 'right' }}>24h %</div>
                {/* Nowa kolumna na serce */}
                <div style={{ width: '50px', textAlign: 'center' }}>Fav</div>
            </div>

            {/* LISTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {coins.map((coin, index) => {
                    const isExpanded = expandedCoin === coin.id;
                    const symbolWykresu = getChartSymbol(coin.symbol);
                    const kolorZmiany = coin.price_change_percentage_24h >= 0 ? 'green' : 'red';

                    // Sprawdzamy czy jest ulubiony
                    const isFav = isFavorite(coin.id);

                    return (
                        <div key={coin.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '10px', overflow: 'hidden' }}>

                            <div style={{ display: 'flex', alignItems: 'center', padding: '15px 20px' }}>
                                {/* Klikalna część (Otwiera wykres) */}
                                <div onClick={() => toggleRow(coin.id)} style={{ display: 'flex', flex: 1, alignItems: 'center', cursor: 'pointer' }}>
                                    <div style={{ width: '50px', fontWeight: 'bold' }}>{index + 1}</div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img src={coin.image} alt={coin.name} style={{ width: '30px', height: '30px' }} />
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{coin.name}</span>
                                        <span style={{ fontSize: '14px', color: 'gray' }}>{coin.symbol.toUpperCase()}</span>
                                    </div>
                                    <div style={{ width: '120px', textAlign: 'right', fontWeight: 'bold' }}>
                                        ${coin.current_price.toLocaleString()}
                                    </div>
                                    <div style={{ width: '80px', textAlign: 'right', fontWeight: 'bold', color: kolorZmiany }}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </div>
                                </div>

                                {/* PRZYCISK ULUBIONE (Serce) */}
                                <div style={{ width: '50px', textAlign: 'center' }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Żeby nie otwierało wykresu jak klikasz serce
                                            toggleFavorite(coin);
                                        }}
                                        style={{
                                            background: 'transparent', border: 'none', cursor: 'pointer',
                                            fontSize: '24px', color: isFav ? 'red' : 'gray', transition: '0.2s'
                                        }}
                                    >
                                        {isFav ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </div>

                            {isExpanded && (
                                <div style={{ height: '350px', borderTop: '1px solid gray', padding: '10px' }}>
                                    <TradingViewWidget symbol={symbolWykresu} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}