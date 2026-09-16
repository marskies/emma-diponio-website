import { SITE, REVIEW_OFFER } from '@/lib/site';
import { getAllArticles } from '@/lib/articles';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: `${SITE.url}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE.url}/for-clinics`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/watch`, changeFrequency: 'weekly', priority: 0.8 },
    ...(REVIEW_OFFER.live
      ? [{ url: `${SITE.url}/start`, changeFrequency: 'monthly', priority: 0.9 }]
      : []),
  ].map((r) => ({ ...r, lastModified: now }));

  const articles = getAllArticles().map((a) => ({
    url: `${SITE.url}/articles/${a.slug}`,
    lastModified: a.updatedAt || a.publishedAt || now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...articles];
}
