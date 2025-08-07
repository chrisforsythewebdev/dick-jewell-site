import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/client'

export const revalidate = 60 // ISR

export default async function FilmsPage() {
  const films = await getFilms()

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <section className="text-center mt-8 mb-4">
        <h1 className="text-2xl font-semibold">Some of my films</h1>
        <p className="text-sm italic">(Click on the images for more info, clips etc)</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {films.map(film => (
          <div key={film._id} className="group">
            <Link href={`/films/${film.slug.current}`}>
              <div className="relative">
                {film.thumbnail && (
                  <Image
                    src={film.thumbnail}
                    alt={film.title}
                    width={600}
                    height={400}
                    className={`w-full transition-opacity duration-300 ${film.hoverImage ? 'group-hover:opacity-0' : ''}`}
                  />
                )}
                {film.hoverImage && (
                  <Image
                    src={film.hoverImage}
                    alt={`${film.title} hover`}
                    width={600}
                    height={400}
                    className="absolute top-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <h2 className="text-lg font-medium">{film.title}</h2>
                <p className="text-sm">{film.year} — {film.duration}</p>
              </div>
            </Link>
          </div>
        ))}
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
  