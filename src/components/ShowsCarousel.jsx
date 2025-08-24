'use client'
import { useState, useMemo } from 'react'

/**
 * slides: array of
 *  - { type: 'image', image: url, alt?, linkHref? }
 *  - { type: 'video', mp4: url, poster?, captionHtml?, linkHref? }
 * withControls: boolean (default true)
 * controlsClass: string (eg. 'carousel-controls-original')
 */
export default function ShowsCarousel({ slides = [], withControls = true, controlsClass }) {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${index * 100}%)` }),
    [index]
  )

  if (!total) return null

  return (
    <div className="show-carousel" data-carousel>
      <div className="show-carousel-track" style={trackStyle}>
        {slides.map((s, i) => {
          // Wrap in link if linkHref provided
          const inner =
            s.type === 'video' ? (
              <div className="show-carousel-image show-video-slide">
                <video
                  className="show-unstable-video"
                  playsInline
                  controls
                  poster={s.poster || undefined}
                >
                  <source src={s.mp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {s.captionHtml && (
                  <p
                    className="show-video-caption"
                    dangerouslySetInnerHTML={{ __html: s.captionHtml }}
                  />
                )}
              </div>
            ) : (
              <img
                src={s.image}
                alt={s.alt || ''}
                className="show-carousel-image"
              />
            )

          return s.linkHref ? (
            <a href={s.linkHref} key={i} target={s.linkTarget || undefined}>
              {inner}
            </a>
          ) : (
            <div key={i}>{inner}</div>
          )
        })}
      </div>

      {withControls && total > 1 && (
        <div className={controlsClass || 'show-carousel-controls-original'}>
          <button
            className="carousel-btn prev"
            aria-label="Previous image"
            onClick={() => setIndex((idx) => (idx - 1 + total) % total)}
          >
            <img src="/images/arrows-etc/point-back.jpg" alt="Back" />
          </button>
          <button
            className="carousel-btn next"
            aria-label="Next image"
            onClick={() => setIndex((idx) => (idx + 1) % total)}
          >
            <img src="/images/arrows-etc/point-forward.jpg" alt="Next" />
          </button>
        </div>
      )}
    </div>
  )
}
