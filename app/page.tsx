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

export default async function Home() {
  const [hero, about, restaurant, studios, events, membership, coworking, club] =
    await Promise.all([
      fetchHero(),
      fetchTextBlock('about'),
      fetchFullBleedFeature('restaurant'),
      fetchCardCarousel('card-carousel'),   // Studios — slug in Strapi is "card-carousel"
      fetchSplitFeature(),                  // Events — Split Feature single type
      fetchTextBlock('membership'),
      fetchCardCarousel('Co-Working'),        // Co-Working — slug as set in Strapi
      fetchFullBleedFeature('club'),
    ]);

  return (
    <main className="overflow-x-hidden w-full">
      <HeroBanner data={hero} />
      <TextBlockDark data={about} />
      <FullBleedFeature data={restaurant} />
      <ImageCarousel data={studios} />
      <EventSplit data={events} />
      <TextBlockDark data={membership} />
      <SingleImageWithText data={coworking} />
      <FullBleedFeature data={club} />
    </main>
  );
}
