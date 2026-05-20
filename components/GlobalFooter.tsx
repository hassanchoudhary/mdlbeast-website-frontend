import type { ElementType } from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaLinkedin,
  FaSnapchat,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { Globe } from 'lucide-react';
import { fetchFooter } from '@/lib/strapi';

const BRAND_ICONS: Record<string, ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  snapchat: FaSnapchat,
  twitter: FaXTwitter,
  x: FaXTwitter,
  youtube: FaYoutube,
};

function SocialIcon({ platform }: { platform: string }) {
  const Icon = BRAND_ICONS[platform.toLowerCase()];
  return Icon
    ? <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
    : <Globe className="h-5 w-5 shrink-0" aria-hidden="true" />;
}

export default async function GlobalFooter() {
  let data;
  try {
    data = await fetchFooter();
  } catch {
    data = { opening_hours: [], contact: null, social_links: [], copyright_text: null };
  }
  const { opening_hours, contact, social_links, copyright_text } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-beast-black px-6 pt-16 pb-8 md:px-16 lg:px-24">

      {/* ── Three-column grid ── */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">

        {/* Column 1 — Opening Hours */}
        <div>
          <h3 className="mb-6 font-display font-black tracking-wider uppercase text-sm text-beast-white">
            Opening Hours
          </h3>
          {opening_hours?.length > 0 ? (
            <ul className="space-y-3">
              {opening_hours.map((row) => {
                const cleanDay = row.day ? row.day.replace(/[:\s]+$/, '').trim() : '';
                const cleanHours = row.hours ? row.hours.replace(/^[:\s]+/, '').trim() : '';
                return (
                  <li key={row.id} className="text-sm text-beast-cream/70">
                    {cleanDay}{cleanHours ? `: ${cleanHours}` : ''}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-beast-cream/30">—</p>
          )}
        </div>

        {/* Column 2 — Contact */}
        <div>
          <h3 className="mb-6 font-display font-black tracking-wider uppercase text-sm text-beast-white">
            Contact
          </h3>
          {contact ? (
            <ul className="space-y-4 text-sm text-beast-cream/70">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="underline underline-offset-4 transition-colors hover:text-beast-cream"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="underline underline-offset-4 transition-colors hover:text-beast-cream"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.address && (
                <li>
                  <address className="not-italic">{contact.address}</address>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-sm text-beast-cream/30">—</p>
          )}
        </div>

        {/* Column 3 — Follow Us */}
        <div>
          <h3 className="mb-6 font-display font-black tracking-wider uppercase text-sm text-beast-white">
            Follow Us
          </h3>
          {social_links?.length > 0 ? (
            <ul className="space-y-4">
              {social_links.map((link) => {
                const cleanUrl = link.url ? link.url.trim() : '';
                return (
                  <li key={link.id}>
                    <a
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-beast-cream/70 transition-colors hover:text-beast-cream"
                    >
                      <SocialIcon platform={link.platform} />
                      <span>{link.platform}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-beast-cream/30">—</p>
          )}
        </div>
      </div>

      {/* ── Divider + Copyright ── */}
      <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6">
        <p className="text-xs text-beast-cream/40">
          {copyright_text ?? `©${year} Beast House. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
