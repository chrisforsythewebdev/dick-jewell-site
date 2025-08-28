// src/app/montages/[slug]/page.js
import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/client'
import {
  montageDetailSlugsQuery,
  montageDetailBySlugQuery,
} from '@/lib/queries'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(montageDetailSlugsQuery).catch(() => [])
  return (slugs || []).map((slug) => ({ slug }))
}

export async function generateMetadata(props) {
  const params = await props.params;            
  const slug = params?.slug ?? ''              

  const data = await sanityClient
    .fetch(montageDetailBySlugQuery, { slug })
    .catch(() => null)

  const title = data?.seoTitle || data?.title || 'Montage'
  return { title: `${title} – Dick Jewell` }
}

export default async function MontageDetailPage(props) {
  const params = await props.params;            
  const slug = params?.slug ?? ''              

  const data = await sanityClient
    .fetch(montageDetailBySlugQuery, { slug })
    .catch(() => null)

  if (!data) return notFound()

  const {
    title,
    backLabel = '← Back to Montages',
    backHref = '/montages',
    figures = [],
    description,
  } = data

  return (
    <main className="print-detail mx-auto max-w-[1000px] px-5 py-8 text-center">
      <div className="back-link mb-6">
        <a href={backHref}>{backLabel}</a>
      </div>

      {figures.map((f, i) => (
        <figure key={i} className="mb-10">
          {f.image && (
            <img
              src={f.image}
              alt={f.alt || title}
              className="mx-auto block h-auto max-w-full"
            />
          )}
          {f.caption && (
            <figcaption
              className="mt-2 text-base"
              dangerouslySetInnerHTML={{
                __html: f.caption.replace(/\n/g, '<br>'),
              }}
            />
          )}
        </figure>
      ))}

      {description && (
        <div
          className="description mx-auto max-w-prose text-left"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, '<br>'),
          }}
        />
      )}
    </main>
  )
}
