'use client';
import { useEffect } from 'react';
import '../styles/styles.css';

export default function Navbar() {
  useEffect(() => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const body = document.body;

    if (burger && nav) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('nav-open');
      });
    }

    return () => {
      if (burger && nav) {
        burger.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="burger" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className="nav-links">
        <li><a href="/">home page</a></li>
        <li><a href="/films">films</a></li>
        <li><a href="/kinky-gerlinky">kinky gerlinky</a></li>
        <li><a href="/prints">prints</a></li>
        <li><a href="/photos">photos</a></li>
        <li><a href="/found-photos">found photos</a></li>
        <li><a href="/the-box">the box</a></li>
        <li><a href="/books">books</a></li>
        <li><a href="/commercial">commercial</a></li>
        <li><a href="/montages">montages</a></li>
        <li><a href="/jewells">jewells</a></li>
        <li><a href="/shows">shows</a></li>
        <li><a href="/contact">contact me</a></li>
      </ul>
      <div className="scroll-finger">
        <img src="/images/arrows-etc/point-up.jpg" alt="Scroll cue" />
      </div>
    </nav>
  );
}
