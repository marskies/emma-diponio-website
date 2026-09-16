import { NextResponse } from 'next/server';
import { SITE, PILLARS, GO_DESTINATIONS, GO_DEFAULT_DESTINATION } from '@/lib/site';

export const dynamic = 'force-dynamic';

const PILLAR_SLUGS = new Set(PILLARS.map((p) => p.slug));

// GET /go/<pillar>?to=<key>&src=<subkey>
//
//   /go/verdict              -> /start?utm_source=youtube&utm_medium=video&utm_campaign=verdict
//   /go/decoded?to=clinics   -> /for-clinics?utm_source=youtube&utm_medium=video&utm_campaign=decoded
//   /go/scans?src=pinned     -> adds utm_content=pinned
//
// `to` is resolved against GO_DESTINATIONS, never used as a raw URL, so this
// route cannot be turned into an open redirect by editing the query string.
export function GET(request, { params }) {
  const { pillar } = params;
  const url = new URL(request.url);

  if (!PILLAR_SLUGS.has(pillar)) {
    return NextResponse.redirect(new URL('/watch', SITE.url), 308);
  }

  const toKey = url.searchParams.get('to') || GO_DEFAULT_DESTINATION;
  const path = GO_DESTINATIONS[toKey] || GO_DESTINATIONS[GO_DEFAULT_DESTINATION];

  const target = new URL(path, SITE.url);
  target.searchParams.set('utm_source', 'youtube');
  target.searchParams.set('utm_medium', 'video');
  target.searchParams.set('utm_campaign', pillar);

  // Optional free-form slot for where in the video the link sat.
  // Sanitized hard: this value ends up in analytics, and nothing patient-
  // related may ever ride in a URL.
  const src = url.searchParams.get('src');
  if (src) {
    const clean = src.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32);
    if (clean) target.searchParams.set('utm_content', clean);
  }

  return NextResponse.redirect(target, 302);
}
