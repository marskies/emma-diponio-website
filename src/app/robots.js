import { SITE } from '@/lib/site';

export default function robots() {
  return {
    rules: [
      // /go/* are tracking redirects, not content. Keeping them out of the
      // index stops duplicate-URL noise and keeps UTMs out of search results.
      { userAgent: '*', allow: '/', disallow: ['/go/'] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
