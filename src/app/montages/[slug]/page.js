import { sanityClient } from '@/lib/client'
import { montageWorkBySlugQuery, montageWorkSlugsQuery } from '@/lib/queries'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(montageWorkSlugsQuery).catch(() => [])
  return slugs.map((s) => ({ slug: s }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const data = await sanityClient.fetch(montageWorkBySlugQuery, { slug }).catch(() => null)
  const title = data?.seoTitle || data?.title || 'Montage'
  return { title: `${title} – Dick Jewell` }
}

export default async function MontageDetailPage({ params }) {
  const { slug } = params
  const data = await sanityClient.fetch(montageWorkBySlugQuery, { slug })
  if (!data) return null

  const {
    title,
    backLabel = '← Back to Montages',
    backHref = '/montages',
    figures = [],
    description,
  } = data

  return (
    <main className="print-detail">
      <div className="back-link">
        <a href={backHref}>{backLabel}</a>
      </div>

      {figures.map((f, i) => (
        <figure key={i}>
          {f.image && <img src={f.image} alt={f.alt || title} />}
          {f.caption && (
            <figcaption
              dangerouslySetInnerHTML={{ __html: f.caption.replace(/\n/g, '<br>') }}
            />
          )}
        </figure>
      ))}

      {description && (
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
        />
      )}
    </main>
  )
}
