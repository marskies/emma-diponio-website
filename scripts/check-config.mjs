// Pre-build gate.
//
// Fails the build if the paid review is switched live while any of its legal
// or compliance prerequisites are still unset. Warns (but does not fail) on
// everything else that is still waiting on Emma.

import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/lib/site.js', import.meta.url), 'utf8');

const val = (key) => {
  const m = src.match(new RegExp(`${key}:\\s*(.+?),?\\n`));
  return m ? m[1].trim().replace(/^['"]|['"],?$/g, '') : null;
};

const reviewLive = /live:\s*true/.test(src);
const baaExecuted = /baaExecuted:\s*true/.test(src);

const pending = [...src.matchAll(/(\w+):\s*'NEEDS_EMMA:([\w-]+)'/g)].map(
  (m) => `${m[1]} (${m[2]})`
);

const RED = '\x1b[31m', YEL = '\x1b[33m', GRN = '\x1b[32m', OFF = '\x1b[0m';

if (pending.length) {
  console.log(`\n${YEL}Waiting on Emma (${pending.length}):${OFF}`);
  for (const p of pending) console.log(`  - ${p}`);
}

const blockers = [];

if (reviewLive && !baaExecuted) {
  blockers.push(
    'REVIEW_OFFER.live is true but INTAKE.baaExecuted is false. ' +
    'The paid review cannot ship without an executed BAA.'
  );
}
if (reviewLive && val('licensureNotice')?.startsWith('NEEDS_EMMA')) {
  blockers.push('REVIEW_OFFER.live is true but licensureNotice is unset.');
}
if (reviewLive && val('price')?.startsWith('NEEDS_EMMA')) {
  blockers.push('REVIEW_OFFER.live is true but price is unset.');
}
if (baaExecuted && val('secureUploadUrl')?.startsWith('NEEDS_EMMA')) {
  blockers.push('INTAKE.baaExecuted is true but secureUploadUrl is unset.');
}

if (blockers.length) {
  console.error(`\n${RED}BUILD BLOCKED${OFF}`);
  for (const b of blockers) console.error(`  ✗ ${b}`);
  console.error('');
  process.exit(1);
}

console.log(`\n${GRN}Config check passed.${OFF} Review offer is ${reviewLive ? 'LIVE' : 'gated (not selling)'}.\n`);
