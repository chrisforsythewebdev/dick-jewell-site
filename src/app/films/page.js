import Link from 'next/link'
import Image from 'next/image'
import { sanityClient } from '@/lib/client'
import '../../styles/styles.css'

export const revalidate = 60 // ISR

export default async function FilmsPage() {
  const films = await getFilms()

  return (
    <div className="films-grid-wrapper">
      <section className="intro">
        <h1>Some of my films</h1>
        <p>(Click on the images for more info, clips etc)</p>
      </section>

      <div className="films-grid">
        {films.map((film) => {
          const hasHover = Boolean(film.hoverImage)

          return (
            <div key={film._id} className="film-card">
              <Link href={`/films/${film.slug.current}`}>
                <div className={`film-card-image-wrapper ${hasHover ? 'hover-image' : ''}`}>
                  {film.thumbnail && (
                    <Image
                      src={film.thumbnail}
                      alt={film.title}
                      width={300}
                      height={220}
                      className="default-img"
                    />
                  )}
                  {hasHover && (
                    <Image
                      src={film.hoverImage}
                      alt={`${film.title} hover`}
                      width={300}
                      height={220}
                      className="hover-img"
                    />
                  )}
                </div>

                <div className="film-info">
                  <h2 className='font-bold'>{film.title}</h2>
                  <p>{film.year} — {film.duration}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

async function getFilms() {
  return await sanityClient.fetch(`
    *[_type == "film"] | order(year desc){
      _id,
      title,
      slug,
      year,
      duration,
      "thumbnail": thumbnail.asset->url,
      "hoverImage": hoverImage.asset->url
    }
  `)
}
