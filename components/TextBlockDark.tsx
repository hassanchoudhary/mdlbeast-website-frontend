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
      className="py-20 md:py-28 lg:py-32 pl-6 pr-6 md:pl-[15%] md:pr-[5%] lg:pl-[20%] lg:pr-[8%] xl:pl-[24%] xl:pr-[10%]"
      style={{ backgroundColor: background_color || '#0a0a0a' }}
    >
      <FadeIn>
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-beast-white
                         text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem]">
            {title}
          </h2>

          {body && (
            <div
              className="prose-beast mt-8 max-w-2xl text-base leading-relaxed md:text-lg lg:text-xl"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}

          {showCta && (
            <a
              href={cta_url!}
              className="mt-10 inline-block rounded-full bg-beast-teal px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-beast-white transition-opacity duration-200 hover:opacity-80"
            >
              {cta_label}
            </a>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
