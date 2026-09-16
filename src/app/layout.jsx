import Analytics from '@/components/Analytics';
import { SITE } from '@/lib/site';
import '@/styles/globals.css';

// FONTS
// Loaded by <link>, matching the previous build, so nothing about the
// typography changes visually.
//
// UPGRADE PATH (do this on Vercel, where the build has network access):
// swap to `next/font/google`. It downloads Playfair Display and DM Sans at
// build time and serves them from this origin, which removes two third-party
// connections from the critical path and takes roughly 100-200ms off LCP on
// mobile. It was not used here only because the build sandbox cannot reach
// fonts.googleapis.com, and an unverifiable build is worse than a verified
// one. See: https://nextjs.org/docs/app/api-reference/components/font
const FONT_HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400' +
  '&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500' +
  '&display=swap';

// Lifespan Edge, "Medical Director", Dorado and Puerto Rico have all been
// removed from the defaults. Nothing here should describe her through a role
// she no longer holds.
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Dr. Emma DiPonio, MD — Diagnostic Radiology & Longevity Medicine',
    template: '%s | Dr. Emma DiPonio, MD',
  },
  description:
    'Dr. Emma DiPonio, MD is a triple board-certified diagnostic radiologist and longevity medicine physician offering independent second opinion imaging review and consulting for clinics.',
  authors: [{ name: 'Dr. Emma DiPonio, MD' }],
  alternates: { canonical: '/' },
  icons: { icon: '/emma-headshot.jpg' },
  openGraph: {
    type: 'website',
    siteName: 'Dr. Emma DiPonio, MD',
    url: '/',
    title: 'Dr. Emma DiPonio, MD — Diagnostic Radiology & Longevity Medicine',
    description:
      'Triple board-certified diagnostic radiologist. Independent second opinion imaging review and imaging consulting for clinics.',
    images: [{ url: '/emma-headshot.jpg', alt: 'Dr. Emma DiPonio, MD' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Emma DiPonio, MD — Diagnostic Radiology & Longevity Medicine',
    description:
      'Triple board-certified diagnostic radiologist. Independent second opinion imaging review and imaging consulting for clinics.',
    images: ['/emma-headshot.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_HREF} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
