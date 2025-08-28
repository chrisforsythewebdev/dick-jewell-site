'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <main className="text-center text-black bg-white overflow-x-hidden">
      <h1 className="text-4xl sm:text-5xl font-bold my-12">dick jewell.com</h1>
      <p className="text-red-700 text-sm mb-12">
        All users feel free to use the contact link
        <br />
        <small>(will try and get more stuff up soon, weather permitting)</small>
      </p>

      <section className="flex flex-wrap justify-center gap-6 max-w-[1000px] mx-auto mb-12">
        <div className="max-w-[300px] relative group">
          <a href="https://vimeo.com/189689422" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/homepage/Serp-24-roll1.jpg"
              alt="Leigh Bowery"
              className="w-full block group-hover:opacity-0 transition-opacity duration-300"
            />
            <img
              src="/images/homepage/Serp-26-roll2.jpg"
              alt="Leigh Bowery Hover"
              className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
          <p className="text-xs mt-2 font-bold">
            click on the image above to watch Leigh's performance at the Serpentine Gallery
          </p>
        </div>

        <div className="max-w-[300px]">
          <img src="/images/homepage/B-&-B.jpg" alt="Burroughs and Bacon" />
        </div>
        <div className="max-w-[300px]">
          <img src="/images/homepage/Peter-Gabriel.jpg" alt="Peter Gabriel" />
        </div>

        <div className="max-w-[300px] relative group">
          <img
            src="/images/homepage/RED-Queen-thumb.jpg"
            alt="Queen"
            className="w-full block group-hover:opacity-0 transition-opacity duration-300"
          />
          <img
            src="/images/homepage/Queen-&-coach-thumb.jpg"
            alt="Queen Hover"
            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        <div className="w-[300px] relative text-center">
          <div className="relative pt-[90%]">
            {hasMounted && (
              <iframe
                src="https://player.vimeo.com/video/172560462?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Orlando Pirates Supporters"
              ></iframe>
            )}
          </div>
          <p className="text-xs mt-2 font-bold">Orlando Pirates 1995 (trailer)</p>
        </div>

        <div className="max-w-[300px] relative group">
          <img
            src="/images/homepage/32-Cricklewood-Sisters-2.jpg"
            alt="Cricklewood Sisters"
            className="w-full block group-hover:opacity-0 transition-opacity duration-300"
          />
          <img
            src="/images/homepage/Cricklewood-Sisters-1.jpg"
            alt="Cricklewood Hover"
            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        <div className="max-w-[300px]">
          <img src="/images/homepage/Found-Edna.jpg" alt="Edna" />
        </div>
        <div className="max-w-[300px]">
          <img src="/images/homepage/Gregory-framed.jpg" alt="Gregory Isaacs" />
        </div>
        <div className="max-w-[300px]">
          <img src="/images/homepage/gunman.jpg" alt="Battersea Gunman" />
        </div>
      </section>

      <p className="text-red-700 text-xs max-w-[850px] mx-auto px-4 mb-8 hidden">
        Kinky Gerlinky, Found Photos, Bushmen Of The Kalahari, Leigh Bowery,
        Dermot & Natasha, The Marilyn Myth, A Change Of Face, Hysteric Glamour,
        Gregory Isaacs, Amampondo, American Tobacconists, Skinheads, London
        Jewells, Adamski, American Jewells, Peter Gabriel, Busi Mahlongo, Mod
        Revivalists, Amanda Lear, The Jazz Room.
        <br />
        <br />
        Basically this version of the site is just for starters + the list above is for search engines and by
        no means complete. Will be adding more film clips and images from my
        archives weather permitting.
      </p>
    </main>
  );
}
