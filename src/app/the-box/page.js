import Image from 'next/image'
import { sanityClient } from '@/lib/client'
import { boxPageQuery } from '@/lib/queries'
import Carousel from '@/components/Carousel' // your existing simple carousel

export const revalidate = 60

export const metadata = {
  title: 'The Box – Dick Jewell',
}

export default async function TheBoxPage() {
  const data = await sanityClient.fetch(boxPageQuery)

  if (!data) return null

  const {
    title = 'The Box',
    intro,
    carouselImages = [],
    afterCarouselNote,
    figures = [],
  } = data

  return (
    <main className="photo-page max-w-[1200px] mx-auto px-4">
      <div className='intro'>
        <h1 className="page-title mt-6">{title}</h1>
      </div>

      {intro && (
        <p className="intro">{intro}</p>
      )}

      {carouselImages.length > 0 && (
        <section className="photo-carousel my-6">
          <Carousel images={carouselImages} frameClassName="carousel-frame" />
        </section>
      )}

      {afterCarouselNote && (
        <p className="text-center my-4">{afterCarouselNote}</p>
      )}

      {figures.map((fig, i) => (
        <figure key={i} className="the-box">
          {fig.image && (
            <Image
              src={fig.image}
              alt={fig.caption || 'The Box'}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
            />
          )}
          {fig.caption && <figcaption>{fig.caption}</figcaption>}
        </figure>
      ))}
    </main>
  )
}
