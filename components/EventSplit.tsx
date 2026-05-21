'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SplitFeatureData } from '@/types/strapi';

interface Props {
  data: SplitFeatureData;
}

export default function EventSplit({ data }: Props) {
  const { title, body, cta_label, cta_url, images } = data;
  const showCta = Boolean(cta_label && cta_url);
  const featuredImage = images?.[0] ?? null;

  return (
    <section className="bg-beast-black">
      <div className="flex min-h-[70vh] flex-col md:flex-row">

        {/* Image panel — left, ~55% */}
        <motion.div
          className="relative w-full aspect-4/3 md:aspect-auto md:w-[55%]"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alternativeText ?? (title ?? 'Events')}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          ) : (
            <div className="h-full w-full bg-beast-charcoal" />
          )}
        </motion.div>

        {/* Text panel — right, ~45% */}
        <motion.div
          className="flex w-full flex-col justify-center bg-beast-black
                     px-6 py-16 md:w-[45%] md:px-12 md:py-20 lg:px-16 lg:py-24"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          {title && (
            <h2 className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-beast-white
                           text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
              {title}
            </h2>
          )}

          {body && (
            <div
              className="mt-6 text-sm sm:text-base md:text-[1.05rem] leading-[1.6] text-beast-cream/85 font-normal"
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
