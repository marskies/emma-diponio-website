import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import Disclaimer from '@/components/Disclaimer';
import VideoEmbed from '@/components/VideoEmbed';
import { JsonLd, videoObjectSchema, faqPageSchema } from '@/lib/schema';
import { P, F } from '@/lib/brand';
import { SITE } from '@/lib/site';
import { getAllArticles, getArticle, pillarFor } from '@/lib/articles';

// Statically generated at build time. This is the whole point of the Next
// migration: the article body is in the HTML the crawler receives, and the
// per-page OG tags are real instead of inherited from the homepage.
export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  const url = `${SITE.url}/articles/${article.slug}`;
  const image = article.youtubeId
    ? `https://i.ytimg.com/vi/${article.youtubeId}/maxresdefault.jpg`
    : '/emma-headshot.jpg';

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="h2" style={{ fontFamily: F.d, color: P.navy, margin: '40px 0 14px' }}>{block.text}</h2>;
    case 'h3':
      return <h3 className="h3" style={{ fontFamily: F.d, color: P.navy, margin: '28px 0 10px' }}>{block.text}</h3>;
    case 'ul':
      return (
        <ul style={{ listStyle: 'none', display: 'grid', gap: '10px', padding: 0, margin: '0 0 18px' }}>
          {(block.items || []).map((it) => (
            <li key={it} style={{ display: 'flex', gap: '10px' }}>
              <span aria-hidden="true" style={{ color: P.gold, flexShrink: 0 }}>—</span>
              <span className="body" style={{ color: P.mid }}>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <p className="body" style={{ color: P.navy, background: 'rgba(196,162,101,0.08)', borderLeft: `2px solid ${P.gold}`, padding: '16px 18px', margin: '0 0 18px' }}>
          {block.text}
        </p>
      );
    default:
      return <p className="body" style={{ color: P.mid, margin: '0 0 18px' }}>{block.text}</p>;
  }
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const pillar = pillarFor(article.pillar);
  const faqSchema = faqPageSchema(article.faqs);

  return (
    <PageShell>
      <JsonLd data={videoObjectSchema(article)} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <article className="section-sm" style={{ background: P.cream }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <p style={{ fontFamily: F.b, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: P.gold, marginBottom: '12px' }}>
            <Link href="/watch" style={{ textDecoration: 'none', color: 'inherit' }}>
              {pillar ? pillar.name : 'Watch'}
            </Link>
          </p>

          <h1 className="h1" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 14px', fontSize: 'clamp(26px, 4.6vw, 40px)' }}>
            {article.title}
          </h1>

          <p className="body" style={{ color: P.mid, margin: '0 0 8px' }}>{article.description}</p>
          <p className="small" style={{ color: P.light, margin: '0 0 28px' }}>
            Dr. Emma DiPonio, MD
            {article.publishedAt && (
              <>
                {' · '}
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </>
            )}
          </p>

          <VideoEmbed youtubeId={article.youtubeId} title={article.videoTitle || article.title} />

          <div style={{ marginTop: '36px' }}>
            {(article.body || []).map((block, i) => <Block key={i} block={block} />)}
          </div>

          {article.faqs?.length > 0 && (
            <section style={{ marginTop: '44px' }}>
              <h2 className="h2" style={{ fontFamily: F.d, color: P.navy, margin: '0 0 20px' }}>Common questions</h2>
              <div style={{ display: 'grid', gap: '2px' }}>
                {article.faqs.map((f) => (
                  <details key={f.q} style={{ background: P.white, border: '1px solid rgba(27,42,74,0.05)', borderRadius: '4px', padding: '16px 18px' }}>
                    <summary style={{ fontFamily: F.d, fontSize: '16px', fontWeight: 500, color: P.navy, cursor: 'pointer' }}>{f.q}</summary>
                    <p className="body" style={{ color: P.mid, margin: '12px 0 0' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <Disclaimer />

          <p className="small" style={{ color: P.light }}>
            <Link href="/watch" style={{ color: P.gold, textDecoration: 'none' }}>← All videos</Link>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
