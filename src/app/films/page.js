// app/films/page.jsx
import Link from 'next/link'
import { sanityClient } from '@/lib/client'
import '../../styles/styles.css'

export const revalidate = 60

export default async function FilmsPage() {
  const films = await getFilms()

  return (
    <div className="films-grid-wrapper">
      <section className="films-intro">
        <h1>Some of my films</h1>
        <p>(Click on the images for more info, clips etc)</p>
      </section>

      <section className="films-grid">
        {films.map((film) => {
          const hasHover = !!film.hoverImage
          const isExternal = !!film.externalUrl
          const href = isExternal ? film.externalUrl : `/films/${film.slug.current}`

          const Wrapper = ({ children }) =>
            isExternal ? (
              <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
            ) : (
              <Link href={href}>{children}</Link>
            )

          return (
            <div key={film._id} className="film-card">
              <Wrapper>
                <div className={`film-card-image-wrapper ${hasHover ? 'hover-image' : ''}`}>
                  {film.thumbnail && (
                    <img src={film.thumbnail} alt={film.title} className="default-img" />
                  )}
                  {hasHover && (
                    <img src={film.hoverImage} alt="" aria-hidden="true" className="hover-img" />
                  )}
                </div>

                <div className="film-info">
                  <h2>{film.title}</h2>
                  <p>
                    {film.year ? `${film.year} — ` : ''}
                    {film.duration}
                  </p>
                </div>
              </Wrapper>
            </div>
          )
        })}
      </section>
    </div>
  )
}

async function getFilms() {
  return await sanityClient.fetch(`
    *[_type == "film"]
    | order(coalesce(year, 9999) asc, title asc){
      _id,
      title,
      slug,
      year,
      duration,
      externalUrl,          // NEW
      "thumbnail": thumbnail.asset->url,
      "hoverImage": hoverImage.asset->url
    }
  `)
}
