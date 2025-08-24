import { sanityClient } from '@/lib/client'
import { montagesPageQuery } from '@/lib/queries'

export const revalidate = 60

export const metadata = {
  title: 'Dick Jewell – Montages',
}

export default async function MontagesPage() {
  const data = await sanityClient.fetch(montagesPageQuery)
  if (!data) return null

  const { title = 'Montages', intro, items = [] } = data

  return (
    <main className="prints-gallery">
      <div className='intro'>
        <h1 className="page-title">{title}</h1>
      </div>

      {intro && <p className="page-intro">{intro}</p>}

      <div className="prints-grid">
        {items.map((it, i) => (
          <a
            key={i}
            href={it.href || '#'}
            className={`print-item${it.wide ? ' wide' : ''}`}
          >
            {it.image && (
              <img src={it.image} alt={it.alt || it.title || 'Montage'} />
            )}

            <div className="print-meta">
              {it.title && <h2>{it.title}</h2>}
              {it.subtitle && <p>{it.subtitle}</p>}
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
