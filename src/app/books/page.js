// src/app/books/page.js
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '@/lib/client'
import { booksPageQuery } from '@/lib/queries'
import CarouselWithCaptions from '@/components/CarouselWithCaptions'
import PayPalHostedButtons from '@/components/PayPalHostedButtons'

export const revalidate = 60

export const metadata = {
  title: 'Books – Dick Jewell',
}

export default async function BooksPage() {
  const data = await sanityClient.fetch(booksPageQuery)
  if (!data) return null

  const {
    title,
    catalogue,               
    intro,
    bookCarousel = [],       
    afterCarouselCaption,
    regions = [],            
    paypalClientId,
    paypalCurrency = 'GBP',
  } = data

  return (
    <main className="photo-page max-w-[1000px] mx-auto px-4">
      <div className='intro'>
        <h1 className="page-title" style={{ marginTop: '0.5em' }}>{title}</h1>
      </div>

      {/* Catalogue section */}
      {catalogue?.title && <p className="intro">{catalogue.title}</p>}

      {catalogue?.image && (
        <div className="my-4 flex justify-center">
          <Image
            src={catalogue.image}
            alt={catalogue.title || 'Catalogue'}
            width={400}
            height={500}
            className="h-auto w-full max-w-[300px] object-contain"
            priority
            loading="eager"
            sizes="(max-width: 640px) 90vw, 300px"
          />
        </div>
      )}

      {(catalogue?.caption || catalogue?.link) && (
        <p className="carousel-caption text-center max-w-[800px] mx-auto">
          {catalogue?.caption}
          <br />
          {catalogue?.link && (
            <>
              {' '}Click{' '}
              <Link
                href={catalogue.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                here
              </Link>{' '}
              to purchase at the DoBeDo online store.
            </>
          )}
        </p>
      )}

      {/* Intro for the book on sale */}
      {intro && <p className="intro mt-8">{intro}</p>}

      {/* Carousel */}
      {bookCarousel.length > 0 && (
        <section className="photo-carousel book-carousel my-6">
          <CarouselWithCaptions
            items={bookCarousel}
            frameClassName="carousel-frame"
            heightDesktop={600}
          />
        </section>
      )}

      {/* After-carousel caption */}
      {afterCarouselCaption && (
        <p className="carousel-caption text-center my-6">
          {afterCarouselCaption}
        </p>
      )}

      {/* PayPal Hosted Buttons by region */}
      {regions.length > 0 && paypalClientId && (
        <section className="shop-options my-10">
          {regions.map((region, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="shop-title text-center text-xl font-semibold mb-4">
                {region.title}
              </h2>
              <div className="shop-row flex flex-wrap gap-6 justify-center">
                <PayPalHostedButtons
                  clientId={paypalClientId}
                  currency={paypalCurrency}
                  items={region.items || []}
                />
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
