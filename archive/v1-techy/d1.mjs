// DESIGN 1 - "Aurora": porcelain light, serif display, floating dock nav, bento grid.
import { esc, icon, practice, treatments, care, team, openBadge } from '../lib.mjs';

const swoosh = (cls = '') => `<svg class="swoosh ${cls}" viewBox="0 0 400 220" fill="none" aria-hidden="true"><path d="M10 30C90 190 280 200 392 6" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M60 24C130 110 230 120 320 40" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M30 90C100 175 200 175 270 130" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".3"/></svg>`;

const nav = [['Treatments', 'treatments'], ['Care & plans', 'care'], ['Fees', 'fees'], ['Team', 'team'], ['Family', 'family'], ['Contact', 'contact']];

const D = {
  id: 'd1', folder: 'design-1', name: 'Aurora', themeColor: '#F3EFE8',
  fonts: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap',
  bodyAttrs: 'data-cursor',
  loader: (c) => `<div class="loader" aria-hidden="true"><img src="${c.sh('assets/lockup-white.png')}" alt=""></div>`,

  shell: (c, body) => `
<header class="dock-wrap">
  <nav class="dock" aria-label="Main">
    <a class="dock-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/mark-navy.png')}" alt="" width="64" height="20"><span>Passage House</span></a>
    <ul class="dock-links" data-menu>${nav.map(([l, p]) => `<li><a class="u" href="${c.u(p)}">${l}</a></li>`).join('')}</ul>
    <a class="btn dock-cta" href="${c.u('book')}" data-magnetic>Book</a>
    <button class="dock-burger" data-menu-toggle aria-expanded="false" aria-label="Menu">${icon('menu', 22)}</button>
  </nav>
</header>
<div class="sheet" data-menu aria-label="Menu">
  <ul>${[['Home', ''], ...nav, ['Book an appointment', 'book']].map(([l, p], i) => `<li style="--i:${i}"><a href="${c.u(p)}">${l}</a></li>`).join('')}</ul>
  <p>${practice.phone}</p>
</div>
<main id="main">${body}</main>
<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand"><img src="${c.sh('assets/lockup-white.png')}" alt="Passage House Dental Care - modern dentistry for all" width="240"><p>${practice.address.join('<br>')}</p></div>
    <div class="foot-col"><h4>Visit</h4><p>${openBadge()}</p><p>Mon-Fri · see <a class="u" href="${c.u('contact')}">opening hours</a></p><a class="u" href="${practice.phoneHref}">${practice.phone}</a><a class="u" href="mailto:${practice.email}">${practice.email}</a></div>
    <div class="foot-col"><h4>Explore</h4>${nav.map(([l, p]) => `<a class="u" href="${c.u(p)}">${l}</a>`).join('')}<a class="u" href="${c.u('news')}">News</a></div>
  </div>
  <div class="wrap foot-base"><span>© ${new Date().getFullYear()} ${practice.name}</span><a class="u" href="${practice.liveSite}" target="_blank" rel="noopener">Privacy, complaints &amp; policies</a></div>
</footer>`,

  hero: (c, { eyebrow, title, lead, crumbs = [], actions, compact }) => `
<section class="phero${compact ? ' compact' : ''}">
  <div class="wrap">
    <p class="crumbs">${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a class="u" href="${c.u(p)}">${l}</a>` : `<span>${esc(l)}</span>`)).join(' / ')}</p>
    <h1 data-reveal>${esc(title)}</h1>
    <div class="phero-row" data-reveal>
      <p class="lead">${esc(lead)}</p>
      ${actions ? `<div class="phero-act"><a class="btn" href="${c.u('book')}" data-magnetic>Book now ${icon('arrow', 18)}</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}
    </div>
  </div>${swoosh('phero-art')}
</section>`,

  treatCard: (c, t, i) => `<a class="card" data-reveal style="--i:${i % 3}" href="${c.u('treatments/' + t.slug)}"><span class="card-ic">${icon(t.icon, 22)}</span><small>${esc(t.group)}</small><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="card-go">${icon('up', 20)}</span></a>`,
  careCard: (c, t, i) => `<a class="card" data-reveal style="--i:${i % 3}" href="${c.u('care/' + t.slug)}"><span class="card-ic">${icon(t.icon, 22)}</span><small>Care options</small><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="card-go">${icon('up', 20)}</span></a>`,

  cta: (c) => `
<section class="x-sec cta-sec"><div class="wrap"><div class="cta" data-reveal>${swoosh('cta-art')}
  <p class="eyebrow">Ready when you are</p>
  <h2>Let's look after<br><em>your smile.</em></h2>
  <div class="cta-act"><a class="btn" href="${c.u('book')}" data-magnetic>Request an appointment ${icon('arrow', 18)}</a><a class="btn ghost light" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
</div></div></section>`,

  home: (c) => {
    const feat = treatments.find((t) => t.slug === 'dental-implants');
    const ortho = treatments.find((t) => t.slug === 'orthodontics');
    const words = ['Dental implants', 'Orthodontics', 'Hygienist', 'SmileFast', 'Veneers', 'Whitening', 'Crowns', 'Bridges', 'Dentures', 'White fillings', 'Root canal'];
    const mq = words.map((w) => `<span>${w}</span><i>${icon('sparkle', 28)}</i>`).join('');
    return `
<section class="hero">
  <div class="wrap">
    <p class="eyebrow" data-reveal>${icon('pin', 16)} Henbury, Bristol · NHS &amp; private</p>
    <h1 class="hero-h"><span class="ln"><span>Modern</span></span> <span class="ln"><span><em>dentistry,</em></span></span><br><span class="ln"><span>made</span></span> <span class="ln"><span>for all.</span></span></h1>
    <div class="hero-sub" data-reveal>
      <p>A friendly, professional and caring dental team - from routine check-ups to implants and specialist orthodontics, all on Passage Road.</p>
      <div class="hero-act"><a class="btn" href="${c.u('book')}" data-magnetic>Request an appointment ${icon('arrow', 18)}</a><a class="btn ghost" href="${c.u('treatments')}">Explore treatments</a></div>
    </div>
  </div>
</section>

<section class="wrap bento" aria-label="Highlights">
  <a class="b b-a" href="${c.u('treatments/dental-implants')}" data-reveal>${swoosh('b-art')}<span class="pill">Featured</span><h2>Dental implants</h2><p>Permanent, natural-looking teeth. Led by Dr Brad Hall.</p><span class="b-go">${icon('up', 22)}</span></a>
  <a class="b b-b" href="${c.u('treatments/orthodontics')}" data-reveal style="--i:1"><span class="pill dark">Specialist</span><h3>Straighter teeth, any age</h3><p>Dr Ben Cross</p><span class="b-go">${icon('up', 20)}</span></a>
  <a class="b b-c" href="${c.u('care/dental-plan')}" data-reveal style="--i:2"><small>Dental Plan from</small><div class="big"><span data-count="2.30" data-prefix="£">£2.30</span><small>/week</small></div><p>10% off many treatments</p></a>
  <div class="b b-d" data-reveal style="--i:1"><div class="glass"><h3>${openBadge()}</h3><p class="big-s">Mon-Fri · 08:00-18:30</p><a class="u" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div></div>
  <a class="b b-e" href="${c.u('care/nervous-patients')}" data-reveal style="--i:2"><span class="b-ic">${icon('heart', 22)}</span><h3>Nervous? We get it.</h3><span class="b-go">${icon('up', 20)}</span></a>
  <a class="b b-f" href="${c.u('care/nhs')}" data-reveal style="--i:3"><span class="b-ic">${icon('shield', 22)}</span><h3>NHS &amp; private care</h3><span class="b-go">${icon('up', 20)}</span></a>
</section>

<div class="marquee" aria-hidden="true"><div class="mq"><div>${mq}</div><div>${mq}</div></div></div>

<section class="x-sec manifesto"><div class="wrap">
  <p class="eyebrow" data-reveal>About the practice</p>
  <p class="man" data-reveal>We have looked after Bristol smiles for decades. Today a team of dentists, a specialist orthodontist, a hygienist and a warm front-of-house crew make modern, gentle dentistry feel <em>refreshingly easy.</em></p>
  <div class="stats">
    <div data-reveal><b data-count="8">8</b><span>Dentists</span></div>
    <div data-reveal style="--i:1"><b data-count="12">12</b><span>Treatments</span></div>
    <div data-reveal style="--i:2"><b data-count="0" data-suffix="%">0%</b><span>Finance available</span></div>
    <div data-reveal style="--i:3"><b data-count="1" data-prefix="#">#1</b><span>Dementia-friendly practice in Bristol</span></div>
  </div>
</div></section>

<section class="pin"><div class="wrap pin-in">
  <div class="pin-l"><p class="eyebrow">Treatments</p><h2>Everything under<br>one <em>roof.</em></h2><a class="btn ghost" href="${c.u('treatments')}">All treatments ${icon('arrow', 18)}</a></div>
  <ol class="pin-r">${treatments.map((t, i) => `<li data-reveal><a href="${c.u('treatments/' + t.slug)}"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p></div>${icon('up', 22)}</a></li>`).join('')}</ol>
</div></section>

<section class="x-sec book-band"><div class="wrap">
  <div class="bb">
    <div><p class="eyebrow">Online booking</p><h2>Four quick steps to <em>your appointment.</em></h2></div>
    <ol class="bb-steps">${['Choose what you need', 'Tell us about you', 'Pick a time', 'We confirm'].map((s, i) => `<li data-reveal style="--i:${i}"><span>${i + 1}</span>${s}</li>`).join('')}</ol>
    <a class="btn" href="${c.u('book')}" data-magnetic>Start booking ${icon('arrow', 18)}</a>
  </div>
</div></section>

<section class="x-sec crew"><div class="wrap">
  <div class="crew-h"><h2 data-reveal>Meet the <em>team.</em></h2><a class="u" href="${c.u('team')}">See everyone ${icon('arrow', 16)}</a></div>
  <div class="avs">${[...team.dentists.slice(0, 4), ...team.specialists].map((p, i) => `<div class="av-i" data-reveal style="--i:${i % 3}"><span>${esc(p.name.replace('Dr ', '').split(' ').map((w) => w[0]).join(''))}</span><b>${esc(p.name)}</b><small>${esc(p.role)}</small></div>`).join('')}</div>
</div></section>
${D.cta(c)}`;
  },
};
export default D;
