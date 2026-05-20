import type {
  GlobalSettingsData,
  NavigationData,
  HeroData,
  TextBlockDarkData,
  FullBleedFeatureData,
  SplitFeatureData,
  CardCarouselData,
  FooterData,
} from '@/types/strapi';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

const DEFAULT_REVALIDATE = 3600; // 1 hour ISR

function absolutizeMediaUrls(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(absolutizeMediaUrls);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] =
        k === 'url' && typeof v === 'string' && v.startsWith('/uploads/')
          ? `${STRAPI_URL}${v}`
          : absolutizeMediaUrls(v);
    }
    return out;
  }
  return value;
}

async function strapiGet<T>(
  path: string,
  revalidate = DEFAULT_REVALIDATE,
): Promise<T> {
  const url = `${STRAPI_URL}/api/${path}`;
  const res = await fetch(url, {
    headers: STRAPI_TOKEN
      ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
      : {},
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${url}`);
  }

  const json = await res.json();
  return absolutizeMediaUrls(json.data) as T;
}

// ─── Single types ─────────────────────────────────────────────────────────────

export async function fetchGlobalSettings(): Promise<GlobalSettingsData> {
  return strapiGet<GlobalSettingsData>('global-setting?populate=logo');
}

export async function fetchNavigation(): Promise<NavigationData> {
  return strapiGet<NavigationData>('navigation?populate=items&sort=items.sort_order:asc');
}

export async function fetchHero(): Promise<HeroData> {
  return strapiGet<HeroData>('hero?populate=background_image');
}

export async function fetchSplitFeature(): Promise<SplitFeatureData> {
  return strapiGet<SplitFeatureData>('split-feature?populate=images');
}

export async function fetchFooter(): Promise<FooterData> {
  return strapiGet<FooterData>(
    'footer?populate[opening_hours]=*&populate[contact]=*&populate[social_links]=*',
  );
}

// ─── Collection types (identified by slug) ────────────────────────────────────

export async function fetchTextBlock(slug: string): Promise<TextBlockDarkData> {
  const data = await strapiGet<TextBlockDarkData[]>(
    `text-block-darks?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[limit]=1`,
  );
  if (!data[0]) throw new Error(`text-block-dark "${slug}" not found`);
  return data[0];
}

export async function fetchFullBleedFeature(
  slug: string,
): Promise<FullBleedFeatureData> {
  const data = await strapiGet<FullBleedFeatureData[]>(
    `full-bleed-features?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=background_image&pagination[limit]=1`,
  );
  if (!data[0]) throw new Error(`full-bleed-feature "${slug}" not found`);
  return data[0];
}

export async function fetchCardCarousel(
  slug: string,
): Promise<CardCarouselData> {
  const data = await strapiGet<CardCarouselData[]>(
    `card-carousels?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[cards][populate]=image&pagination[limit]=1`,
  );
  if (!data[0]) throw new Error(`card-carousel "${slug}" not found`);
  return data[0];
}
