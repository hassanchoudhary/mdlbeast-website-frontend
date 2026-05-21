'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { HeroData } from '@/types/strapi';

interface Props {
  data: HeroData;
}

export default function HeroBanner({ data }: Props) {
  const { headline, image_alt, background_image } = data;

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-beast-black">
      {/* Background image */}
      {background_image ? (
        <Image
          src={background_image.url}
          alt={image_alt ?? headline}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      ) : (
        /* Fallback solid colour when no image is set in Strapi */
        <div className="absolute inset-0 bg-beast-charcoal" />
      )}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Headline — vertically centered, left-aligned */}
      <div className="absolute inset-0 z-10 flex items-center pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-beast-white
                     text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem]
                     max-w-[520px] md:max-w-[600px] lg:max-w-[700px]"
        >
          {headline}
        </motion.h1>
      </div>
    </section>
  );
}
