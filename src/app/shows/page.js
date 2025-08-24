import { sanityClient } from '@/lib/client'
import { showsPageQuery } from '@/lib/queries'
import ShowsCarousel from '@/components/ShowsCarousel'

export const revalidate = 60

export const metadata = {
  title: 'Shows – Dick Jewell',
}

export default async function ShowsPage() {
  const data = await sanityClient.fetch(showsPageQuery)
  if (!data) return null

  const { title = 'some of my shows', sections = [] } = data

  return (
    <main className="shows-section">
      <div className='intro'>
          <h1 className="page-title">{title}</h1>
      </div>

      {sections.map((s, i) => (
        <section className="show" key={i} id={s.anchorId || undefined}>
          {s.heading && <h2>{s.heading}</h2>}

          {/* image or mixed slides */}
          { s.slides?.length > 0 && (
            <ShowsCarousel
                slides={s.slides}
                withControls={s.withControls !== false}
                controlsClass="show-carousel-controls-original"   // <— match your CSS
            />
            )}

            { !s.slides?.length && s.singleImage?.image && (
            <div className="show-carousel-track">               
                <img
                src={s.singleImage.image}
                alt={s.singleImage.alt || ''}
                className="show-carousel-image"
                />
            </div>
            ) }

          {/* optional paragraph/caption under a section */}
          {s.caption && (
            <p
              className={s.captionClass || 'show-caption'}
              dangerouslySetInnerHTML={{ __html: s.caption.replace(/\n/g, '<br>') }}
            />
          )}
        </section>
      ))}
    </main>
  )
}
