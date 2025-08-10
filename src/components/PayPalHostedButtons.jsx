// src/components/PayPalHostedButtons.jsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

export default function PayPalHostedButtons({ clientId, currency = 'GBP', items = [] }) {
  const containerRefs = useRef([])
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (!sdkReady || !items?.length) return
    if (typeof window === 'undefined' || !window.paypal) return

    items.forEach((item, i) => {
      const el = containerRefs.current[i]
      if (!el || !item?.hostedButtonId) return
      try {
        window.paypal.HostedButtons({ hostedButtonId: item.hostedButtonId }).render(el)
      } catch (e) {
        console.error('PayPal render error', e)
      }
    })
  }, [sdkReady, items])

  if (!clientId) return null

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&disable-funding=venmo&currency=${currency}`}
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
        onError={(e) => console.error('Failed to load PayPal SDK', e)}
      />

      {items.map((item, i) => (
        <div key={i} className="shop-item flex flex-col items-center">
          {item.image && (
            <img
              src={item.image}
              alt={item.label || 'Product'}
              className="mb-3 max-w-[300px] h-auto object-contain"
            />
          )}
          {/* Give PayPal an adequately wide slot */}
          <div
            className="paypal-slot"
            ref={(el) => (containerRefs.current[i] = el)}
          />
        </div>
      ))}
    </>
  )
}
