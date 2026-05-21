import HeroBanner from '@/components/HeroBanner';
import TextBlockDark from '@/components/TextBlockDark';
import FullBleedFeature from '@/components/FullBleedFeature';
import ImageCarousel from '@/components/ImageCarousel';
import EventSplit from '@/components/EventSplit';
import SingleImageWithText from '@/components/SingleImageWithText';
import {
  fetchHero,
  fetchTextBlock,
  fetchFullBleedFeature,
  fetchSplitFeature,
  fetchCardCarousel,
} from '@/lib/strapi';

export const dynamic = 'force-dynamic';

/**
 * Safely fetch data — returns null on failure instead of crashing the page.
 */
async function safeFetch<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.error('[page] Fetch failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

export default async function Home() {
  const [hero, about, restaurant, studios, events, membership, coworkingData, club] =
    await Promise.all([
      safeFetch(() => fetchHero()),
      safeFetch(() => fetchTextBlock('about')),
      safeFetch(() => fetchFullBleedFeature('restaurant')),
      safeFetch(() => fetchCardCarousel('card-carousel')),
      safeFetch(() => fetchSplitFeature()),
      safeFetch(() => fetchTextBlock('membership')),
      // Try 'Co-Working' first, fallback to lowercase 'coworking' for robust database compatibility
      safeFetch(() => fetchCardCarousel('Co-Working')).then((res) => {
        if (res) return res;
        return fetchCardCarousel('coworking');
      }).catch(() => null),
      safeFetch(() => fetchFullBleedFeature('club')),
    ]);

  const coworking = coworkingData;

  return (
    <main className="overflow-x-hidden w-full">
      {hero && <HeroBanner data={hero} />}
      {about && <TextBlockDark data={about} />}
      {restaurant && <FullBleedFeature data={restaurant} />}
      {studios && <ImageCarousel data={studios} />}
      {events && <EventSplit data={events} />}
      {membership && <TextBlockDark data={membership} />}
      {coworking && <SingleImageWithText data={coworking} />}
      {club && <FullBleedFeature data={club} />}
    </main>
  );
}
