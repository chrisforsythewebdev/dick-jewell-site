import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/client'
import { allPrintsQuery } from '@/lib/queries'

export const revalidate = 60

export default async function PrintsPage() {
  const prints = await sanityClient.fetch(allPrintsQuery)

  // map layout/align to the CSS classes 
  const classFromLayout = (p) => {
    const layout =
      p.layout === 'wide' ? 'wide' :
      p.layout === 'medium' ? 'medium' : ''
    const align =
      p.align === 'left' ? 'align-left' :
      p.align === 'right' ? 'align-right' : ''
    return `${layout} ${align}`.trim()
  }

  return (
    <main className="print-page-gallery">
      <h1 className="page-title">Prints</h1>
      <p className="page-intro">A selection of prints (click on image for enlargement)</p>

      <div className="print-page-grid">
        {prints.map((p) => {
          const src = p.thumbnail
          return (
            <Link
              key={p._id}
              href={`/prints/${p.slug.current}`}
              className={`print-page-item ${classFromLayout(p)}`}
            >
              {src && (
                <Image
                  src={src}
                  alt={p.title}
                  width={800}
                  height={800}
                  className=""
                />
              )}
              <div className="print-meta">
                <h2>{p.title}</h2>
                {(p.process || p.year) && (
                  <p>{p.process || ''}{p.process && p.year ? ' ' : ''}{!p.process && p.year ? '' : ''}{p.year}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
