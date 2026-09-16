'use client';

import Link from 'next/link';
import { track } from '@/lib/track';

// Client island so server-rendered pages can still fire an analytics event.
// `props` must never contain anything derived from user input.
export default function TrackedLink({ event, props, href, children, style, external }) {
  const onClick = () => { if (event) track(event, props || {}); };
  if (external) {
    return <a href={href} onClick={onClick} style={style} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  return <Link href={href} onClick={onClick} style={style}>{children}</Link>;
}
