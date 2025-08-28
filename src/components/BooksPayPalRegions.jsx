'use client'
import dynamic from 'next/dynamic'

// no ssr option needed in App Router; it's already a client component
const PayPalHostedButtons = dynamic(() => import('@/components/PayPalHostedButtons'))

export default function BooksPayPalRegions({ regions = [], clientId, currency = 'GBP' }) {
  return (
    <section className="shop-options my-10">
      {regions.map((region, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="shop-title text-center text-xl font-semibold mb-4">{region.title}</h2>
          <div className="shop-row flex flex-wrap gap-6 justify-center">
            <PayPalHostedButtons
              clientId={clientId}
              currency={currency}
              items={(region.items || []).map(it => ({
                id: it._key ?? it.hostedButtonId,
                label: it.label,
                hostedButtonId: it.hostedButtonId,
                image: it.image,
              }))}
            />
          </div>
        </div>
      ))}
    </section>
  )
}
