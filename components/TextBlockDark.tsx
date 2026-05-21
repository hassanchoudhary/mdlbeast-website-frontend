import FadeIn from '@/components/FadeIn';
import type { TextBlockDarkData } from '@/types/strapi';

interface Props {
  data: TextBlockDarkData;
}

export default function TextBlockDark({ data }: Props) {
  const { title, body, cta_label, cta_url, background_color } = data;
  const showCta = Boolean(cta_label && cta_url);

  return (
    <section
      className="py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-12"
      style={{ backgroundColor: background_color || '#0a0a0a' }}
    >
      <FadeIn>
        <div className="mx-auto max-w-2xl text-left">
          <h2 className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-beast-white
                         text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem]">
            {title}
          </h2>

          {body && (
            <p className="mt-8 text-sm leading-[1.6] text-beast-cream/85 md:text-base lg:text-lg">
              {body}
            </p>
          )}

          {showCta && (
            <a
              href={cta_url!}
              className="mt-10 inline-block rounded-full bg-beast-teal px-10 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-beast-white transition-all duration-200 hover:opacity-85 hover:scale-[1.02]"
            >
              {cta_label}
            </a>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
