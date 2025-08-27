// app/kinky-gerlinky/reviews/ReviewsCarousel.jsx
'use client'
import { useState } from 'react'
import styles from './reviews.module.css'

export default function ReviewsCarousel({ items, arrows }) {
  const [i, setI] = useState(0)
  const n = items?.length ?? 0
  if (!n) return null

  const fore = arrows?.next || '/images/arrows-etc/forehand.gif'
  const back = arrows?.back || '/images/arrows-etc/backhand.gif'

  const isFirst = i === 0
  const label = isFirst ? 'NEXT' : 'BACK'
  const icon = isFirst ? fore : back

  const toggle = () => {
    if (n === 1) return
    // For 2 items this exactly mirrors the legacy behavior
    setI(isFirst ? Math.min(i + 1, n - 1) : Math.max(i - 1, 0))
  }

  return (
    <div className={styles.carousel}>
      <button type="button" className={styles.btn} onClick={toggle}>
        {label} <img src={icon} alt={label} />
      </button>

      <img className={styles.image} src={items[i].url} alt={items[i].alt || 'Review'} />
      {items[i].caption && <div className={styles.caption}>{items[i].caption}</div>}
    </div>
  )
}
