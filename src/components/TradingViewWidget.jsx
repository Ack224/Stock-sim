import React, { useEffect, useRef, memo } from 'react'

function TradingViewWidget({ symbol }) {
  const container = useRef()

  useEffect(() => {
    if (container.current) container.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: true,
      largeChartUrl: ''
    })

    container.current.appendChild(script)
  }, [symbol])

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '300px', width: '100%' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
}

export default memo(TradingViewWidget)