import { sanityClient } from '@/lib/client'
import { kinkyGerlinkyStaticQuery, kinkyGerlinkyHeaderQuery } from '@/lib/queries'
import KGHeader from '@/components/KGHeader'

export const revalidate = 60
export const metadata = { title: 'Kinky Gerlinky – Buy DVD' }

export default async function BuyDvdPage() {
  const [data, header] = await Promise.all([
    sanityClient.fetch(kinkyGerlinkyStaticQuery, { slug: 'buy-dvd' }),
    sanityClient.fetch(kinkyGerlinkyHeaderQuery)
  ])
  if (!data) return null

  const { title = 'Buy DVD', bodyHtml, images = [] } = data

  return (
    <main className="video-page">
      <KGHeader bannerUrl={header?.bannerUrl} links={header?.links} />
      <h1>{title}</h1>

      {bodyHtml && <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />}

      {images?.length > 0 && (
        <div className="mini-gallery">
          <div className="top-row">
            {images.map((im, i) => (
              <img key={i} src={im.assetUrl} alt={im.alt || ''} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
