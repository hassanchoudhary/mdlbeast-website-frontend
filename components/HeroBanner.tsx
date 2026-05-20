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
      {background_image && (
        <Image
          src={background_image.url}
          alt={image_alt ?? headline}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      )}

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 z-10 flex flex-col justify-start pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12 pt-28 md:pt-36 lg:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="font-display font-extrabold uppercase leading-[0.8] tracking-[-0.03em] text-beast-white
                     text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem]
                     max-w-[780px] w-full"
        >
          {headline}
        </motion.h1>
      </div>
    </section>
  );
}
