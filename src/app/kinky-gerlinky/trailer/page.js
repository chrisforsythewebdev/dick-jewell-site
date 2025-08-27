import { sanityClient } from '@/lib/client'
import { KG_TRAILER, kinkyGerlinkyHeaderQuery } from '@/lib/queries'
import KGHeader from '@/components/KGHeader'
import styles from './trailer.module.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – Trailer' }

export default async function TrailerPage() {
  const [data, header] = await Promise.all([
    sanityClient.fetch(KG_TRAILER),
    sanityClient.fetch(kinkyGerlinkyHeaderQuery),
  ])
  if (!data) notFound()

  return (
    <main>
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />

      <section className={styles.wrap}>
        <p className={styles.backLink}>
          <Link href="/kinky-gerlinky">more ‘Kinky Gerlinky’ info or to watch ‘Kinky Gerlinky’</Link>
        </p>

        <h1>{data.title}</h1>

        <div className={styles.videoContainer}>
          <iframe
            src={data.embedUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p><em>Kinky Gerlinky (trailer)</em></p>
      </section>
    </main>
  )
}
