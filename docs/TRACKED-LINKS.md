# Tracked link convention

Every link in a YouTube description points at `emmadiponiomd.com/go/...`, never
at a page directly. The redirect attaches the UTMs, so descriptions stay short
and every consult can be attributed back to the series that produced it.

## The four pillar links

| Series | Link to paste in the description | Lands on |
| --- | --- | --- |
| The Verdict | `https://emmadiponiomd.com/go/verdict` | `/start` |
| Decoded | `https://emmadiponiomd.com/go/decoded` | `/start` |
| What Your Scan Knows | `https://emmadiponiomd.com/go/scans` | `/start` |
| Case Files | `https://emmadiponiomd.com/go/cases` | `/start` |

## Sending a pillar somewhere else

Add `?to=` with one of four keys. Anything else is ignored and falls back to
`/start`, so a typo can never produce a broken or hostile link.

| `?to=` | Destination |
| --- | --- |
| `start` (default) | `/start` |
| `clinics` | `/for-clinics` |
| `watch` | `/watch` |
| `home` | `/` |

Example: `https://emmadiponiomd.com/go/decoded?to=clinics`

## Marking where in the video the link sat

Add `?src=` to separate a pinned comment from an end card from the description.

| `?src=` | Meaning |
| --- | --- |
| `desc` | First link in the description |
| `pinned` | Pinned comment |
| `endcard` | End card or card overlay |
| `community` | Community tab post |

Example: `https://emmadiponiomd.com/go/scans?src=pinned`

The value is lowercased, stripped to letters, numbers, hyphen and underscore,
and cut at 32 characters. **Never put anything about a patient in it.** It ends
up in a URL and in analytics.

## What lands in Plausible

```
/go/verdict?src=pinned
  -> /start?utm_source=youtube
           &utm_medium=video
           &utm_campaign=verdict
           &utm_content=pinned
```

In Plausible, `utm_campaign` is the series and `utm_content` is the placement.
Filter the **Review Click** goal by `utm_campaign` to see which series actually
produces paid reviews, not just views.

## Rules

1. Never paste a bare `/start` or `/for-clinics` link in a description. It
   converts the same and tells you nothing.
2. `/go/*` is `Disallow`ed in robots.txt. These are tracking redirects, not
   pages, and they should never appear in search results.
3. Adding a series means adding it to `PILLARS` in `src/lib/site.js`. The
   redirect, the `/watch` filter, and the UTM value all follow from that one
   entry.
