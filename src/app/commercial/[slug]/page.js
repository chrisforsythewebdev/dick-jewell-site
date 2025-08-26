import { sanityClient } from '@/lib/client'
import { commercialVideoBySlugQuery } from '@/lib/queries'
import Link from 'next/link'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const data = await sanityClient.fetch(commercialVideoBySlugQuery, { slug: params.slug })
  return { title: data?.seoTitle || data?.title || 'Commercial Video – Dick Jewell' }
}

export default async function CommercialVideoPage({ params }) {
  const data = await sanityClient.fetch(commercialVideoBySlugQuery, { slug: params.slug })
  if (!data) return null

  const { title, vimeoUrl, descriptionHtml, backLabel = 'Back to commercial' } = data

  return (
    <main className="video-page" style={{ margin: '2rem auto', maxWidth: 900, textAlign: 'center', padding: '0 1rem' }}>
      <p>
        <Link href="/commercial" className="back-link">{backLabel}</Link>
      </p>

      {title && <h1>{title}</h1>}

      {vimeoUrl && (
        <div className="video-wrapper" style={{ position: 'relative', paddingTop: '56.25%', margin: '1.5rem 0' }}>
          <iframe
            src={vimeoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            title={title || 'video'}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 4 }}
          />
        </div>
      )}

      {descriptionHtml && (
        <div
          className="video-description"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          style={{ fontSize: '.95rem', lineHeight: 1.6, fontWeight: 'bold' }}
        />
      )}
    </main>
  )
}
