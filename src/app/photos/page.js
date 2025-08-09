import Image from 'next/image'
import { sanityClient } from '@/lib/client'
import { photoPageQuery } from '@/lib/queries'
import Carousel from '@/components/Carousel'

export const revalidate = 60

export default async function PhotosPage() {
  const { title, carouselImages = [], photos = [] } = await sanityClient.fetch(photoPageQuery)

  return (
    <main className="photo-page max-w-[1200px] mx-auto">
      <section className="intro">
        <h1>{title}</h1>
        <p>First images below are a mixture from the two series <em>People to the Power</em> and <em>Girl Power</em> (2010)</p>
      </section>

      <Carousel images={carouselImages} />

      <section className="prints-grid">
        {photos.map((photo, index) => (
          <figure key={index} className={`print-item ${photo.hoverImage ? 'hover-swap' : ''}`}>
            {photo.hoverImage ? (
              <div className="hover-wrapper">
                <Image
                  className="main-img"
                  src={photo.image}
                  alt={photo.title}
                  width={400}
                  height={280}
                />
                <Image
                  className="hover-img"
                  src={photo.hoverImage}
                  alt={`${photo.title} hover`}
                  width={400}
                  height={280}
                />
              </div>
            ) : (
              <Image
                src={photo.image}
                alt={photo.title}
                width={400}
                height={280}
              />
            )}
            <figcaption>{photo.title}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  )
}
