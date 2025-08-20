import { sanityClient } from '@/lib/client'
import { foundPhotosQuery } from '@/lib/queries'
import Carousel from '@/components/Carousel'

export const revalidate = 60

export const metadata = {
  title: 'Found Photos – Dick Jewell',
}

export default async function FoundPhotosPage() {
  const data = await sanityClient.fetch(foundPhotosQuery)
  if (!data) return null

  const {
    title,
    intro,
    mainCarouselImages = [],
    threeRow = [],
    fullWidthFigure,
    subheading1,
    subintro1,
    secondCarouselImages = [],
    videoRow,
    singleVideo,
    subheading2,
    largeMedia = [],
  } = data

  return (
    <main className="photo-page">
      <h1 className="page-title" style={{ marginTop: '1.5em' }}>{title}</h1>
      {intro && <p className="intro">{intro}</p>}

      {/* 1) MAIN CAROUSEL */}
      {mainCarouselImages.length > 0 && (
        <section className="photo-carousel found-photos">
          <div className="carousel-frame">
            <Carousel images={mainCarouselImages} frameClassName="carousel-frame" />
          </div>
        </section>
      )}

      {/* 2) ROW OF THREE (legacy classes preserved) */}
      <div className="row-of-three">
        {threeRow.map((item, i) => (
          <figure className="media-block" key={i}>
            {item.image && <img src={item.image} alt={item.alt || 'Found Photos'} />}
            {item.caption1 && <figcaption>{item.caption1}</figcaption>}
            {item.caption2 && (
              <figcaption>
                {item.caption2}{' '}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                  >
                    {item.link}
                  </a>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* 3) FULL-WIDTH IMAGE */}
      {fullWidthFigure?.image && (
        <figure className="media-block">
          <img
            src={fullWidthFigure.image}
            alt={fullWidthFigure.alt || fullWidthFigure.caption || 'Found Photos'}
          />
          {fullWidthFigure.caption && <figcaption>{fullWidthFigure.caption}</figcaption>}
        </figure>
      )}

      {/* 4) SUBSECTION + SECOND CAROUSEL */}
      {subheading1 && <h1 className='page-title'>{subheading1}</h1>}
      {subintro1 && <p className="intro">{subintro1}</p>}

      {secondCarouselImages.length > 0 && (
        <section className="photo-carousel second-carousel" style={{ marginBottom: '100px' }}>
          <div className="carousel-frame">
            <Carousel images={secondCarouselImages} frameClassName="carousel-frame" />
          </div>
        </section>
      )}

      {/* 5) VIDEO ROW */}
      {videoRow && (
        <div className="video-row">
          <div className="video-block">
            <iframe
              src={videoRow.leftVimeo}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            {videoRow.leftCaption && <figcaption>{videoRow.leftCaption}</figcaption>}
          </div>

          <figure className="media-block">
            {videoRow.middleImage && (
              <img src={videoRow.middleImage} alt={videoRow.middleAlt || 'Five Time Based Photobooth Portraits'} />
            )}
            {videoRow.middleCaption && (
              <figcaption
                dangerouslySetInnerHTML={{ __html: videoRow.middleCaption.replace(/\n/g, '<br>') }}
              />
            )}
          </figure>

          <div className="video-block">
            <iframe
              src={videoRow.rightVimeo}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            {videoRow.rightCaption && (
              <figcaption
                dangerouslySetInnerHTML={{ __html: videoRow.rightCaption.replace(/\n/g, '<br>') }}
              />
            )}
          </div>
        </div>
      )}

      {/* 6) SINGLE VIDEO */}
      {singleVideo && (
        <div className="video-block">
          <div className="video-wrapper">
            <iframe
              src={singleVideo.src}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
          {singleVideo.caption && (
            <figcaption
              dangerouslySetInnerHTML={{ __html: singleVideo.caption.replace(/\n/g, '<br>') }}
            />
          )}
        </div>
      )}

      {/* 7) LARGE MEDIA SECTION */}
      {subheading2 && <h2>{subheading2}</h2>}

      {largeMedia.map((m, i) => (
        <figure className="large-media-block" key={i}>
          {m.image && <img src={m.image} alt={m.alt || 'Unclaimed Chemists'} />}
          {m.caption && (
            <figcaption dangerouslySetInnerHTML={{ __html: m.caption.replace(/\n/g, '<br>') }} />
          )}
        </figure>
      ))}
    </main>
  )
}
