// v3 LIVELY designs: gentle motion + illustration, three genuinely different layouts.
//   t1 Bloom   - centred "journey": one flowing page of illustrated scenes, wave dividers, floating shapes
//   t2 Harbour - split screen: fixed left sidebar + scrolling right column, accordion treatments, timeline
//   t3 Meadow  - interactive: "What brings you in today?" finder, pastel blob tiles, first-visit path
import { esc, icon, initials, practice, treatments, care, team, openBadge } from '../lib.mjs';
import { allTreatmentGroups } from '../content.mjs';
import { wave, tooth, sparkle, scene, faces, implant, braces, clean, path } from '../graphics.mjs';

const nav = [['Treatments', 'treatments'], ['Care & plans', 'care'], ['Fees', 'fees'], ['Our team', 'team'], ['Family', 'family'], ['Contact', 'contact']];
const everyone = [...team.dentists, ...team.specialists];

/* ---------- pieces shared by all three lively designs ---------- */
const card = (c, t, kind = 'treatments') => `<a class="card" href="${c.u(kind + '/' + t.slug)}"><span class="bub">${icon(t.icon, 24)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`;
const innerHero = (c, { eyebrow, title, lead, crumbs = [], actions, compact }, deco = '') => `
<section class="phero${compact ? ' compact' : ''}"><div class="wrap">
  <p class="crumbs">${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a href="${c.u(p)}">${l}</a>` : `<span>${esc(l)}</span>`)).join(' <i>/</i> ')}</p>
  <h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>
  ${actions ? `<div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}
</div>${deco}</section>`;
const ctaBox = (c) => `<section class="cta-s"><div class="wrap"><div class="cta-box"><span class="cta-t">${tooth('', true)}</span>
  <div><h2>Ready when you are</h2><p>Request an appointment online in four easy steps, or call our friendly team.</p></div>
  <div class="btn-row"><a class="btn light" href="${c.u('book')}">Book an appointment</a><a class="btn ghost-l" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div></div></div></section>`;
const hoursRows = () => ['Monday|08:30 - 17:30', 'Tuesday|08:30 - 18:30', 'Wednesday|08:30 - 17:00', 'Thursday|08:00 - 17:30', 'Friday|08:00 - 16:00', 'Saturday|Closed', 'Sunday|Closed'].map((r, i) => { const [d, h] = r.split('|'); return `<tr data-hours-row="${(i + 1) % 7}"><th>${d}</th><td>${h}</td></tr>`; }).join('');
const visit = (c) => `<div class="visit"><div class="vcard"><h3>Opening hours</h3><table class="x-hours"><tbody>${hoursRows()}</tbody></table></div>
  <div class="vcard"><h3>Find us</h3><p class="vl">${icon('pin', 20)}<span>${practice.address.join('<br>')}</span></p><p class="vl">${icon('phone', 20)}<a href="${practice.phoneHref}">${practice.phone}</a></p><p class="vl">${icon('mail', 20)}<a href="mailto:${practice.email}">${practice.email}</a></p><div class="btn-row"><a class="btn" href="${c.u('contact')}">Directions &amp; contact</a></div></div></div>`;
const footBlock = (c, logo) => `<div class="wrap foot-in"><div class="foot-brand"><img src="${c.sh('assets/lockup-' + logo + '.png')}" alt="Passage House Dental Care - modern dentistry for all" width="200"><p>${practice.address.join(', ')}</p></div>
  <div><h4>Contact</h4><p><a href="${practice.phoneHref}">${practice.phone}</a></p><p><a href="mailto:${practice.email}">${practice.email}</a></p><p>${openBadge()}</p></div>
  <div><h4>Quick links</h4>${nav.map(([l, p]) => `<p><a href="${c.u(p)}">${l}</a></p>`).join('')}</div>
  <div><h4>Hours</h4><p>Mon 08:30 - 17:30<br>Tue 08:30 - 18:30<br>Wed 08:30 - 17:00<br>Thu 08:00 - 17:30<br>Fri 08:00 - 16:00</p></div></div>
  <div class="wrap foot-base"><span>© ${new Date().getFullYear()} ${practice.name}</span><a href="${practice.liveSite}" target="_blank" rel="noopener">Privacy, complaints &amp; policies</a></div>`;
const avatars = (list) => list.map((p) => `<span class="avc"><i>${esc(initials(p.name))}</i><b>${esc(p.name)}</b><small>${esc(p.role)}</small></span>`).join('');

/* =====================================================================
   T1  BLOOM
   ===================================================================== */
const T1 = {
  id: 't1', folder: 'design-4', name: 'Bloom', themeColor: '#F1FAF7',
  fonts: 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap',
  cssFiles: ['lively-base.css', 't1.css'], bodyAttrs: '',
  shell: (c, body) => `
<header class="bl-head"><div class="wrap bl-in">
  <a class="bl-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-navy.png')}" alt="Passage House Dental Care" width="170" height="63"></a>
  <button class="bl-burger" data-menu-toggle aria-expanded="false" aria-label="Menu">${icon('menu', 24)}</button>
  <nav class="bl-nav" aria-label="Main" data-menu>${nav.map(([l, p]) => `<a href="${c.u(p)}">${l}</a>`).join('')}<a class="btn" href="${c.u('book')}">Book online</a></nav>
</div></header>
<main id="main">${body}</main>
<a class="bl-fab btn" href="${c.u('book')}">${icon('cal', 20)}<span>Book online</span></a>
<footer class="foot">${wave('var(--accent)', false, 60)}<div class="foot-body">${footBlock(c, 'white')}</div></footer>`,
  hero: (c, h) => innerHero(c, h, `<span class="fl f1"></span><span class="fl f2"></span><span class="fl f3"></span>${wave('var(--bg)', false, 50)}`),
  treatCard: (c, t) => card(c, t), careCard: (c, t) => card(c, t, 'care'), cta: ctaBox,
  home: (c) => {
    const rows = [
      ['Replace', 'Missing a tooth?', 'Implants, bridges and dentures that look and feel natural. Dr Brad Hall leads our implant care.', 'treatments/dental-implants', 'Explore implants', implant()],
      ['Straighten', 'Braces for every age', 'Metal, ceramic and Invisalign, planned by specialist orthodontist Dr Ben Cross.', 'treatments/orthodontics', 'Explore orthodontics', braces()],
      ['Prevent', 'Fresh, healthy and clean', 'Check-ups and hygienist visits keep gums healthy and small problems small.', 'treatments/hygienist', 'Book a clean', clean()],
    ];
    return `
<section class="bl-hero">
  <span class="fl f1"></span><span class="fl f2"></span><span class="fl f3"></span><span class="fl f4"></span>${sparkle('s1')}${sparkle('s2')}${sparkle('s3')}
  <div class="wrap bl-hero-in">
    <p class="pill">${openBadge()}</p>
    <h1>Smiles that make you feel <em>at ease</em></h1>
    <p class="lead">Friendly NHS and private dentistry for the whole family, in the heart of Henbury, Bristol.</p>
    <div class="btn-row c"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
    <div class="bl-scene">${scene()}</div>
  </div>${wave('var(--bg2)', false, 90)}
</section>

<section class="bl-sec tintbg"><div class="wrap">
  <div class="sh c"><p class="ey">What we do</p><h2>Care for every stage of your smile</h2></div>
  ${rows.map(([g, h, p, href, label, art], i) => `<div class="zig${i % 2 ? ' rev' : ''}" data-reveal><div class="zig-art">${art}</div><div class="zig-txt"><p class="ey">${g}</p><h3>${h}</h3><p>${p}</p><a class="btn" href="${c.u(href)}">${label}</a></div></div>`).join('')}
</div></section>
${wave('var(--bg2)', true, 70)}

<section class="bl-sec"><div class="wrap">
  <div class="sh c"><p class="ey">Every treatment</p><h2>Tap what you are looking for</h2></div>
  <div class="chips" data-reveal>${treatments.map((t, i) => `<a class="chip3" style="--i:${i}" href="${c.u('treatments/' + t.slug)}">${icon(t.icon, 18)}${esc(t.name)}</a>`).join('')}</div>
</div></section>

<section class="bl-sec soft"><div class="wrap fam">
  <div class="fam-art" data-reveal>${faces()}</div>
  <div class="fam-txt" data-reveal><p class="ey">For the whole family</p><h2>From first teeth to grown-up smiles</h2><p>Advice for every age, and free NHS dental care for under-18s in England. Bring everyone, we are used to a busy waiting room.</p><a class="btn" href="${c.u('family')}">Family advice</a></div>
</div></section>

<section class="bl-sec"><div class="wrap">
  <div class="sh c"><p class="ey">Care &amp; payment</p><h2>Choose what suits you</h2></div>
  <div class="badges">${[['nhs', 'NHS care', 'shield'], ['private', 'Private care', 'user'], ['dental-plan', 'Dental Plan', 'heart'], ['finance', '0% finance', 'pound']].map(([s, l, ic], i) => `<a class="badge" style="--d:${i * 0.7}s" href="${c.u('care/' + s)}"><span>${icon(ic, 34)}</span><b>${l}</b></a>`).join('')}</div>
  <p class="center small">Dental Plan from <b>£2.30 a week</b> with 10% off many treatments.</p>
</div></section>

<section class="bl-sec soft"><div class="wrap">
  <div class="sh c"><p class="ey">Booking</p><h2>Four steps to your appointment</h2></div>
  <div class="journey" data-reveal>${path()}<ol>${[['Choose', 'cal'], ['About you', 'user'], ['Pick a time', 'clock'], ['We confirm', 'check']].map(([l, ic], i) => `<li style="--i:${i}"><span>${icon(ic, 26)}</span><b>${l}</b></li>`).join('')}</ol></div>
  <div class="center"><a class="btn" href="${c.u('book')}">Start booking</a></div>
</div></section>

<section class="bl-sec team-s"><div class="wrap"><div class="sh c"><p class="ey">Our team</p><h2>Friendly faces</h2></div></div>
  <div class="marq"><div class="marq-in">${avatars(everyone)}${avatars(everyone)}</div></div>
  <div class="center"><a class="btn ghost" href="${c.u('team')}">Meet everyone</a></div>
</section>

<section class="bl-sec"><div class="wrap"><div class="sh c"><p class="ey">Visit</p><h2>Come and see us</h2></div>${visit(c)}</div></section>
${ctaBox(c)}`;
  },
};

/* =====================================================================
   T2  HARBOUR  (split screen)
   ===================================================================== */
const sideNav = [['Home', '', 'smile'], ['Treatments', 'treatments', 'tooth'], ['Care & plans', 'care', 'heart'], ['Fees', 'fees', 'pound'], ['Our team', 'team', 'user'], ['Family', 'family', 'smile'], ['News', 'news', 'star'], ['Contact', 'contact', 'pin']];
const T2 = {
  id: 't2', folder: 'design-5', name: 'Harbour', themeColor: '#16283F',
  fonts: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700;800&display=swap',
  cssFiles: ['lively-base.css', 't2.css'], bodyAttrs: '',
  shell: (c, body) => `
<div class="hb">
  <aside class="hb-side">
    <div class="hb-top"><a class="hb-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-white.png')}" alt="Passage House Dental Care" width="190" height="71"></a>
    <button class="hb-burger" data-menu-toggle aria-expanded="false" aria-label="Menu">${icon('menu', 24)}</button></div>
    <nav class="hb-nav" aria-label="Main" data-menu>${sideNav.map(([l, p, ic]) => { const on = c.path === p || (p && c.path.startsWith(p + '/')); return `<a href="${c.u(p)}"${on ? ' class="on" aria-current="page"' : ''}>${icon(ic, 20)}<span>${l}</span></a>`; }).join('')}</nav>
    <div class="hb-card"><div class="hb-mini">${tooth('', true)}</div><p class="hb-open">${openBadge()}</p><a class="hb-phone" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a><a class="btn" href="${c.u('book')}">Book online</a></div>
    <svg class="hb-wave" viewBox="0 0 300 120" aria-hidden="true"><path d="M0 60c40-30 80 30 150 0s110-30 150 0v60H0z" fill="rgba(255,255,255,.05)"/><path d="M0 85c50-26 90 26 150 0s100-26 150 0v35H0z" fill="rgba(255,255,255,.06)"/></svg>
  </aside>
  <div class="hb-main"><main id="main">${body}</main>
  <footer class="foot">${footBlock(c, 'white')}</footer></div>
</div>`,
  hero: (c, h) => innerHero(c, h, `<span class="orb o1"></span><span class="orb o2"></span>`),
  treatCard: (c, t) => card(c, t), careCard: (c, t) => card(c, t, 'care'), cta: ctaBox,
  home: (c) => {
    const groups = {}; treatments.forEach((t) => (groups[t.group] ||= []).push(t));
    const gIcon = { Replace: 'tooth', Straighten: 'smile', Beautify: 'sparkle', Restore: 'shield', Prevent: 'heart' };
    const ages = [['0-3', 'Babies', 46], ['3-6', 'Little ones', 62], ['7-11', 'Growing smiles', 78], ['11+', 'Teens & adults', 96]];
    return `
<section class="hb-hero wrap"><div class="hb-hero-card">
  <div class="hb-hero-txt"><p class="pill">${openBadge()}</p><h1>Gentle dentistry, <em>close to home</em></h1><p class="lead">NHS and private care for every age, from check-ups to implants and specialist braces.</p>
  <div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${c.u('treatments')}">See treatments</a></div></div>
  <div class="hb-hero-art"><div class="ring r1"></div><div class="ring r2"></div>${tooth('big')}${sparkle('s1')}${sparkle('s2')}${sparkle('s3')}</div>
  ${wave('var(--soft)', false, 50)}
</div></section>

<section class="wrap tiles">${[['book', 'cal', 'Book online', 'Four easy steps'], ['care/urgent-care', 'alert', 'Urgent care', 'Same-day slots'], ['care/nervous-patients', 'heart', 'Feeling nervous?', 'Gentle, patient care'], ['care/dental-plan', 'pound', 'Dental Plan', `From ${practice.planFrom} a week`]].map(([p, ic, h, s], i) => `<a class="tile" data-reveal style="--i:${i}" href="${c.u(p)}"><span class="tile-ic">${icon(ic, 28)}</span><b>${h}</b><small>${s}</small></a>`).join('')}</section>

<section class="wrap stats" data-reveal>
  <div><b data-count="8">8</b><span>Dentists</span></div><div><b data-count="12">12</b><span>Treatments</span></div><div><b data-count="2.30" data-prefix="£">£2.30</b><span>Plan per week</span></div><div><b>Mon-Fri</b><span>Tue until 18:30</span></div>
</section>

<section class="wrap hb-sec"><div class="sh"><div><p class="ey">Treatments</p><h2>Find the right care</h2></div><a class="lnk" href="${c.u('treatments')}">All treatments ${icon('arrow', 16)}</a></div>
  <div class="acc">${allTreatmentGroups.filter((g) => groups[g]).map((g, gi) => `<details${gi === 0 ? ' open' : ''}><summary><span class="acc-ic">${icon(gIcon[g], 22)}</span><b>${g}</b><small>${groups[g].length} treatment${groups[g].length > 1 ? 's' : ''}</small><i>${icon('plus', 18)}</i></summary><ul>${groups[g].map((t) => `<li><a href="${c.u('treatments/' + t.slug)}"><span><b>${esc(t.name)}</b><small>${esc(t.short)}</small></span>${icon('arrow', 18)}</a></li>`).join('')}</ul></details>`).join('')}</div>
</section>

<section class="wrap hb-sec"><div class="sh"><div><p class="ey">Family</p><h2>Care that grows with you</h2></div><a class="lnk" href="${c.u('family')}">Family advice ${icon('arrow', 16)}</a></div>
  <div class="tl" data-reveal><span class="tl-line"></span>${ages.map(([a, l, s], i) => `<div class="tl-n" style="--i:${i}"><span class="tl-face" style="--s:${s}px"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="var(--soft2)"/><circle cx="14" cy="18" r="2" fill="var(--accent)"/><circle cx="26" cy="18" r="2" fill="var(--accent)"/><path d="M13 25q7 6 14 0" stroke="var(--accent)" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg></span><b>${a}</b><small>${l}</small></div>`).join('')}</div>
</section>

<section class="wrap hb-sec"><div class="sh"><div><p class="ey">Team</p><h2>Meet the people behind the smiles</h2></div><a class="lnk" href="${c.u('team')}">Whole team ${icon('arrow', 16)}</a></div>
  <div class="ppl">${everyone.slice(0, 8).map((p) => `<span class="avc"><i>${esc(initials(p.name))}</i><b>${esc(p.name)}</b><small>${esc(p.role)}</small></span>`).join('')}</div></section>

<section class="wrap hb-sec">${visit(c)}</section>
${ctaBox(c)}`;
  },
};

/* =====================================================================
   T3  MEADOW  (interactive finder)
   ===================================================================== */
const finder = [
  ['checkup', 'Check-up', 'check', 'Book a check-up', 'Regular visits catch small problems early. New and existing patients are welcome, NHS or private.', [['Request an appointment', 'book'], ['NHS dental care', 'care/nhs']]],
  ['pain', 'Toothache', 'alert', 'In pain? Call us first thing', 'We keep same-day urgent slots every day. They fill quickly, so please phone as soon as we open.', [['Urgent care details', 'care/urgent-care']], true],
  ['smile', 'Brighter smile', 'sparkle', 'A brighter, more confident smile', 'From dentist-supervised whitening to composite veneers with SmileFast, we will talk you through what suits you.', [['Teeth whitening', 'treatments/teeth-whitening'], ['SmileFast veneers', 'treatments/smilefast']]],
  ['straight', 'Straighter teeth', 'smile', 'Braces for children and adults', 'Specialist orthodontist Dr Ben Cross offers metal and ceramic braces and Invisalign.', [['Orthodontics', 'treatments/orthodontics']]],
  ['missing', 'Missing tooth', 'tooth', 'Replace a missing tooth', 'Implants, bridges or dentures. We explain each option and the cost clearly before you decide.', [['Dental implants', 'treatments/dental-implants'], ['Bridges', 'treatments/bridges'], ['Dentures', 'treatments/dentures']]],
  ['nervous', "I'm nervous", 'heart', 'Gentle care at your pace', 'Every dentist here looks after anxious patients. Tell us how you feel and we will plan around you.', [['How we help', 'care/nervous-patients']]],
];
const T3 = {
  id: 't3', folder: 'design-6', name: 'Meadow', themeColor: '#FFF8E5',
  fonts: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=DM+Sans:wght@400;500;700&display=swap',
  cssFiles: ['lively-base.css', 't3.css'], jsFile: 't3.js', bodyAttrs: '',
  shell: (c, body) => `
<div class="mw-bar"><div class="wrap mw-bar-in"><span>${openBadge()}</span><span class="mw-hide">${practice.address.slice(0, 3).join(', ')}</span><a href="${practice.phoneHref}">${icon('phone', 16)} ${practice.phone}</a></div></div>
<header class="mw-head"><div class="wrap mw-in">
  <a class="mw-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-navy.png')}" alt="Passage House Dental Care" width="160" height="59"></a>
  <button class="mw-burger" data-menu-toggle aria-expanded="false" aria-label="Menu">${icon('menu', 24)}</button>
  <nav class="mw-nav" aria-label="Main" data-menu>${nav.map(([l, p]) => { const on = c.path === p || c.path.startsWith(p + '/'); return `<a href="${c.u(p)}"${on ? ' class="on"' : ''}>${l}</a>`; }).join('')}<a class="btn" href="${c.u('book')}">Book online</a></nav>
</div></header>
<main id="main">${body}</main>
<footer class="foot">${wave('var(--accent)', false, 60)}<div class="foot-body">${footBlock(c, 'white')}</div></footer>`,
  hero: (c, h) => innerHero(c, h, `<span class="blob b1"></span><span class="blob b2"></span>`),
  treatCard: (c, t) => card(c, t), careCard: (c, t) => card(c, t, 'care'), cta: ctaBox,
  home: (c) => {
    const tint = ['#FFE3E0', '#DDF3EA', '#FFF0C2', '#E4E8FB', '#FFE9D6', '#D9F0F5'];
    const radii = ['58% 42% 55% 45% / 48% 55% 45% 52%', '42% 58% 40% 60% / 55% 45% 55% 45%', '50% 50% 60% 40% / 40% 60% 40% 60%', '60% 40% 45% 55% / 50% 40% 60% 50%'];
    const words = ['Gentle', 'Friendly', 'NHS & private', 'Family care', 'Nervous patients welcome', 'Implants', 'Braces', 'Dental Plan', 'Same-day urgent slots'];
    const tk = words.map((w) => `<span>${w}</span><i>${sparkle()}</i>`).join('');
    return `
<section class="mw-hero"><span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>
  <div class="wrap mw-hero-in">
    <div class="mw-q">
      <p class="ey">Welcome to Passage House</p><h1>What brings you in <em>today?</em></h1>
      <div class="opts" role="tablist" aria-label="What brings you in today?">${finder.map(([id, l, ic], i) => `<button class="opt-b${i === 0 ? ' on' : ''}" role="tab" aria-selected="${i === 0}" data-opt="${id}"><span>${icon(ic, 26)}</span>${l}</button>`).join('')}</div>
    </div>
    <div class="mw-res" aria-live="polite">${finder.map(([id, , , h, p, links, call], i) => `<div class="res${i === 0 ? ' on' : ''}" data-res="${id}"><div class="res-art">${tooth('', true)}</div><h2>${h}</h2><p>${p}</p><div class="btn-row">${call ? `<a class="btn" href="${practice.phoneHref}">${icon('phone', 18)} Call ${practice.phone}</a>` : `<a class="btn" href="${c.u(links[0][1])}">${links[0][0]}</a>`}${links.slice(call ? 0 : 1).map(([l, p2]) => `<a class="btn ghost" href="${c.u(p2)}">${l}</a>`).join('')}</div></div>`).join('')}</div>
  </div>
</section>

<div class="tick" aria-hidden="true"><div><span class="tk">${tk}</span><span class="tk">${tk}</span></div></div>

<section class="mw-sec"><div class="wrap">
  <div class="sh c"><p class="ey">Treatments</p><h2>Everything under one roof</h2></div>
  <div class="mosaic">${treatments.map((t, i) => `<a class="mt" data-reveal style="--i:${i % 4};--bgc:${tint[i % tint.length]};--rad:${radii[i % radii.length]}" href="${c.u('treatments/' + t.slug)}"><span>${icon(t.icon, 30)}</span><b>${esc(t.name)}</b></a>`).join('')}</div>
</div></section>

<section class="mw-sec soft"><div class="wrap">
  <div class="sh c"><p class="ey">Your first visit</p><h2>What to expect</h2></div>
  <ol class="fv">${[['Request', 'Tell us what you need and when suits you.', 'cal'], ['We confirm', 'Our team phones or emails to confirm.', 'mail'], ['Meet us', 'A friendly welcome and a thorough check-up.', 'smile'], ['Your plan', 'Clear options and costs before any treatment.', 'check']].map(([h, p, ic], i) => `<li data-reveal style="--i:${i}"><span class="fv-ic">${icon(ic, 30)}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
  <div class="center"><a class="btn" href="${c.u('book')}">Request an appointment</a></div>
</div></section>

<section class="mw-sec"><div class="wrap plan">
  <div class="plan-art" data-reveal><svg class="ringtxt" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="rc" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0"/></defs><text><textPath href="#rc" textLength="505" lengthAdjust="spacing">DENTAL PLAN · 10% OFF · CHECK-UPS · HYGIENE · </textPath></text></svg><div class="plan-n"><span data-count="2.30" data-prefix="£">£2.30</span><small>per week</small></div></div>
  <div data-reveal><p class="ey">Dental Plan</p><h2>Look after your smile for less than a coffee a week</h2><ul class="checks"><li>${icon('check', 20)}<span>Budget for private check-ups and hygiene visits</span></li><li>${icon('check', 20)}<span>10% off many routine treatments</span></li><li>${icon('check', 20)}<span>Accident and emergency scheme included</span></li></ul><a class="btn" href="${c.u('care/dental-plan')}">See the plan</a></div>
</div></section>

<section class="mw-sec soft"><div class="wrap">
  <div class="sh c"><p class="ey">Our team</p><h2>Say hello</h2></div>
  <div class="ppl">${everyone.slice(0, 5).map((p, i) => `<span class="avc" data-reveal style="--i:${i}"><i>${esc(initials(p.name))}</i><b>${esc(p.name)}</b><small>${esc(p.role)}</small></span>`).join('')}</div>
  <div class="center"><a class="btn ghost" href="${c.u('team')}">Meet the whole team</a></div>
</div></section>

<section class="mw-sec"><div class="wrap">${visit(c)}</div></section>
${ctaBox(c)}`;
  },
};

export const designs = [T1, T2, T3];
export default designs;
