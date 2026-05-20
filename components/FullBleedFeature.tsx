'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { FullBleedFeatureData } from '@/types/strapi';

interface Props {
  data: FullBleedFeatureData;
}

export default function FullBleedFeature({ data }: Props) {
  const { slug, title, body, cta_label, cta_url, overlay_opacity, background_image, image_alt } = data;
  const showCta = Boolean(cta_label && cta_url);
  const opacity = overlay_opacity ?? 0.5;
  const overlayRgb = slug === 'club' ? '120, 20, 20' : '0, 0, 0';

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-beast-black">
      {background_image && (
        <Image
          src={background_image.url}
          alt={image_alt ?? title}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      )}

      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(${overlayRgb},${opacity})` }}
      />

      <div className="relative z-10 flex min-h-screen items-center pl-6 pr-6 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-display font-extrabold uppercase leading-[0.8] tracking-[-0.03em] text-beast-white
                         text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]
                         max-w-[650px] w-full">
            {title}
          </h2>

          {body && (
            <div
              className="prose-beast mt-6 max-w-2xl text-base leading-relaxed md:text-lg lg:text-xl text-beast-cream/95"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}

          {showCta && (
            <a
              href={cta_url!}
              className="mt-10 inline-block rounded-full bg-beast-pink px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-beast-white transition-opacity duration-200 hover:opacity-80"
            >
              {cta_label}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
