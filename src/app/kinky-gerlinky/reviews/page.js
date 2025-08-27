import { sanityClient } from '@/lib/client'
import { KG_REVIEWS, kinkyGerlinkyHeaderQuery } from '@/lib/queries'
import KGHeader from '@/components/KGHeader'
import ReviewsCarousel from './ReviewsCarousel'
import styles from './reviews.module.css'
import { notFound } from 'next/navigation'

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – Reviews' }

export default async function ReviewsPage() {
  const [data, header] = await Promise.all([
    sanityClient.fetch(KG_REVIEWS),
    sanityClient.fetch(kinkyGerlinkyHeaderQuery),
  ])
  if (!data) notFound()

  return (
    <main>
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />
      <section className={styles.wrap}>
        <ReviewsCarousel items={data.items || []} arrows={data.arrows} />
      </section>
    </main>
  )
}
