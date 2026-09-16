import { PILLARS } from './site';

// ---------------------------------------------------------------------------
// ARTICLE + VIDEO DATA
//
// One entry per video. The same entry drives the /watch card and the
// /articles/<slug> page, so a video is added in exactly one place.
//
// `body` is an array of blocks. Write the article as the full text version of
// the video, not a summary: it has to answer the query on its own, because
// that is the only reason Google ranks it above the YouTube result.
//
// NOTE ON CASE FILES: anything under the `cases` pillar must be de-identified
// to the Safe Harbor standard before it goes in this file. No dates of
// service, no ages over 89, no geography finer than state, no images that
// carry burned-in DICOM headers. This file is public in the repo.
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} Article
 * @property {string} slug
 * @property {string} pillar        one of PILLARS[].slug
 * @property {string} title         the article H1 / <title>
 * @property {string} videoTitle    the YouTube title, if it differs
 * @property {string} description   meta description + OG description
 * @property {string} youtubeId
 * @property {string} publishedAt   ISO date
 * @property {string} [updatedAt]   ISO date
 * @property {string} [duration]    ISO 8601, e.g. 'PT8M32S'
 * @property {Array<{type:string, text?:string, items?:string[]}>} body
 * @property {Array<{q:string, a:string}>} faqs
 */

/** @type {Article[]} */
export const ARTICLES = [
  // Example shape, kept out of the live list until real content exists.
  // Copy this block, fill it in, and remove `draft: true` to publish.
  {
    slug: 'example-what-a-coronary-calcium-score-actually-tells-you',
    pillar: 'decoded',
    draft: true,
    title: 'What a Coronary Calcium Score Actually Tells You',
    videoTitle: 'Coronary Calcium Score, Decoded',
    description:
      'A radiologist walks through what a coronary calcium score measures, what the number ranges mean, and the three things the score cannot tell you.',
    youtubeId: '',
    publishedAt: '2026-01-01',
    duration: 'PT8M00S',
    body: [
      { type: 'p', text: 'Replace this with the full article text.' },
    ],
    faqs: [
      {
        q: 'Is a calcium score the same as a stress test?',
        a: 'No. Replace this with the real answer.',
      },
    ],
  },
];

export const getAllArticles = () =>
  ARTICLES.filter((a) => !a.draft).sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

export const getArticle = (slug) =>
  ARTICLES.find((a) => a.slug === slug && !a.draft) || null;

export const getArticlesByPillar = (pillarSlug) =>
  getAllArticles().filter((a) => a.pillar === pillarSlug);

export const pillarFor = (slug) => PILLARS.find((p) => p.slug === slug) || null;
