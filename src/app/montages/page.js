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
    <main className="prints-gallery max-w-[1200px] mx-auto px-5 pb-16">
      <div className="intro">
        <h1 className="page-title text-center">{title}</h1>
      </div>

      {intro && <p className="page-intro text-center text-neutral-700 mb-8">{intro}</p>}

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-14 gap-x-12">
      {items.map((it, i) => {
  const isWide = !!it.wide
  return (
    <a
      key={i}
      href={it.href || '#'}
      className={`block text-center ${isWide ? 'lg:col-span-3' : ''}`}
    >
      {it.image && (
        <div
          className={[
            'mx-auto flex items-center justify-center',
            isWide ? 'max-w-[1100px]' : 'max-w-[420px]',
            // 👇 fixed image-frame height for equal card heights
            isWide ? '' : 'h-[420px] md:h-[460px]',
          ].join(' ')}
        >
          <img
            src={it.image}
            alt={it.alt || it.title || 'Montage'}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      <div className="print-meta mt-4">
        {it.title && <h2 className="font-semibold text-xl md:text-2xl">{it.title}</h2>}
        {it.subtitle && <p className="text-neutral-600">{it.subtitle}</p>}
      </div>
    </a>
  )
})}

      </div>
    </main>
  )
}

