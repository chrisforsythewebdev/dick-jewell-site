'use client'

import { useState } from 'react'

export default function Carousel({ images }) {
  const [index, setIndex] = useState(0)

  const handleNext = () => setIndex((prev) => (prev + 1) % images.length)
  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className="photo-carousel">
      <div className="carousel-frame">
        <img id="carouselImage" src={images[index]} alt="Carousel" />
      </div>
      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-btn prev" aria-label="Previous image">
          <img src="/images/arrows-etc/point-back.jpg" alt="Back" />
        </button>
        <button onClick={handleNext} className="carousel-btn next" aria-label="Next image">
          <img src="/images/arrows-etc/point-forward.jpg" alt="Next" />
        </button>
      </div>
    </section>
  )
}
