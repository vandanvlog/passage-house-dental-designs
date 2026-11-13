// DESIGN 3 - "Hearth": warm cream, moss & terracotta, arches, rounded variable type, family-first.
import { esc, icon, practice, treatments, care, family, team, openBadge } from '../lib.mjs';
import { allTreatmentGroups } from '../content.mjs';

const left = [['Treatments', 'treatments'], ['Care & plans', 'care'], ['Fees', 'fees']];
const right = [['Meet the team', 'team'], ['Family', 'family'], ['Contact', 'contact']];
const all = [...left, ...right, ['News', 'news']];

const squiggle = `<svg class="squig" viewBox="0 0 300 20" fill="none" aria-hidden="true"><path d="M3 14C40 2 60 2 90 10s60 6 90-4 70-2 117 4" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`;
const badge = `<svg class="badge" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#circ" startOffset="0">NHS &amp; PRIVATE · FAMILY FRIENDLY · NERVOUS PATIENTS WELCOME · </textPath></text></svg>`;

const D = {
  id: 'd3', folder: 'design-3', name: 'Hearth', themeColor: '#F6EFE3',
  fonts: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap',
  bodyAttrs: '',
  loader: (c) => `<div class="loader" aria-hidden="true"><img src="${c.sh('assets/lockup-white.png')}" alt=""></div>`,

  shell: (c, body) => `
<header class="hdr"><div class="hdr-in">
  <nav class="hn l" aria-label="Main">${left.map(([l, p]) => `<a class="u" href="${c.u(p)}">${l}</a>`).join('')}</nav>
  <a class="hlogo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-moss.png')}" alt="Passage House Dental Care" width="150" height="50"></a>
  <nav class="hn r" aria-label="More">${right.map(([l, p]) => `<a class="u" href="${c.u(p)}">${l}</a>`).join('')}<a class="btn" href="${c.u('book')}" data-magnetic>Book online</a></nav>
  <button class="hburger" data-menu-toggle aria-expanded="false" aria-label="Menu">${icon('menu', 22)}</button>
</div></header>
<div class="drawer" data-menu><ul>${[['Home', ''], ...all, ['Book an appointment', 'book']].map(([l, p], i) => `<li style="--i:${i}"><a href="${c.u(p)}">${l}</a></li>`).join('')}</ul></div>
<nav class="mdock" aria-label="Quick actions"><a href="${practice.phoneHref}">${icon('phone', 20)}<span>Call</span></a><a class="main" href="${c.u('book')}">${icon('cal', 20)}<span>Book online</span></a><a href="${c.u('contact')}">${icon('pin', 20)}<span>Find us</span></a></nav>
<main id="main">${body}</main>
<footer class="foot">
  <div class="wrap">
    <div class="foot-top"><h2>See you <em>soon</em> in Henbury.</h2><a class="btn" href="${c.u('book')}" data-magnetic>Book an appointment ${icon('arrow', 18)}</a></div>
    <div class="foot-grid">
      <div><img src="${c.sh('assets/lockup-white.png')}" alt="Passage House Dental Care" width="200"><p>${practice.address.join('<br>')}</p></div>
      <div><h4>Opening</h4><p>${openBadge()}</p><p>Mon-Thu 08:00-18:30<br>Fri 08:00-16:00</p></div>
      <div><h4>Talk to us</h4><p><a class="u" href="${practice.phoneHref}">${practice.phone}</a><br><a class="u" href="mailto:${practice.email}">${practice.email}</a></p></div>
      <div><h4>Explore</h4><p class="fl">${all.slice(0, 5).map(([l, p]) => `<a class="u" href="${c.u(p)}">${l}</a>`).join('')}</p></div>
    </div>
    <p class="foot-base">© ${new Date().getFullYear()} ${practice.name} · <a class="u" href="${practice.liveSite}" target="_blank" rel="noopener">Privacy &amp; policies</a></p>
  </div>
</footer>`,

  hero: (c, { eyebrow, title, lead, crumbs = [], actions, compact }) => `
<section class="phero${compact ? ' compact' : ''}"><div class="wrap phero-g">
  <div>
    <p class="crumbs">${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a class="u" href="${c.u(p)}">${l}</a>` : `<b>${esc(l)}</b>`)).join(' › ')}</p>
    <span class="tagp">${esc(eyebrow)}</span>
    <h1 data-reveal>${esc(title)}</h1>
    <p class="lead" data-reveal>${esc(lead)}</p>
    ${actions ? `<div class="phero-act" data-reveal><a class="btn" href="${c.u('book')}" data-magnetic>Book now ${icon('arrow', 18)}</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}
  </div>
  <div class="phero-art" aria-hidden="true"><i></i><i></i><i></i></div>
</div></section>`,

  treatCard: (c, t, i) => `<a class="card c${i % 4}" data-reveal style="--i:${i % 3}" href="${c.u('treatments/' + t.slug)}"><span class="card-ic">${icon(t.icon, 26)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="go">Find out more ${icon('arrow', 16)}</span></a>`,
  careCard: (c, t, i) => `<a class="card c${i % 4}" data-reveal style="--i:${i % 3}" href="${c.u('care/' + t.slug)}"><span class="card-ic">${icon(t.icon, 26)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="go">Read more ${icon('arrow', 16)}</span></a>`,

  cta: (c) => `
<section class="x-sec ctas"><div class="wrap"><div class="cta-box" data-reveal>
  <div><h2>New to us? <em>Welcome.</em></h2><p>Request an appointment online in four easy steps, or call and chat to a friendly voice.</p></div>
  <div class="cta-act"><a class="btn" href="${c.u('book')}" data-magnetic>Request an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
</div></div></section>`,

  home: (c) => {
    const tags = ['All', ...allTreatmentGroups];
    return `
<section class="hero"><div class="wrap hero-g">
  <div class="hero-copy">
    <p class="chip-top" data-reveal>${openBadge()}</p>
    <h1 class="hero-h"><span class="w">Smiles</span> <span class="w">that</span> <span class="w">feel</span> <span class="w it">like</span> <span class="w it">home.</span></h1>
    <p class="lead" data-reveal>Passage House Dental Care is a friendly, professional and caring practice in Henbury, Bristol - for children, parents, grandparents and everyone in between.</p>
    <div class="hero-act" data-reveal><a class="btn" href="${c.u('book')}" data-magnetic>Book an appointment ${icon('arrow', 18)}</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
  </div>
  <div class="hero-art" aria-hidden="true">
    <div class="arch a1" data-parallax="0.04"><span>${icon('smile', 64)}</span></div>
    <div class="arch a2" data-parallax="-0.05"><span>${icon('tooth', 64)}</span></div>
    <div class="arch a3" data-parallax="0.03"><span>${icon('sparkle', 56)}</span></div>
    ${badge}
    <div class="sticker s1">NHS &amp; private care</div><div class="sticker s2">Nervous patients welcome</div>
  </div>
</div></section>

<section class="wrap quick" aria-label="Quick actions">
  <a href="${c.u('book')}" data-reveal>${icon('cal', 26)}<b>Book online</b><span>Request a time in four steps</span></a>
  <a href="${c.u('care/urgent-care')}" data-reveal style="--i:1">${icon('alert', 26)}<b>Urgent care</b><span>Same-day slots every day</span></a>
  <a href="${c.u('care/nervous-patients')}" data-reveal style="--i:2">${icon('heart', 26)}<b>Feeling nervous?</b><span>Gentle, patient care</span></a>
  <a href="${c.u('care/dental-plan')}" data-reveal style="--i:3">${icon('pound', 26)}<b>Dental Plan</b><span>From £2.30 per week</span></a>
</section>

<section class="x-sec help"><div class="wrap">
  <div class="help-h"><div><p class="eyebrow" data-reveal>Treatments</p><h2 data-reveal>What can we <em>help</em> with?</h2></div>
    <div class="filters" role="tablist" aria-label="Filter treatments" data-reveal>${tags.map((g, i) => `<button role="tab" class="f${i === 0 ? ' on' : ''}" data-f="${g}" aria-selected="${i === 0}">${g === 'All' ? 'All' : g}</button>`).join('')}</div></div>
  <div class="x-cards tgrid" data-grid>${treatments.map((t, i) => `<div data-g="${t.group}">${D.treatCard(c, t, i)}</div>`).join('')}</div>
</div></section>

<section class="fam"><div class="wrap">
  <div class="fam-h"><p class="eyebrow">For every age</p><h2>Little teeth, <em>big</em> teeth, all teeth.</h2></div>
  <div class="fam-g">${family.map((f, i) => `<article class="tile t${i}" data-reveal style="--i:${i}"><span class="age">${f.age}</span><h3>${esc(f.title)}</h3><p>${esc(f.p)}</p></article>`).join('')}</div>
  <a class="btn dark" href="${c.u('family')}">Family advice ${icon('arrow', 18)}</a>
</div></section>

<section class="x-sec plan"><div class="wrap"><div class="plan-box" data-reveal>
  <div><p class="eyebrow">Dental Plan</p><h2>Look after your smile <span class="hl">for less than a coffee a week.${squiggle}</span></h2><p>From £2.30 a week, the plan helps you budget for private check-ups and hygiene visits, with 10% off many treatments.</p><a class="btn" href="${c.u('care/dental-plan')}" data-magnetic>See the plan ${icon('arrow', 18)}</a></div>
  <div class="plan-num"><span data-count="2.30" data-prefix="£">£2.30</span><small>per week</small></div>
</div></div></section>

<section class="x-sec team"><div class="wrap">
  <div class="team-h"><h2 data-reveal>Friendly faces,<br><em>familiar names.</em></h2><a class="btn ghost" href="${c.u('team')}">Meet everyone ${icon('arrow', 18)}</a></div>
  <div class="arches">${[...team.dentists.slice(0, 3), ...team.specialists].map((p, i) => `<div class="ar ar${i % 4}" data-reveal style="--i:${i}"><div class="arc"><span>${esc(p.name.replace('Dr ', '').split(' ').map((w) => w[0]).join(''))}</span></div><b>${esc(p.name)}</b><small>${esc(p.role)}</small></div>`).join('')}</div>
</div></section>

<section class="x-sec nerv"><div class="wrap nerv-g">
  <div data-reveal><p class="eyebrow">Gentle care</p><h2>Dentist makes you <em>nervous?</em><br>You're not alone.</h2></div>
  <ul class="nerv-l">${['Every dentist here is happy to look after apprehensive patients', 'Tell reception - or email us first - and we will plan around you', 'Quieter appointment times for patients with autism', "Bristol's first Dementia Friendly dental practice"].map((s, i) => `<li data-reveal style="--i:${i}">${icon('heart', 20)}<span>${s}</span></li>`).join('')}</ul>
  <a class="btn" href="${c.u('care/nervous-patients')}" data-magnetic>How we help ${icon('arrow', 18)}</a>
</div></section>
${D.cta(c)}`;
  },
};
export default D;
