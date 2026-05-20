'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import type { StrapiImage, NavItem } from '@/types/strapi';

interface Props {
  logo: StrapiImage | null;
  items: NavItem[];
}

export default function NavClient({ logo, items }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Solid background after scrolling past the hero fold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (url: string) => {
    return false;
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-beast-black border-b border-white/5 transition-all duration-300"
    >
      <nav
        className="flex h-20 w-full items-center justify-between px-6 md:px-10 lg:px-12"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link href="/" aria-label="Beast House — home" className="shrink-0">
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alternativeText ?? 'Beast House'}
              width={logo.width}
              height={logo.height}
              className="h-12 w-auto object-contain"
              priority
            />
          ) : (
            <span className="font-display text-2xl uppercase text-beast-white">
              Beast House
            </span>
          )}
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.url}
                className={`font-display font-bold text-base lg:text-lg uppercase tracking-wide transition-all duration-200 ${
                  isActive(item.url)
                    ? 'text-beast-pink underline decoration-beast-pink decoration-2 underline-offset-[6px]'
                    : 'text-beast-white hover:text-beast-pink hover:underline hover:decoration-beast-pink hover:decoration-2 hover:underline-offset-[6px]'
                }`}
                aria-current={isActive(item.url) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Hamburger ── */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center text-beast-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`md:hidden overflow-hidden bg-beast-black transition-all duration-300 ease-in-out ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul
          className="flex flex-col divide-y divide-white/10 border-t border-white/10 px-6"
          role="list"
        >
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.url}
                onClick={() => setOpen(false)}
                className={`block py-5 text-sm uppercase tracking-[0.2em] transition-all duration-200 ${
                  isActive(item.url)
                    ? 'text-beast-pink underline decoration-beast-pink decoration-2 underline-offset-[6px]'
                    : 'text-beast-cream/60 hover:text-beast-pink hover:underline hover:decoration-beast-pink hover:decoration-2 hover:underline-offset-[6px]'
                }`}
                aria-current={isActive(item.url) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
