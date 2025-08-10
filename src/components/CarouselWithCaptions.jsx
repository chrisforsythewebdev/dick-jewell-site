// src/components/CarouselWithCaptions.jsx
'use client'

import { useState } from 'react'

/**
 * items: [{ image, caption }]
 * frameClassName: class applied to outer image frame (e.g., "carousel-frame")
 * heightDesktop: number (px) for desktop frame height (e.g., 600)
 */
export default function CarouselWithCaptions({ items = [], frameClassName = '', heightDesktop = 600 }) {
  const [index, setIndex] = useState(0)
  if (!items.length) return null

  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  return (
    <>
      <div
        className={`${frameClassName} flex items-center justify-center overflow-hidden`}
        style={{ height: heightDesktop }}
      >
        <img
          src={items[index].image}
          alt={items[index].caption || 'Carousel image'}
          className="carousel-image max-h-full max-w-full w-auto h-auto object-contain mx-auto"
        />
      </div>
      {items[index].caption && (
        <p className="carousel-caption text-center max-w-[800px] mx-auto">
          {items[index].caption}
        </p>
      )}

      <div className="carousel-controls flex justify-center gap-6 my-3">
        <button className="carousel-btn prev" aria-label="Previous image" onClick={prev}>
          <img src="/images/arrows-etc/point-back.jpg" alt="Back" />
        </button>
        <button className="carousel-btn next" aria-label="Next image" onClick={next}>
          <img src="/images/arrows-etc/point-forward.jpg" alt="Next" />
        </button>
      </div>


    </>
  )
}
