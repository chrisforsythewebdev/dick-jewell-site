// app/films/[slug]/page.js
import Link from 'next/link'
import { sanityClient } from '@/lib/client'
import { filmBySlugQuery } from '@/lib/queries'
import styles from './film.module.css'
import '../../../styles/styles.css'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { slug } = await params;                         
  const data = await sanityClient.fetch(filmBySlugQuery, { slug })
  const title = data?.seoTitle || data?.title || 'Film'
  return { title }
}

export default async function FilmPage({ params }) {
  const { slug } = await params;                       
  const data = await sanityClient.fetch(filmBySlugQuery, { slug })
  if (!data) return null

  const pt = typeof data.videoPaddingTop === 'number' ? data.videoPaddingTop : 56.25
  const ptMobile = typeof data.videoPaddingTopMobile === 'number' ? data.videoPaddingTopMobile : 75

  return (
    <main className={styles.videoPage}>
        {data.title && <h1 className={styles.h1}>{data.title}</h1>}

      {data.infoLine ? (
        <p><strong>{data.infoLine}</strong></p>
      ) : (data.year || data.duration) ? (
        <p><strong>
          {data.duration ? `${data.duration}` : ''}{data.duration && data.year ? ' — ' : ''}{data.year || ''}
        </strong></p>
      ) : null}

      {Array.isArray(data.preVideo) && data.preVideo.length > 0 && (
        <div className={styles.rich} data-align="center">
          <PortableTextShim value={data.preVideo} />
        </div>
      )}

      {data.mainVideo && (
        <div
          className={styles.videoWrapper}
          style={{ '--pt': `${pt}%`, '--ptMobile': `${ptMobile}%` }}
        >
          <iframe
            src={data.mainVideo}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={data.title}
          />
        </div>
      )}

      {data.mainCaption && (
        <p className={
          data.mainCaptionStyle === 'italic' ? styles.captionItalic :
          data.mainCaptionStyle === 'bold' ? styles.captionBold :
          styles.caption
        }>
          {data.mainCaption}
        </p>
      )}

      {Array.isArray(data.description) && data.description.length > 0 && (
        <div className={`${styles.rich} ${styles.desc}`}>
          <PortableTextShim value={data.description} />
        </div>
      )}

      {Array.isArray(data.imageGrid) && data.imageGrid.length > 0 && (
        <section className={styles.imageGrid}>
          {data.imageGrid.map((im, i) => (
            <figure key={i}>
              <img src={im.url} alt={im.alt || ''} />
              {im.caption && <figcaption>{im.caption}</figcaption>}
            </figure>
          ))}
        </section>
      )}

      {Array.isArray(data.sections) && data.sections.length > 0 && data.sections.map((sec, i) => (
        <section key={i} className={styles.section}>
          {sec.videoUrl && (
            <div
              className={styles.videoWrapper}
              style={{ '--pt': `${pt}%`, '--ptMobile': `${ptMobile}%` }}
            >
              <iframe
                src={sec.videoUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={sec.title || `section-${i + 1}`}
              />
            </div>
          )}

          {sec.title && <h2 className={styles.h2}>{sec.title}</h2>}
          {sec.caption && <p className={styles.caption}>{sec.caption}</p>}

          {Array.isArray(sec.text) && sec.text.length > 0 && (
            <div className={styles.rich}>
              <PortableTextShim value={sec.text} />
            </div>
          )}

          {Array.isArray(sec.images) && sec.images.length > 0 && (
            <div className={styles.imageGrid}>
              {sec.images.map((url, j) => <img key={j} src={url} alt="" />)}
            </div>
          )}
        </section>
      ))}

      {Array.isArray(data.footerImages) && data.footerImages.length > 0 && (
        <div className={styles.footerImg}>
          {data.footerImages.map((f, i) => (
            <div key={i}>
              <img src={f.url} alt={f.alt || ''} />
              {f.caption && <p>{f.caption}</p>}
            </div>
          ))}
        </div>
      )}

      <p>
        <Link href="/films" className={styles.backLink}>
          {data.backLinkLabel || '← back to films'}
        </Link>
      </p>
    </main>
  )
}

function PortableTextShim({ value }) {
  return (
    <>
      {value?.map((block, i) => {
        if (block._type !== 'block') return null
        const text = block.children?.map(ch => ch.text).join('') ?? ''
        return <p key={block._key || i} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
      })}
    </>
  )
}
