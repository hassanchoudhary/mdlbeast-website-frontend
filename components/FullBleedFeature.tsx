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
          <h2 className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-beast-white
                         text-[2.5rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.5rem]
                         max-w-[700px] w-full">
            {title}
          </h2>

          {body && (
            <div
              className="mt-6 max-w-2xl text-sm sm:text-base md:text-[1.05rem] leading-[1.6] text-beast-cream/85 font-normal"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}

          {showCta && (
            <a
              href={cta_url!}
              className="mt-10 inline-block rounded-full bg-beast-pink px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-beast-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            >
              {cta_label}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
