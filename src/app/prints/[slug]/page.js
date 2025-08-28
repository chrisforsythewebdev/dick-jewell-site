import Link from 'next/link'
import { sanityClient } from '@/lib/client'
import { printBySlugQuery } from '@/lib/queries'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const data = await sanityClient.fetch(printBySlugQuery, { slug: params.slug })
  return { title: data?.seoTitle || data?.title || 'Print – Dick Jewell' }
}

export default async function PrintDetailPage({ params }) {
  const data = await sanityClient.fetch(printBySlugQuery, { slug: params.slug })
  if (!data) return null

  const { title, year, process, dimensions, description = [], descriptionPosition = 'belowAll', images = [] } = data
  const first = images[0]
  const rest = images.slice(1)

  return (
    <main className="print-detail" style={{ margin: '2rem auto', maxWidth: 1000, textAlign: 'center', padding: '0 1rem' }}>
    {/* match legacy */}
      <p className="back-link">
        <Link href="/prints">← Back to prints</Link>
      </p>
        
      {title && <h1 style={{fontWeight: 'bold' }}>{title}</h1>}

      {/* simple helper for line breaks inside captions */}
      <StyleHelpers />

      {/* first image */}
      {first?.url && (
        <Figure im={first} title={title} />
      )}

      {/* description between first & second (e.g. 750 Mug Shots) */}
      {descriptionPosition === 'afterFirst' && description?.length > 0 && (
        <section className="print-description" style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: '1rem 0', fontWeight: 'bold' }}>
          <PortableTextShim value={description} />
        </section>
      )}

      {/* remaining images */}
      {rest.map((im, i) => <Figure key={i} im={im} title={title} />)}

      {/* description below all images (default) */}
      {descriptionPosition !== 'afterFirst' && description?.length > 0 && (
        <section className="print-description" style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: '1rem 0', fontWeight: 'bold'  }}>
          <PortableTextShim value={description} />
        </section>
      )}

      {/* Meta line BELOW images (used by Idol Worship) */}
      {(process || dimensions) && (
        <div className="print-meta" style={{ fontSize: '1rem', marginTop: '.5rem', fontWeight: 'bold' }}>
          {[process, dimensions].filter(Boolean).join(' - ')}
        </div>
      )}
    </main>
  )
}

function Figure({ im, title }) {
  const style = im.desktopHeightPx
    ? { height: `${im.desktopHeightPx}px`, width: 'auto' }
    : { maxWidth: '100%', height: 'auto' }

  return (
    <figure style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
      <img
        src={im.url}
        alt={stripTags(im.caption) || title || 'print image'}
        className={im.desktopHeightPx ? 'tall-img' : undefined}
        style={style}
      />
      {im.caption && (
        <figcaption
          dangerouslySetInnerHTML={{ __html: im.caption.replace(/\n/g, '<br/>') }}
          style={{ fontWeight: 'bold', marginTop: '.5rem' }}
        />
      )}
    </figure>
  )
}

// NULL-SAFE
function stripTags(s) {
  return (s ?? '').toString().replace(/<[^>]*>/g, '')
}

function StyleHelpers() {
  // matches your legacy “700px desktop, auto on phones” behaviour
  return (
    <style>{`
      @media (max-width: 768px) {
        .tall-img { height: auto !important; max-width: 100%; }
      }
    `}</style>
  )
}

/* super light PT renderer; swap for @portabletext/react if you have it globally */
function PortableTextShim({ value }) {
  return (
    <>
      {value?.map((block, i) => {
        if (block._type !== 'block') return null
        const html = (block.children || []).map(ch => ch.text || '').join('').replace(/\n/g, '<br/>')
        return <p key={block._key || i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </>
  )
}
