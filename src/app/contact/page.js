// app/contact/page.js
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Contact – Dick Jewell',
}

export default function ContactPage() {
  return (
    <main className="max-w-[800px] mx-auto px-4 py-12">

      <div className='intro'>
        <h1 className="text-2xl font-semibold mb-8 text-center">Contact</h1>
      </div>

      <div className="space-y-6 text-center">
        <p>
          email Dick Jewell at:{' '}
          <a href="mailto:jewell.dick@gmail.com" className="text-blue-600 underline">
            jewell.dick@gmail.com
          </a>
        </p>

        <p>
          instagram:{' '}
          <a
            href="https://www.instagram.com/dickjewell/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            www.instagram.com/dickjewell
          </a>
        </p>

        <p>
          link:{' '}
          <a
            href="https://www.gracesmews.com/exhibitions?expand=dick-jewell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            www.gracesmews.com/exhibitions
          </a>
        </p>
      </div>

    </main>
  )
}
