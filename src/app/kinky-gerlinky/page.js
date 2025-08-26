import { sanityClient } from '@/lib/client'
import { kinkyGerlinkyHeaderQuery, kinkyGerlinkyPageQuery } from '@/lib/queries'
import KGHeader from '@/components/KGHeader' // the pink banner + subnav

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – Dick Jewell' }

export default async function KinkyGerlinkyPage() {
  const [header, page] = await Promise.all([
    sanityClient.fetch(kinkyGerlinkyHeaderQuery),
    sanityClient.fetch(kinkyGerlinkyPageQuery),
  ])
  if (!page) return null

  const { title = 'Kinky Gerlinky', intro, leftGallery = [], screenings } = page

  return (
    <main>
      {/* Pink banner + four links (trailer / watch film / watch VHS / reviews) */}
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />

      {/* If you want a page title/intro under the banner (optional) */}
      {/* <h1 className="page-title">{title}</h1>
      {intro && <p className="page-intro">{intro}</p>} */}

      {/* Split layout exactly like the original */}
      <section className="kg-layout">
        {/* Left: gallery of figures */}
        <div className="kg-gallery">
          {leftGallery.map((f, i) => (
            <figure key={i}>
              {f.image && <img src={f.image} alt={f.alt || f.caption || ''} />}
              {f.caption && <figcaption>{f.caption}</figcaption>}
            </figure>
          ))}
        </div>

        {/* Right: screenings column */}
        <div className="screenings">
          {screenings?.heading && <h2>{screenings.heading}</h2>}

          {screenings?.blocks?.map((b, i) => (
            <div key={i}>
              {b.image && <img src={b.image} alt={b.alt || ''} />}
              {b.textHtml && (
                <p dangerouslySetInnerHTML={{ __html: b.textHtml }} />
              )}
            </div>
          ))}

          {Array.isArray(screenings?.extraList) && screenings.extraList.length > 0 && (
            <div className="screening-info">
              {screenings.extraList.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}

          {screenings?.closingHtml && (
            <p dangerouslySetInnerHTML={{ __html: screenings.closingHtml }} />
          )}
        </div>
      </section>
    </main>
  )
}
