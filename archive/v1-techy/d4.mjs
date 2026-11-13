// DESIGN 4 - "Index": Swiss / typographic. Paper + ink + acid lime, mono labels, hairline grids, full-screen index menu.
import { esc, icon, practice, treatments, care, team, openBadge } from '../lib.mjs';

const nav = [['Treatments', 'treatments'], ['Care options', 'care'], ['Fees', 'fees'], ['Team', 'team'], ['Family', 'family'], ['News', 'news'], ['Contact', 'contact']];
const num = (i) => String(i + 1).padStart(2, '0');
const from = {
  'dental-implants': 'from £2,650', orthodontics: 'from £3,000', hygienist: 'from £60', smilefast: 'from £300', 'cosmetic-dentistry': 'by consultation',
  'teeth-whitening': '£350', veneers: 'from £300', crowns: 'from £600', bridges: 'from £660', dentures: 'from £750', 'white-fillings': 'from £90', 'root-canal': 'from £395',
};

const D = {
  id: 'd4', folder: 'design-4', name: 'Index', themeColor: '#EFEBE3',
  fonts: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
  bodyAttrs: 'data-cursor',
  loader: (c) => `<div class="loader" aria-hidden="true"><img src="${c.sh('assets/lockup-white.png')}" alt=""></div>`,

  shell: (c, body) => `
<header class="top"><a class="top-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/mark-ink.png')}" alt="" width="58" height="18"><span>Passage House<br><small>Dental Care</small></span></a>
  <div class="top-r"><span class="top-open">${openBadge()}</span><a class="btn" href="${c.u('book')}" data-magnetic>Book</a><button class="top-menu" data-menu-toggle aria-expanded="false" aria-controls="idx"><span>Index</span><i></i><i></i></button></div></header>
<div class="idx" id="idx" data-menu>
  <div class="idx-in">
    <p class="x-label">Index</p>
    <ol>${[['Home', ''], ...nav, ['Book an appointment', 'book']].map(([l, p], i) => `<li style="--i:${i}"><a href="${c.u(p)}"><span>${num(i)}</span>${l}<i>${icon('arrow', 32)}</i></a></li>`).join('')}</ol>
    <p class="idx-f">${practice.address.join(', ')} · <a class="u" href="${practice.phoneHref}">${practice.phone}</a></p>
  </div>
</div>
<main id="main">${body}</main>
<footer class="foot"><div class="wrap">
  <div class="foot-big">Modern<br>dentistry<br><span>for all.</span></div>
  <div class="foot-grid">
    <div><p class="x-label">Practice</p><p>${practice.address.join('<br>')}</p></div>
    <div><p class="x-label">Contact</p><p><a class="u" href="${practice.phoneHref}">${practice.phone}</a><br><a class="u" href="mailto:${practice.email}">${practice.email}</a></p></div>
    <div><p class="x-label">Hours</p><p>Mon 08:30-17:30<br>Tue 08:30-18:30<br>Wed 08:30-17:00<br>Thu 08:00-17:30<br>Fri 08:00-16:00</p></div>
    <div><p class="x-label">Index</p><p class="fl">${nav.slice(0, 5).map(([l, p]) => `<a class="u" href="${c.u(p)}">${l}</a>`).join('')}</p></div>
  </div>
  <p class="foot-base"><span>© ${new Date().getFullYear()} ${practice.name}</span><a class="u" href="${practice.liveSite}" target="_blank" rel="noopener">Privacy &amp; policies</a></p>
</div></footer>`,

  hero: (c, { eyebrow, title, lead, crumbs = [], actions, compact }) => `
<section class="phero${compact ? ' compact' : ''}"><div class="wrap">
  <div class="phero-bar"><span>${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a class="u" href="${c.u(p)}">${l}</a>` : esc(l))).join(' / ')}</span><span>${esc(eyebrow)}</span></div>
  <h1 data-reveal>${esc(title)}</h1>
  <div class="phero-row" data-reveal><p class="lead">${esc(lead)}</p>${actions ? `<div class="phero-act"><a class="btn" href="${c.u('book')}" data-magnetic>Book now ${icon('arrow', 18)}</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}</div>
</div></section>`,

  treatCard: (c, t, i) => `<a class="card" data-reveal style="--i:${i % 3}" href="${c.u('treatments/' + t.slug)}"><span class="cn">${num(i)} / ${esc(t.group)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="foot-c"><b>${from[t.slug] || ''}</b><i>${icon('arrow', 20)}</i></span></a>`,
  careCard: (c, t, i) => `<a class="card" data-reveal style="--i:${i % 3}" href="${c.u('care/' + t.slug)}"><span class="cn">${num(i)} / Care</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="foot-c"><b></b><i>${icon('arrow', 20)}</i></span></a>`,

  cta: (c) => `
<section class="cta"><div class="wrap"><a class="cta-a" href="${c.u('book')}" data-hover><span class="x-label">Next step</span><b>Book your<br>visit <i>${icon('arrow', 96)}</i></b></a></div></section>`,

  home: (c) => {
    const steps = [['Request', 'Choose what you need and a preferred time. Four steps, one minute.'], ['Confirm', 'The team calls or emails to confirm - and to answer anything you would like to ask.'], ['Plan', 'Your dentist explains the options and costs clearly before any treatment begins.'], ['Treat', 'Care delivered gently, with 0% finance and Dental Plan savings if they suit you.']];
    const tick = ['NHS', 'Private', 'Dental Plan from £2.30/wk', '0% finance', 'Implants', 'Orthodontics', 'Nervous patients welcome', 'Same-day urgent slots', 'Dementia friendly'].map((w) => `<span>${w}</span><i>✦</i>`).join('');
    return `
<section class="hero"><div class="wrap">
  <p class="x-label" data-reveal>Passage House Dental Care — Henbury, Bristol</p>
  <h1 class="hero-h"><span class="ln"><span>Modern</span></span><br><span class="ln"><span>dentistry</span></span><br><span class="ln"><span><mark>for all.</mark></span></span></h1>
  <div class="hero-grid" data-reveal>
    <div><span class="x-label">Practice</span><p>${practice.address.slice(0, 3).join(', ')}<br>${practice.address[3]}</p></div>
    <div><span class="x-label">Status</span><p>${openBadge()}<br>Mon-Fri</p></div>
    <div><span class="x-label">Call</span><p><a class="u" href="${practice.phoneHref}">${practice.phone}</a><br><a class="u" href="mailto:${practice.email}">Email us</a></p></div>
    <div><a class="btn" href="${c.u('book')}" data-magnetic>Request an appointment ${icon('arrow', 18)}</a></div>
  </div>
</div></section>

<div class="ticker" aria-hidden="true"><div><span class="tk">${tick}</span><span class="tk">${tick}</span></div></div>

<section class="dark index"><div class="wrap">
  <div class="index-h"><p class="x-label">(A) Services index</p><h2 data-reveal>Twelve treatments.<br>Prices up front.</h2></div>
  <ol class="irows">${treatments.map((t, i) => `<li data-reveal><a href="${c.u('treatments/' + t.slug)}"><span class="in">${num(i)}</span><h3>${esc(t.name)}</h3><span class="ig">${esc(t.group)}</span><span class="ip">${from[t.slug] || ''}</span><i>${icon('arrow', 24)}</i></a></li>`).join('')}</ol>
  <p class="x-note" style="color:#9fa8b3">Private guide prices (2024 listing). NHS care is also available - <a class="u" href="${c.u('care/nhs')}">see NHS options</a>.</p>
</div></section>

<section class="steps" data-steps><div class="wrap steps-g">
  <div class="steps-l"><p class="x-label">(B) How it works</p><div class="bigno" data-no>01</div><h2 data-title>${steps[0][0]}</h2></div>
  <ol class="steps-r">${steps.map(([h, p], i) => `<li data-s="${num(i)}" data-t="${h}"><span class="x-label">Step ${num(i)}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
</div></section>

<section class="x-sec people"><div class="wrap">
  <div class="people-h"><p class="x-label">(C) The team</p><h2 data-reveal>Ten clinicians.<br>One friendly crew.</h2></div>
  <div class="pgrid">
    <div data-reveal><b data-count="8">8</b><span>Dentists</span></div>
    <div data-reveal style="--i:1"><b data-count="1">1</b><span>Specialist orthodontist</span></div>
    <div data-reveal style="--i:2"><b data-count="1">1</b><span>Dental hygienist</span></div>
    <div data-reveal style="--i:3"><b data-count="${team.nurses.length}">${team.nurses.length}</b><span>Dental nurses</span></div>
  </div>
  <a class="btn dark" href="${c.u('team')}">Meet the team ${icon('arrow', 18)}</a>
</div></section>

<section class="x-sec care-s"><div class="wrap">
  <p class="x-label">(D) Ways to pay</p>
  <div class="ways">${[['nhs', 'NHS', 'Provided here for decades. Banded charges unless exempt.'], ['private', 'Private', 'Pay as you go. No monthly fees.'], ['dental-plan', 'Dental Plan', 'From £2.30 a week. 10% off many treatments.'], ['finance', '0% Finance', 'Spread the cost of larger treatment.']].map(([s, h, p], i) => `<a href="${c.u('care/' + s)}" data-reveal style="--i:${i}"><span class="x-label">${num(i)}</span><h3>${h}</h3><p>${p}</p><i>${icon('arrow', 22)}</i></a>`).join('')}</div>
</div></section>
${D.cta(c)}`;
  },
};
export default D;
