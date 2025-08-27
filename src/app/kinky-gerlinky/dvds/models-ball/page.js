import { sanityClient } from '@/lib/client'
import { kinkyGerlinkyHeaderQuery, KG_MODELS_BALL } from '@/lib/queries'
import KGHeader from '@/components/KGHeader'
import { PortableText } from '@portabletext/react'
import styles from './modelsball.module.css'

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – Models Ball' }

export default async function ModelsBallPage() {
  const [data, header] = await Promise.all([
    sanityClient.fetch(KG_MODELS_BALL),
    sanityClient.fetch(kinkyGerlinkyHeaderQuery),
  ])

  return (
    <main>
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />

      <div className={styles.page}>
        <nav className={styles.navLinks}>
          <a href="/shows">Back to shows</a>
        </nav>

        <h3 className={styles.heading}>
          {data?.title || 'Kinky Gerlinky Models Ball'}
          {data?.subtitle ? ` — ${data.subtitle}` : ''}
        </h3>

        {data?.watchUrl && (
          <p className={styles.navLinks}>
            <a href={data.watchUrl} target="_blank" rel="noreferrer">
              Link to watch the Models Ball on Vimeo pay-per-view
            </a>
          </p>
        )}

        {/* Trailer / extract */}
        {data?.embedUrl ? (
          <>
            <div className={styles.videoContainer}>
              <iframe
                src={data.embedUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Models Ball extract"
              />
            </div>
            <p className={styles.caption}><em>Models Ball (extract)</em></p>
          </>
        ) : (
          <p className={styles.muted}>No video embed yet.</p>
        )}

        {/* Description */}
        {Array.isArray(data?.description) && data.description.length > 0 && (
          <section className={styles.description}>
            <PortableText value={data.description} />
          </section>
        )}

        {/* Image grid */}
        {Array.isArray(data?.images) && data.images.length > 0 ? (
          <section className={styles.imageGrid}>
            {data.images.map((img, i) => (
              <figure key={i}>
                <img src={img.url} alt={img.alt || ''} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </section>
        ) : (
          <p className={styles.muted}>No images yet.</p>
        )}
      </div>
    </main>
  )
}
