'use client';

import { ANALYTICS } from './site';

// Fire a Plausible custom event. Safe no-op if the script has not loaded.
//
// Never pass anything derived from a form field, a file name, or a patient
// identifier into `props`. Events carry marketing attribution only.
export function track(event, props = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible !== 'function') return;
  window.plausible(event, Object.keys(props).length ? { props } : undefined);
}

export const trackEmailSignup = (source) =>
  track(ANALYTICS.events.emailSignup, source ? { source } : {});

export const trackReviewClick = (source) =>
  track(ANALYTICS.events.reviewClick, source ? { source } : {});

export const trackClinicInquiry = (source) =>
  track(ANALYTICS.events.clinicInquiry, source ? { source } : {});
