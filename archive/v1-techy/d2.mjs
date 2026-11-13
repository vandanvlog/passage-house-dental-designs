// DESIGN 2 - "Noir": midnight navy + champagne gold, side rail, cinematic editorial.
import { esc, icon, practice, treatments, care, openBadge } from '../lib.mjs';

const nav = [['Treatments', 'treatments'], ['Care & plans', 'care'], ['Fees', 'fees'], ['The team', 'team'], ['Family', 'family'], ['News', 'news'], ['Contact', 'contact']];
const line = (cls = '') => `<svg class="line ${cls}" viewBox="0 0 900 420" fill="none" aria-hidden="true"><path class="l1" pathLength="1" d="M20 60C220 380 640 400 880 10"/><path class="l2" pathLength="1" d="M120 50C300 250 560 270 760 70"/><path class="l3" pathLength="1" d="M60 190C220 340 420 340 560 250"/></svg>`;
const num = (i) => String(i + 1).padStart(2, '0');

const D = {
  id: 'd2', folder: 'design-2', name: 'Noir', themeColor: '#0B1626',
  fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap',
  bodyAttrs: 'data-cursor',
  loader: (c) => `<div class="loader" aria-hidden="true"><img src="${c.sh('assets/lockup-gold.png')}" alt=""></div>`,

  shell: (c, body) => `
<aside class="rail" aria-label="Site">
  <a class="rail-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/mark-gold.png')}" alt="" width="54" height="17"></a>
  <span class="rail-txt">Passage House Dental Care · Henbury, Bristol</span>
  <button class="rail-menu" data-menu-toggle aria-expanded="false" aria-controls="overlay"><span>Menu</span><i></i></button>
</aside>
<a class="topbook btn" href="${c.u('book')}" data-magnetic>Reserve a visit</a>
<div class="overlay" id="overlay" data-menu>
  <div class="ov-in">
    <ol class="ov-links">${[['Home', ''], ...nav].map(([l, p], i) => `<li style="--i:${i}"><a href="${c.u(p)}"><span>${num(i)}</span>${l}</a></li>`).join('')}</ol>
    <div class="ov-side"><p class="x-label">Visit</p><p>${practice.address.join('<br>')}</p><p><a class="u" href="${practice.phoneHref}">${practice.phone}</a><br><a class="u" href="mailto:${practice.email}">${practice.email}</a></p><p>${openBadge()}</p><a class="btn" href="${c.u('book')}">Reserve a visit ${icon('arrow', 18)}</a></div>
  </div>
</div>
<main id="main">${body}</main>
<footer class="foot"><div class="wrap">
  <img src="${c.sh('assets/lockup-gold.png')}" alt="Passage House Dental Care" width="300">
  <div class="foot-grid">
    <div><p class="x-label">Visit</p><p>${practice.address.join(', ')}</p><p>${openBadge()}</p></div>
    <div><p class="x-label">Speak to us</p><p><a class="u" href="${practice.phoneHref}">${practice.phone}</a><br><a class="u" href="mailto:${practice.email}">${practice.email}</a></p></div>
    <div><p class="x-label">Explore</p><p class="foot-l">${nav.slice(0, 4).map(([l, p]) => `<a class="u" href="${c.u(p)}">${l}</a>`).join('')}</p></div>
  </div>
  <p class="foot-base">© ${new Date().getFullYear()} ${practice.name} · <a class="u" href="${practice.liveSite}" target="_blank" rel="noopener">Privacy &amp; policies</a></p>
</div></footer>`,

  hero: (c, { eyebrow, title, lead, crumbs = [], actions, compact }) => `
<section class="phero${compact ? ' compact' : ''}"><div class="wrap">
  <p class="x-label" data-reveal>${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a class="u" href="${c.u(p)}">${l}</a>` : esc(l))).join(' &nbsp;/&nbsp; ')}</p>
  <h1 data-reveal>${esc(title)}</h1>
  <hr class="gold">
  <div class="phero-row" data-reveal><p class="lead">${esc(lead)}</p>
    ${actions ? `<div class="phero-act"><a class="btn" href="${c.u('book')}" data-magnetic>Reserve a visit</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}</div>
</div>${line('phero-line')}</section>`,

  treatCard: (c, t, i) => `<a class="card" data-reveal style="--i:${i % 3}" href="${c.u('treatments/' + t.slug)}"><span class="cn">${num(i)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="go">Discover ${icon('arrow', 16)}</span></a>`,
  careCard: (c, t, i) => `<a class="card" data-reveal style="--i:${i % 3}" href="${c.u('care/' + t.slug)}"><span class="cn">${num(i)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="go">Read more ${icon('arrow', 16)}</span></a>`,

  cta: (c) => `
<section class="x-sec cta"><div class="wrap"><div class="cta-in" data-reveal>
  <p class="x-label">Your visit</p>
  <h2>Reserve your <em>appointment</em></h2>
  <p class="lead">Four quick steps online, or call the team on <a class="u" href="${practice.phoneHref}">${practice.phone}</a>.</p>
  <div class="cta-act"><a class="btn" href="${c.u('book')}" data-magnetic>Begin ${icon('arrow', 18)}</a><a class="btn ghost" href="${c.u('contact')}">Find us</a></div>
</div></div></section>`,

  home: (c) => {
    const hs = ['dental-implants', 'orthodontics', 'smilefast', 'veneers', 'teeth-whitening', 'hygienist'].map((s) => treatments.find((t) => t.slug === s));
    return `
<section class="hero">
  ${line('hero-line')}
  <div class="wrap hero-in">
    <p class="x-label" data-reveal>Henbury, Bristol &nbsp;·&nbsp; NHS &amp; Private</p>
    <h1 class="hero-h"><span class="ln"><span>The art of a</span></span><br><span class="ln"><span><em>confident</em> smile.</span></span></h1>
    <div class="hero-meta" data-reveal>
      <p class="lead">Modern dentistry for all. Implants, orthodontics and cosmetic care, delivered by a team that takes its time.</p>
      <div class="hero-act"><a class="btn" href="${c.u('book')}" data-magnetic>Reserve a visit ${icon('arrow', 18)}</a><a class="btn ghost" href="${c.u('treatments')}">Our treatments</a></div>
    </div>
  </div>
  <div class="wrap hero-foot" data-reveal><span>${openBadge()}</span><span>${practice.address.slice(0, 2).join(', ')}</span><a class="u" href="${practice.phoneHref}">${practice.phone}</a><span class="scroll">Scroll</span></div>
</section>

<section class="x-sec intro"><div class="wrap intro-g">
  <p class="x-label" data-reveal>(01) &nbsp;The practice</p>
  <div>
    <p class="big" data-reveal>A friendly, professional and <em>caring</em> team - with the skill of specialists and the patience of people who genuinely enjoy what they do.</p>
    <div class="facts">
      <div data-reveal><b data-count="8">8</b><span>Dentists</span></div>
      <div data-reveal style="--i:1"><b>Specialist</b><span>Orthodontist, Dr Ben Cross</span></div>
      <div data-reveal style="--i:2"><b data-count="2.30" data-prefix="£">£2.30</b><span>Dental Plan, per week</span></div>
    </div>
  </div>
</div></section>

<section class="hs" data-hscroll>
  <div class="hs-stick">
    <div class="wrap hs-head"><div><p class="x-label">(02) &nbsp;Signature treatments</p><h2>Crafted <em>with care.</em></h2></div><a class="u" href="${c.u('treatments')}">All treatments ${icon('arrow', 16)}</a></div>
    <div class="hs-track" data-track>${hs.map((t, i) => `<a class="hs-card" href="${c.u('treatments/' + t.slug)}" data-hover><span class="cn">${num(i)}</span><div class="hs-art">${line()}</div><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="go">Discover ${icon('arrow', 16)}</span></a>`).join('')}</div>
    <div class="hs-bar"><i data-bar></i></div>
  </div>
</section>

<section class="x-sec list"><div class="wrap">
  <div class="list-h"><p class="x-label" data-reveal>(03) &nbsp;Every treatment</p><h2 data-reveal>From check-up to <em>transformation.</em></h2></div>
  <ol class="rows">${treatments.map((t, i) => `<li data-reveal><a href="${c.u('treatments/' + t.slug)}"><span class="rn">${num(i)}</span><h3>${esc(t.name)}</h3><p>${esc(t.group)}</p><i>${icon('arrow', 22)}</i></a></li>`).join('')}</ol>
</div></section>

<section class="x-sec plan"><div class="wrap plan-g">
  <div class="plan-card" data-reveal><div class="glow" aria-hidden="true"></div><div class="plan-glass">
    <p class="x-label">Dental Plan</p><div class="plan-p"><span data-count="2.30" data-prefix="£">£2.30</span><small>per week</small></div>
    <ul><li>${icon('check', 18)}Annual private check-ups &amp; hygiene</li><li>${icon('check', 18)}10% off many routine treatments</li><li>${icon('check', 18)}Accident &amp; emergency scheme</li></ul>
    <a class="btn" href="${c.u('care/dental-plan')}">Explore the plan</a></div></div>
  <div class="plan-copy"><p class="x-label" data-reveal>(04) &nbsp;Care, your way</p><h2 data-reveal>NHS, private or <em>by plan.</em></h2>
    <ul class="mini">${['nhs', 'private', 'finance', 'nervous-patients', 'urgent-care'].map((s) => { const x = care.find((q) => q.slug === s); return `<li data-reveal><a href="${c.u('care/' + s)}"><span>${esc(x.name)}</span>${icon('arrow', 18)}</a></li>`; }).join('')}</ul></div>
</div></section>
${D.cta(c)}`;
  },
};
export default D;
