// ---------------------------------------------------------------------------
// SITE CONFIG - single source of truth
//
// Anything Emma has to supply lives here and nowhere else.
// Items marked NEEDS_EMMA are placeholders. The build prints a warning for each
// one that is still unset (see scripts/check-config.mjs).
// ---------------------------------------------------------------------------

export const SITE = {
  url: 'https://emmadiponiomd.com',
  name: 'Dr. Emma DiPonio, MD',
  shortName: 'Dr. Emma DiPonio',
};

// --- CONTACT ---------------------------------------------------------------
// URGENT: the live site currently mails emmad@lifespan-edge.com, which is a
// former-employer address. Every inquiry since she left has gone there.
export const CONTACT = {
  email: 'NEEDS_EMMA:new-contact-email',
  linkedin: 'https://www.linkedin.com/in/dr-emma-diponio-md-24b5778a/',
  instagram: 'https://www.instagram.com/emmadiponio.md/',
  youtube: 'NEEDS_EMMA:youtube-channel-url',
};

// --- THE PAID OFFER --------------------------------------------------------
// Blocked on: executed BAA, Emma's price, Emma's licensure copy.
export const REVIEW_OFFER = {
  live: false, // flip to true only after the BAA is executed and verified
  name: 'Second Opinion Imaging Review',
  price: 'NEEDS_EMMA:price',
  currency: 'USD',
  turnaround: 'NEEDS_EMMA:turnaround',
  // Emma writes this verbatim. Do not draft it, do not paraphrase it.
  licensureNotice: 'NEEDS_EMMA:licensure-notice',
  licensedStates: [], // e.g. ['MI', 'FL'] - drives the self-qualifying list
  whatsIncluded: [],  // NEEDS_EMMA
  whatsNotIncluded: [], // NEEDS_EMMA
  checkoutUrl: 'NEEDS_EMMA:checkout-or-booking-url',
};

// --- HIPAA INTAKE ----------------------------------------------------------
// ARCHITECTURE RULE: this must be a hosted/iframed form on the vendor's own
// domain. PHI must never transit a route on this site. The moment a custom
// React form POSTs to an API route here, Vercel enters the PHI perimeter and
// needs its own BAA. Keep the boundary at the iframe.
export const INTAKE = {
  vendor: 'jotform',
  baaExecuted: false, // set true only when Emma has the countersigned BAA in hand
  baaExecutedDate: null,
  baaHolder: 'Dr. Emma DiPonio', // account owner + BAA signatory, not Sky & Mar
  secureUploadUrl: 'NEEDS_EMMA:hipaa-form-url',
  // Non-PHI inquiry form. Safe to build now, no BAA required.
  inquiryFormUrl: 'NEEDS_EMMA:inquiry-form-url',
};

// --- CONTENT PILLARS -------------------------------------------------------
// Drives /watch filters, /go/* redirects, and UTM campaign values.
export const PILLARS = [
  {
    slug: 'verdict',
    name: 'The Verdict',
    blurb: 'Where the evidence actually lands on a popular longevity claim.',
  },
  {
    slug: 'decoded',
    name: 'Decoded',
    blurb: 'Plain-language explanations of what a scan, a marker, or a study means.',
  },
  {
    slug: 'scans',
    name: 'What Your Scan Knows',
    blurb: 'The findings hiding in imaging most people never have explained to them.',
  },
  {
    slug: 'cases',
    name: 'Case Files',
    blurb: 'De-identified teaching cases and what changed the read.',
  },
];

// --- TRACKED LINKS ---------------------------------------------------------
// /go/<pillar> appends UTMs and redirects. Destinations are whitelisted here:
// an unlisted target is rejected, so /go/* can never become an open redirect.
export const GO_DESTINATIONS = {
  start: '/start',
  clinics: '/for-clinics',
  watch: '/watch',
  home: '/',
};
export const GO_DEFAULT_DESTINATION = 'start';

// --- ANALYTICS -------------------------------------------------------------
// Plausible: cookieless, no PII, so it stays clear of the PHI question.
// Hard rule: never load it on a page that embeds the secure upload form.
export const ANALYTICS = {
  provider: 'plausible',
  domain: 'emmadiponiomd.com',
  events: {
    emailSignup: 'Email Signup',
    reviewClick: 'Review Click',
    clinicInquiry: 'Clinic Inquiry',
  },
};

// --- EMAIL (Beehiiv) -------------------------------------------------------
export const EMAIL = {
  provider: 'beehiiv',
  embedUrl: 'NEEDS_EMMA:beehiiv-embed-url',
  publicationName: 'NEEDS_EMMA:newsletter-name',
};

// --- COMPLIANCE COPY -------------------------------------------------------
// Scoped deliberately. The education disclaimer belongs on content pages only.
// Putting "no doctor-patient relationship" on a page selling a paid clinical
// review would misrepresent the service being sold.
export const DISCLAIMERS = {
  content:
    'This content is for general education only. It is not medical advice, ' +
    'it is not a diagnosis, and viewing it does not create a doctor-patient ' +
    'relationship. Always consult your own physician about your care.',
  reviewScope:
    'A second opinion imaging review is a professional service rendered by a ' +
    'licensed physician. It does not replace care from your treating physician ' +
    'and it is not emergency care.',
};

export const NEEDS_EMMA_PREFIX = 'NEEDS_EMMA:';
export const needsEmma = (v) =>
  typeof v === 'string' && v.startsWith(NEEDS_EMMA_PREFIX);
