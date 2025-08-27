import { sanityClient } from '@/lib/client'
import { KG_VHS, kinkyGerlinkyHeaderQuery } from '@/lib/queries'
import KGHeader from '@/components/KGHeader'
import { PortableText } from '@portabletext/react'
import styles from './vhs.module.css'

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – 21 x VHS' }

export default async function VhsPage() {
  const [data, header] = await Promise.all([
    sanityClient.fetch(KG_VHS),
    sanityClient.fetch(kinkyGerlinkyHeaderQuery),
  ])
  if (!data) return null

  const { title, intro = [], seriesUrl, episodes = [] } = data

  return (
    <main>
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />

      <section className={styles.container}>

        {(intro?.length > 0 || seriesUrl) && (
          <div className={styles.intro}>
            {intro?.length > 0 && <PortableText value={intro} />}
            <h2>
              Click on the cover images below to watch that
              {' '}‘Kinky Gerlinky’ episode
            </h2>
            {seriesUrl && (
              <h3>
                <a href={seriesUrl} target="_blank" rel="noreferrer">
                  Click here to bargain binge the entire series for a month
                </a>
              </h3>
            )}
          </div>
        )}

        {episodes.map((ep, i) => (
          <section key={i} className={styles.vhsBlock}>
            {/* Left column: poster + meta */}
            <div className={styles.vhsItem}>
              {ep.vimeoUrl ? (
                <a href={ep.vimeoUrl} target="_blank" rel="noreferrer">
                  <img
                    className={styles.cover}
                    src={ep.thumb?.url}
                    alt={ep.thumb?.alt || ep.title || 'Episode cover'}
                  />
                </a>
              ) : (
                ep.thumb?.url && (
                  <img
                    className={styles.cover}
                    src={ep.thumb.url}
                    alt={ep.thumb.alt || ep.title || 'Episode cover'}
                  />
                )
              )}

              {/* text under poster */}
              {ep.title && <h2>{ep.title}</h2>}
              {ep.date && (
                <p>
                  <strong>{ep.date}</strong>
                </p>
              )}
              {Array.isArray(ep.details) && ep.details.length > 0 && (
                <PortableText value={ep.details} />
              )}
            </div>

            {/* Right grid: 6 stills */}
            {Array.isArray(ep.stills) && ep.stills.length > 0 && (
              <div className={styles.vhsStills}>
                {ep.stills.map((s, j) => (
                  <img
                    key={j}
                    src={s.url}
                    alt={s.alt || `${ep.title || 'Episode'} still ${j + 1}`}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </section>
    </main>
  )
}
