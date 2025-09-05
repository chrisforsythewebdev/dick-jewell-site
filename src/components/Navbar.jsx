'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import '../styles/styles.css';

export default function Navbar() {
  useEffect(() => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const body = document.body;

    if (!burger || !nav) return;

    const toggle = () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      body.classList.toggle('nav-open');
    };

    burger.addEventListener('click', toggle);

    // Close menu when a nav link is clicked (nice on mobile)
    const links = nav.querySelectorAll('a');
    const close = () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('nav-open');
    };
    links.forEach((el) => el.addEventListener('click', close));

    return () => {
      burger.removeEventListener('click', toggle);
      links.forEach((el) => el.removeEventListener('click', close));
    };
  }, []);

  return (
    <nav className="navbar">
      <div
        className="burger"
        aria-label="Toggle navigation"
        role="button"
        tabIndex={0}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className="nav-links">
        <li><Link href="/">home page</Link></li>
        <li><Link href="/films">films</Link></li>
        <li><Link href="/kinky-gerlinky">kinky gerlinky</Link></li>
        <li><Link href="/prints">prints</Link></li>
        <li><Link href="/photos">photos</Link></li>
        <li><Link href="/found-photos">found photos</Link></li>
        <li><Link href="/the-box">the box</Link></li>
        <li><Link href="/books">books</Link></li>
        <li><Link href="/commercial">commercial</Link></li>
        <li><Link href="/montages">montages</Link></li>
        <li><Link href="/jewells">jewells</Link></li>
        <li><Link href="/shows">shows</Link></li>
        <li><Link href="/contact">contact me</Link></li>
      </ul>

      <div className="scroll-finger">
        <img src="/images/arrows-etc/point-up.jpg" alt="Scroll cue" />
      </div>
    </nav>
  );
}
