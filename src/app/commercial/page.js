import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/client'
import { commercialPageQuery } from '@/lib/queries'

export const revalidate = 60
export const metadata = { title: 'Dick Jewell – Commercial' }

export default async function CommercialPage() {
  const data = await sanityClient.fetch(commercialPageQuery)
  if (!data) return null

  const { title = 'Commercial', intro, items = [], miniGalleries = [], singleImages = [] } = data

  return (
    <main className="commercial-gallery">
      <div className='intro'>
          <h1 className="page-title">{title}</h1>
      </div>
      {intro && <p className="page-intro">{intro}</p>}

      {/* main grid of linked items */}
      <div className="commercial-grid">
        {items.map((it, i) => {
          const thumb = it.thumb?.assetUrl
          const hover = it.hoverThumb?.assetUrl
          const alt = it.alt || it.title || 'Commercial'
          const href = `/commercial/${it.slug}`

          return (
            <Link key={it._key || i} href={href} className="commercial-item">
  <div className="commercial-image-wrapper">
    <img src={thumb} alt={alt} />
    {hover && <img src={hover} alt="" aria-hidden="true" className="hover-img" />}
  </div>
  <div className="commercial-meta">
    {it.captionHtml
      ? <p dangerouslySetInnerHTML={{ __html: it.captionHtml }} />
      : <p>{it.caption?.replace(/\n/g, '<br/>')}</p>}
  </div>
</Link>

          )
        })}
      </div>

      {/* Optional “video grid” single images with captions (e.g. 200 Tongues Drink Dispenser) */}
      {singleImages.length > 0 && (
        <section className="video-grid" style={{ marginBottom: '2em' }}>
          {singleImages.map((s, i) => (
            <div className="video-item" key={s._key || i}>
              {s.image?.assetUrl && <img src={s.image.assetUrl} alt={s.alt || ''} />}
              {s.caption && <div className="video-caption">{s.caption}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Mini galleries (wraps with your CSS) */}
      {miniGalleries.map((gal, gi) => (
        <div className="mini-gallery" key={gal._key || gi}>
          {/* optional wrapper to mimic old “top-row-wrapper” block */}
          {gal.wrapTopRow ? (
            <div className="top-row-wrapper">
              <div className="top-row">
                {gal.images?.map((im, ii) => (
                  <img key={im._key || ii} src={im.assetUrl} alt={im.alt || ''} />
                ))}
              </div>
              {gal.groupCaption && (
                <div className="commercial-meta">
                  <p>{gal.groupCaption}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="top-row">
                {gal.images?.map((im, ii) => (
                  <img key={im._key || ii} src={im.assetUrl} alt={im.alt || ''} />
                ))}
              </div>
              {gal.groupCaption && (
                <div className="commercial-meta">
                  <p>{gal.groupCaption}</p>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </main>
  )
}
