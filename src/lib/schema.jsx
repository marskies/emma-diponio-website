import { SITE, CONTACT, REVIEW_OFFER, needsEmma } from './site';

const clean = (obj) => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue;
    if (typeof v === 'string' && (v === '' || needsEmma(v))) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
};

// Physician schema.
//
// worksFor / jobTitle removed: she is independent. addressLocality and
// areaServed removed: she practices remotely and areaServed should reflect
// licensure, which only Emma can state. Wrong structured data is worse than
// absent structured data, because Google treats it as a claim.
export function physicianSchema() {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: SITE.name,
    url: `${SITE.url}/`,
    image: `${SITE.url}/emma-headshot.jpg`,
    medicalSpecialty: ['Radiology', 'Diagnostic Radiology', 'PreventiveMedicine'],
    knowsAbout: [
      'Longevity Medicine',
      'Diagnostic Imaging',
      'Second Opinion Imaging Review',
      'Venous and Lymphatic Medicine',
      'Preventive Imaging',
    ],
    availableService: REVIEW_OFFER.live
      ? clean({
          '@type': 'MedicalProcedure',
          name: REVIEW_OFFER.name,
          url: `${SITE.url}/start`,
        })
      : null,
    sameAs: [CONTACT.linkedin, CONTACT.instagram, CONTACT.youtube].filter(
      (u) => u && !needsEmma(u)
    ),
    description:
      'Triple board-certified diagnostic radiologist and longevity medicine physician offering independent second opinion imaging review and consulting to clinics.',
  });
}

export function videoObjectSchema(article) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: article.videoTitle || article.title,
    description: article.description,
    thumbnailUrl: article.youtubeId
      ? [`https://i.ytimg.com/vi/${article.youtubeId}/maxresdefault.jpg`]
      : null,
    uploadDate: article.publishedAt,
    duration: article.duration || null,
    embedUrl: article.youtubeId
      ? `https://www.youtube-nocookie.com/embed/${article.youtubeId}`
      : null,
    contentUrl: article.youtubeId
      ? `https://www.youtube.com/watch?v=${article.youtubeId}`
      : null,
    publisher: { '@type': 'Person', name: SITE.name, url: `${SITE.url}/` },
  });
}

export function faqPageSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
