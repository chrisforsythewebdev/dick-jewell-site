// components/KGHeader.jsx
import Link from 'next/link'

export default function KGHeader({ bannerUrl, links = [] }) {
  if (!bannerUrl && !links?.length) return null

  return (
    <section className="frameset-top" style={{ textAlign: 'center' }}>
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt="Kinky Gerlinky Banner"
          width={655}
          height={117}
          style={{ display: 'block', margin: '0 auto' }}
        />
      )}

      {links?.length > 0 && (
        <div className="frameset-nav">
          {links.map((l, i) =>
            l.href?.startsWith('http') ? (
              <a key={i} href={l.href} target={l.target || '_self'}>
                {l.label}
              </a>
            ) : (
              <Link key={i} href={l.href || '#'} target={l.target || undefined}>
                {l.label}
              </Link>
            )
          )}
        </div>
      )}
    </section>
  )
}
