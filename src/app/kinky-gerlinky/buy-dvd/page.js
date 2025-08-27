import { sanityClient } from '@/lib/client'
import { KG_BUY_DVD, kinkyGerlinkyHeaderQuery } from '@/lib/queries'
import KGHeader from '@/components/KGHeader'
import { PortableText } from '@portabletext/react'
import styles from './buy-dvd.module.css'   

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – Buy DVD' }

export default async function BuyDvdPage() {
  const [data, header] = await Promise.all([
    sanityClient.fetch(KG_BUY_DVD),
    sanityClient.fetch(kinkyGerlinkyHeaderQuery),
  ])
  if (!data) return null

  const { title, info = [], cover, watchUrl, stills = [], press } = data

  return (
    <main>
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />

      <section className={styles.kgDvdInfo}>
      
          <h2>{title}</h2>

        {info?.length > 0 && (
          <div className={styles.kgInfo}>
            <PortableText value={info} />
          </div>
        )}

        {(cover?.url || watchUrl) && (
          <div className={styles.dvdPurchaseOptions}>
            <div className={styles.trailerVideo}>
              {cover?.url && (
                <img
                  src={cover.url}
                  alt={cover.alt || 'Kinky Gerlinky DVD cover'}
                  className={styles.dvdCover}
                />
              )}
              {watchUrl && (
                <p>
                  <em>
                    <a href={watchUrl} target="_blank" rel="noreferrer">
                      Click here to watch the film
                    </a>
                  </em>
                </p>
              )}
            </div>
          </div>
        )}

        {stills.length > 0 && (
          <div className={styles.vhsStills}>
            {stills.map((s, i) => (
              <img key={i} src={s.url} alt={s.alt || 'Kinky Gerlinky still'} />
            ))}
          </div>
        )}

        {(press?.url || press?.caption) && (
          <>
            <h2 className={styles.pressHeading}>Press Release</h2>
            {press?.url && (
              <img
                src={press.url}
                alt={press.alt || 'Kinky Gerlinky Press Release'}
                className={styles.pressImage}
              />
            )}
            {press?.caption && <div className={styles.caption}>{press.caption}</div>}
          </>
        )}
      </section>
    </main>
  )
}
