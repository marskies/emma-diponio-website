'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ANALYTICS } from '@/lib/site';

// Routes that must never load an analytics script.
//
// This is the pixel-leak rule. Analytics on a page that handles patient
// information is the single most common finding in HIPAA enforcement against
// websites. The root layout renders this on every page, so the exclusion has
// to live here rather than being remembered per page.
const NO_ANALYTICS = ['/secure-upload'];

export default function Analytics() {
  const pathname = usePathname();
  if (NO_ANALYTICS.some((p) => pathname?.startsWith(p))) return null;
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <Script
      defer
      data-domain={ANALYTICS.domain}
      src="https://plausible.io/js/script.tagged-events.outbound-links.js"
      strategy="afterInteractive"
    />
  );
}
