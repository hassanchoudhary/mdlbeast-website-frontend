'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CardCarouselData } from '@/types/strapi';

interface Props {
  data: CardCarouselData;
}

export default function ImageCarousel({ data }: Props) {
  const { cards, title, body, cta_label, cta_url } = data;
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true });

  if (!cards?.length) return null;

  const showCta = Boolean(cta_label && cta_url);

  return (
    <section className="bg-beast-black py-24 md:py-28 lg:py-32">

      {/* Title + body */}
      {(title || body) && (
        <motion.div
          className="pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12 mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <div className="max-w-4xl">
            {title && (
              <h2 className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-beast-white
                             text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]">
                {title}
              </h2>
            )}
            {body && (
              <div
                className="prose-beast mt-6 max-w-3xl text-base leading-relaxed md:text-lg lg:text-xl text-beast-cream/95"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Embla card track */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
      >
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4 pl-6 md:pl-10 lg:pl-12">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative shrink-0 overflow-hidden rounded-2xl
                           w-[72vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw]
                           aspect-[4/5]
                           group cursor-grab active:cursor-grabbing"
              >
                {card.image ? (
                  <Image
                    src={card.image.url}
                    alt={card.image.alternativeText ?? card.label}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 72vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 24vw"
                  />
                ) : (
                  <div className="h-full w-full bg-beast-charcoal" />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/50 via-transparent to-black/60 transition-opacity duration-300 group-hover:opacity-80" />

                {card.label && (
                  <p className="absolute top-0 left-0 p-5 font-display font-extrabold uppercase leading-none text-beast-white
                                text-lg sm:text-xl lg:text-2xl tracking-tight drop-shadow-lg">
                    {card.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      {showCta && (
        <motion.div
          className="mt-12 flex justify-center px-6 md:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={cta_url!}
            className="rounded-full bg-beast-teal px-12 py-4 text-xs font-bold uppercase tracking-[0.18em] text-beast-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          >
            {cta_label}
          </a>
        </motion.div>
      )}
    </section>
  );
}
