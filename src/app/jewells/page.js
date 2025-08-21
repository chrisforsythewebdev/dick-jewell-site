import { sanityClient } from '@/lib/client'
import { jewellsPageQuery } from '@/lib/queries'


export const revalidate = 60


export const metadata = {
    title: 'Jewells – Dick Jewell',
}


export default async function JewellsPage() {
    
    const data = await sanityClient.fetch(jewellsPageQuery)
    if (!data) return null


    const {
        title = 'Jewells',
        introRows = [],
        afterRowsParagraph,
        sectionHeading,
        videoUrl,
    } = data


    return (
        <main className="photo-page">

            <div className='intro'>
                <h1 className="page-title">{title}</h1>
            </div>

            <section className="intro">
            
                {introRows.map((row, i) => (
                    <div key={i} className={`intro-row${row.reverse ? ' reverse' : ''}`}>
                        {/* image left or right depends on .reverse and markup order */}
                        {!row.reverse && (
                            <img src={row.image} alt={row.alt || ''} className="intro-img" />
                        )}


                        <div className="intro-text">
                            {row.caption && <p className="caption">{row.caption}</p>}
                            {row.text && <p>{row.text}</p>}
                        </div>


                        {row.reverse && (
                            <img src={row.image} alt={row.alt || ''} className="intro-img" />
                        )}
                    </div>
                ))}


                {afterRowsParagraph && <p>{afterRowsParagraph}</p>}


                {sectionHeading && (
                    <h2 className="section-heading">{sectionHeading}</h2>
                )}

            </section>

            {videoUrl && (
                <section className="video-gallery" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                        <iframe
                            src={videoUrl}
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            title={title}
                            allowFullScreen
                        />
                    </div>
                </section>
            )}
        </main>
    )
}