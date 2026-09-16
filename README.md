# emmadiponiomd.com

Next.js 14 (App Router) on Vercel. Built by Sky & Mar Studio LLC.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # runs the config gate first
```

## Routes

| Route | What it is | Status |
| --- | --- | --- |
| `/` | Homepage | Live |
| `/for-clinics` | B2B imaging consulting | Live |
| `/watch` | Video hub, filterable by series | Live, awaiting content |
| `/articles/[slug]` | Written version of each video | Live, awaiting content |
| `/start` | Paid second-opinion review | **Gated**, noindex |
| `/secure-upload` | HIPAA intake boundary | **Gated**, noindex |
| `/go/[pillar]` | Tracked redirect | Live — see `docs/TRACKED-LINKS.md` |

## Everything Emma has to supply

All of it lives in `src/lib/site.js`, marked `NEEDS_EMMA:`. Nothing is
hardcoded anywhere else. `npm run build` prints what is still outstanding.

## The two gates

`npm run build` fails, deliberately, if either is violated:

1. `REVIEW_OFFER.live` cannot be `true` while `INTAKE.baaExecuted` is `false`.
2. `REVIEW_OFFER.live` cannot be `true` without a price and the licensure notice.

## PHI boundary — read before changing the intake

Patient information must never touch a route on this site.

- The upload is an **iframe to the vendor's own domain**. The browser posts
  directly to them. Vercel is therefore not a business associate and needs no
  BAA of its own.
- Replacing that iframe with a React form that POSTs to an API route here
  changes that in one commit. Do not.
- `/secure-upload` loads **no analytics**. The exclusion is in
  `src/components/Analytics.jsx`, not in the page, so it cannot be forgotten.
- No patient data in URLs, ever. `/go/*` sanitizes its one free-text parameter.
- The email list is a **newsletter**, not a review waitlist. Beehiiv does not
  sign a BAA, so the list must never be framed as an intent to obtain care.

## Disclaimers are scoped on purpose

`<Disclaimer />` — "educational, not medical advice, no doctor-patient
relationship" — goes on content pages only: `/watch`, `/articles/*`.

`<ServiceScopeNote />` goes on `/start`. A paid review by a licensed physician
*is* clinical work. Telling a paying patient no doctor-patient relationship
exists would misdescribe what they bought.

## Constraints that are not negotiable

- Emma's brand identity only (`src/lib/brand.js`). Not Sky & Mar's, not a
  former employer's.
- No testimonials, reviews, or patient images anywhere. Territory medical board
  advertising rules.
- Case Files content must be de-identified to Safe Harbor before it enters
  `src/lib/articles.js`. That file is public in this repo.

## Not built, on purpose

Members area, paid product checkout, community features. Month 6+.
