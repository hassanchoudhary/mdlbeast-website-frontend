// ─── Strapi media ────────────────────────────────────────────────────────────

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

// ─── Components ───────────────────────────────────────────────────────────────

export interface NavItem {
  id: number;
  label: string;
  url: string;
  sort_order: number;
}

export interface OpeningHour {
  id: number;
  day: string;
  hours: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
}

export interface ContactInfo {
  id: number;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface Card {
  id: number;
  label: string;
  url: string | null;
  image: StrapiImage | null;
}

// ─── Content types ────────────────────────────────────────────────────────────

export interface GlobalSettingsData {
  logo: StrapiImage | null;
  site_name: string;
}

export interface NavigationData {
  items: NavItem[];
}

export interface HeroData {
  headline: string;
  image_alt: string | null;
  background_image: StrapiImage | null;
}

export interface TextBlockDarkData {
  id: number;
  slug: string;
  title: string;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  background_color: string;
}

export interface FullBleedFeatureData {
  id: number;
  slug: string;
  title: string;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  image_alt: string | null;
  overlay_opacity: number;
  background_image: StrapiImage | null;
}

export interface SplitFeatureData {
  title: string | null;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  images: StrapiImage[];
}

export interface CardCarouselData {
  id: number;
  slug: string;
  title: string;
  body: string | null;
  cta_label: string | null;
  cta_url: string | null;
  flip_layout: boolean;
  cards: Card[];
}

export interface FooterData {
  copyright_text: string | null;
  opening_hours: OpeningHour[];
  contact: ContactInfo | null;
  social_links: SocialLink[];
}
