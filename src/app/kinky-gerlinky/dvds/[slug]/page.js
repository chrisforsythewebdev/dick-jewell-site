import KGHeader from '@/components/KGHeader'
import { sanityClient } from '@/lib/client'
import { groq } from 'next-sanity'

export const revalidate = 60

export const metadata = {
  title: 'Kinky Gerlinky – DVD/VHS',
}

const dvdQuery = groq`*[_type == "kinkyGerlinkyDvd" && slug.current == $slug][0]{
  title,
  description,
  "embedUrl": player.embedUrl,
  "mp4": player.mp4.asset->url,
  "poster": player.poster.asset->url
}`

export default async function DvdPage({ params }) {
  const data = await sanityClient.fetch(dvdQuery, { slug: params.slug })
  if (!data) return null

  const { title, description, embedUrl, mp4, poster } = data

  // If it's a Vimeo embed, append the same params you used in HTML
  const vimeoSrc = embedUrl
    ? `${embedUrl}?autoplay=1&muted=1&title=0&byline=0&portrait=0`
    : null

  return (
    <>
      <KGHeader />  
      <main className="video-page">
        <p className="back-link">
          <a href="/kinky-gerlinky">more ‘Kinky Gerlinky’ info or to watch ‘Kinky Gerlinky’</a>
        </p>

        <h1>{title}</h1>

        <div className="video-wrapper">
          {vimeoSrc ? (
            <iframe
              src={vimeoSrc}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : mp4 ? (
            <video
              playsInline
              controls
              poster={poster || undefined}
            >
              <source src={mp4} type="video/mp4" />
            </video>
          ) : null}
        </div>

        {description && <p className="video-caption"><em>{description}</em></p>}
      </main>
    </>
  )
}
