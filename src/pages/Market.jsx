import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import TradingViewWidget from '../components/TradingViewWidget';

export default function Market() {
    const { theme } = useTheme();
    const { toggleFavorite, isFavorite } = useFavorites();

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCoin, setExpandedCoin] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const isDark = theme === 'dark';
    const textColor = isDark ? 'white' : 'black';
    const cardBg = isDark ? '#1e293b' : '#f8fafc';
    const borderColor = isDark ? '#334155' : '#ccc';
    const inputBg = isDark ? '#0f172a' : '#fff';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
                );
                setCoins(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleRow = (id) => {
        setExpandedCoin(expandedCoin === id ? null : id);
    };

    const getChartSymbol = (symbol) => {
        const s = symbol.toUpperCase();
        if (s === 'USDT') return 'COINBASE:USDTUSD';
        if (s === 'USDC') return 'KRAKEN:USDCUSD';
        return `BINANCE:${s}USDT`;
    };

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: textColor }}>Ładowanie...</h2>;

    return (
        <div style={{ 
            height: 'calc(100vh - 80px)', 
            display: 'flex',              
            flexDirection: 'column',      
            maxWidth: '1000px', 
            margin: '0 auto', 
            color: textColor,
            padding: '10px'
        }}>
            
            

            <div>
                <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
                    Rynek Kryptowalut
                </h1>

                <input 
                    type="text" 
                    placeholder="Szukaj (np. BTC)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        marginBottom: '10px',
                        borderRadius: '10px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: inputBg,
                        color: textColor,
                        fontSize: '16px',
                        outline: 'none'
                    }}
                />

                <div className="header-row" style={{ 
                    display: 'flex', 
                    fontWeight: 'bold', 
                    padding: '10px 15px', 
                    borderBottom: '2px solid gray', 
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: 'gray'
                }}>
                    <div style={{ width: '40px' }}>#</div>
                    <div style={{ flex: 1 }}>Nazwa</div>
                    <div style={{ width: '100px', textAlign: 'right', marginRight: '50px' }}>Cena / 24h</div>
                    <div style={{ width: '30px' }}></div>
                </div>
            </div>

            <div style={{ 
                flex: 1,              
                overflowY: 'auto',    
                paddingBottom: '20px', 
                paddingRight: '5px',
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#475569 #1e293b' : '#ccc #f1f1f1'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredCoins.length > 0 ? (
                        filteredCoins.map((coin) => {
                            const isExpanded = expandedCoin === coin.id;
                            const isFav = isFavorite(coin.id);
                            const isGreen = coin.price_change_percentage_24h >= 0;

                            return (
                                <div key={coin.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '10px', overflow: 'hidden' }}>
                                    
                                    <div className="row-container" onClick={() => toggleRow(coin.id)}>
                                        <div className="rank">{coin.market_cap_rank}</div>
                                        
                                        <div className="info">
                                            <img src={coin.image} alt={coin.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                            <div>
                                                <span style={{ fontWeight: 'bold', display: 'block' }}>{coin.name}</span>
                                                <span style={{ fontSize: '12px', color: 'gray' }}>{coin.symbol.toUpperCase()}</span>
                                            </div>
                                        </div>

                                        <div className="prices">
                                            <span className="price-main">${coin.current_price?.toLocaleString()}</span>
                                            <span className="price-percent" style={{ color: isGreen ? '#10b981' : '#ef4444' }}>
                                                {coin.price_change_percentage_24h?.toFixed(2)}%
                                            </span>
                                        </div>

                                        <div onClick={(e) => { e.stopPropagation(); toggleFavorite(coin); }} style={{ padding: '5px', cursor: 'pointer', fontSize: '20px' }}>
                                            {isFav ? '❤️' : '🤍'}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div style={{ height: '350px', borderTop: `1px solid ${borderColor}`, padding: '10px', background: 'transparent' }}>
                                            <TradingViewWidget symbol={getChartSymbol(coin.symbol)} />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                            Brak wyników
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}