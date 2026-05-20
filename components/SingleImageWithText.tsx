'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CardCarouselData } from '@/types/strapi';

interface Props {
  data: CardCarouselData;
}

export default function SingleImageWithText({ data }: Props) {
  const { title, body, cards, cta_label, cta_url, flip_layout } = data;
  const showCta = Boolean(cta_label && cta_url);
  const featuredCard = cards[0] ?? null;

  return (
    <section className="bg-beast-black">
      <div
        className={`flex min-h-[70vh] flex-col md:flex-row ${
          flip_layout ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Image panel ~55% */}
        <motion.div
          className="relative w-full aspect-4/3 md:aspect-auto md:w-[55%]"
          initial={{ opacity: 0, x: flip_layout ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {featuredCard?.image ? (
            <Image
              src={featuredCard.image.url}
              alt={featuredCard.image.alternativeText ?? title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          ) : (
            <div className="h-full w-full bg-beast-charcoal" />
          )}
        </motion.div>

        {/* Text panel ~45% */}
        <motion.div
          className="flex w-full flex-col justify-center bg-beast-black
                     px-6 py-16 md:w-[45%] md:px-12 md:py-20 lg:px-16 lg:py-24"
          initial={{ opacity: 0, x: flip_layout ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <h2 className="font-display font-extrabold uppercase leading-[0.8] tracking-[-0.03em] text-beast-white
                         text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]">
            {title}
          </h2>

          {body && (
            <div
              className="prose-beast mt-7 text-base leading-relaxed md:text-lg lg:text-xl text-beast-cream/95"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}

          {showCta && (
            <div className="mt-10">
              <a
                href={cta_url!}
                className="inline-block rounded-full bg-beast-teal px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-beast-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              >
                {cta_label}
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
