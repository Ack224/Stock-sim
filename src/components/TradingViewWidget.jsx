import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol }) {
    const container = useRef();
    // Tworzymy unikalny ID dla każdego wykresu, żeby się nie gryzły
    const widgetId = `tv-widget-${symbol}`;

    useEffect(() => {
        // 1. Czyścimy kontener (na wszelki wypadek)
        if (container.current) {
            container.current.innerHTML = "";
        }

        // 2. Tworzymy skrypt
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;

        // 3. Konfigurujemy widget dynamicznie
        script.innerHTML = JSON.stringify({
            "symbol": symbol, // TU WPADA SYMBOL (np. BINANCE:BTCUSDT)
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "dark",
            "isTransparent": true, // Przeźroczyste tło, żeby pasowało do apki
            "autosize": true,
            "largeChartUrl": ""
        });

        container.current.appendChild(script);
    }, [symbol]); // Odśwież, jeśli zmieni się symbol

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "300px", width: "100%" }}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

// Używamy memo, żeby nie przerysowywać bez potrzeby
export default memo(TradingViewWidget);