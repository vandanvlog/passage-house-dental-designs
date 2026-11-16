// v4 LUXURY designs. Real photography, Services mega-menu, animated navigation, calm refined motion.
//   Row 1 - Bloom  : centred header + pill menu, in three colourways: Sage (b1), Navy & Champagne (b2), Blush & Bronze (b3)
//   Row 2 - Harbour: logo with a hamburger beneath it that opens an animated full-width menu panel
//           Meadow : interactive "What brings you in today?" finder, services as tabbed cards
import { esc, icon, avatarInner, practice, treatments, care, team, openBadge } from '../lib.mjs';
import { allTreatmentGroups } from '../content.mjs';

const everyone = [...team.dentists, ...team.specialists];
const SH = '%%SH%%';
const img = (n, alt, extra = '') => `<img src="${SH}photos/${n}.jpg" alt="${esc(alt)}" loading="${extra.includes('eager') ? 'eager' : 'lazy'}" ${extra.replace('eager', '')}>`;
const byGroup = {}; treatments.forEach((t) => (byGroup[t.group] ||= []).push(t));

/* ---------- navigation (shared by all five designs) ---------- */
const burger = (label = '') => `<button class="burger" data-menu-toggle aria-expanded="false" aria-label="Menu"><span class="bl"><i></i><i></i><i></i></span>${label ? `<em>${label}</em>` : ''}</button>`;
const megaCols = [['Replace', ['Replace']], ['Straighten & Prevent', ['Straighten', 'Prevent']], ['Beautify', ['Beautify']], ['Restore', ['Restore']]];
const megaInner = (c) => `<div class="mg-cols">
  ${megaCols.map(([h, gs], ci) => `<div class="mg-col"><h4>${h}</h4><ul>${gs.flatMap((g) => byGroup[g] || []).map((t, i) => `<li style="--i:${ci * 2 + i}"><a href="${c.u('treatments/' + t.slug)}">${esc(t.name)}</a></li>`).join('')}</ul></div>`).join('')}
  <div class="mg-col mg-care"><h4>Care &amp; payment</h4><ul>${care.map((x, i) => `<li style="--i:${i}"><a href="${c.u('care/' + x.slug)}">${esc(x.name)}</a></li>`).join('')}</ul></div>
</div><div class="mg-foot"><a class="mg-all" href="${c.u('treatments')}">View every service ${icon('arrow', 16)}</a><span>Fees · <a href="${c.u('fees')}">Private fee guide</a></span></div>`;
const links = [['Dental Plan', 'care/dental-plan'], ['Fees', 'fees'], ['Our team', 'team'], ['Family', 'family'], ['Contact', 'contact']];
const navList = (c) => `<ul class="nv">
  <li class="has-mega" style="--n:0"><a class="nl${c.path === 'treatments' || c.path.startsWith('treatments/') ? ' on' : ''}" href="${c.u('treatments')}" data-mega-toggle aria-haspopup="true">Services ${icon('chev', 16)}</a><div class="mega"><div class="mega-in">${megaInner(c)}</div></div></li>
  ${links.map(([l, p], i) => `<li style="--n:${i + 1}"><a class="nl${c.path === p || c.path.startsWith(p + '/') ? ' on' : ''}" href="${c.u(p)}">${l}</a></li>`).join('')}
</ul>`;

/* ---------- shared sections ---------- */
const card = (c, t, kind = 'treatments') => `<a class="card" href="${c.u(kind + '/' + t.slug)}"><span class="bub">${icon(t.icon, 24)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`;
const innerHero = (c, { eyebrow, title, lead, crumbs = [], actions, compact }) => `
<section class="phero${compact ? ' compact' : ''}"><div class="wrap">
  <p class="crumbs">${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a href="${c.u(p)}">${l}</a>` : `<span>${esc(l)}</span>`)).join(' <i>/</i> ')}</p>
  <p class="ey">${esc(eyebrow)}</p><h1>${esc(title)}</h1><hr class="gl"><p class="lead">${esc(lead)}</p>
  ${actions ? `<div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}
</div></section>`;
const ctaBox = (c) => `<section class="cta-s"><div class="wrap"><div class="cta-box" style="--bgimg:url(${SH}photos/couple.jpg)"><div class="cta-in"><p class="ey">Your visit</p><h2>Ready when you are</h2><p>Request an appointment online in four easy steps, or call our friendly team.</p>
  <div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost-l" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div></div></div></div></section>`;
const hoursRows = () => ['Monday|08:30 - 17:30', 'Tuesday|08:30 - 18:30', 'Wednesday|08:30 - 17:00', 'Thursday|08:00 - 17:30', 'Friday|08:00 - 16:00', 'Saturday|Closed', 'Sunday|Closed'].map((r, i) => { const [d, h] = r.split('|'); return `<tr data-hours-row="${(i + 1) % 7}"><th>${d}</th><td>${h}</td></tr>`; }).join('');
const visit = (c) => `<div class="visit"><div class="vcard"><h3>Opening hours</h3><table class="x-hours"><tbody>${hoursRows()}</tbody></table></div>
  <div class="vcard"><h3>Find us</h3><p class="vl">${icon('pin', 20)}<span>${practice.address.join('<br>')}</span></p><p class="vl">${icon('phone', 20)}<a href="${practice.phoneHref}">${practice.phone}</a></p><p class="vl">${icon('mail', 20)}<a href="mailto:${practice.email}">${practice.email}</a></p><div class="btn-row"><a class="btn" href="${c.u('contact')}">Directions &amp; contact</a></div></div></div>`;
const footBlock = (c, logo) => `<div class="wrap foot-in"><div class="foot-brand"><img src="${c.sh('assets/lockup-' + logo + '.png')}" alt="Passage House Dental Care - modern dentistry for all" width="200"><p>${practice.address.join(', ')}</p></div>
  <div><h4>Contact</h4><p><a href="${practice.phoneHref}">${practice.phone}</a></p><p><a href="mailto:${practice.email}">${practice.email}</a></p><p>${openBadge()}</p></div>
  <div><h4>Explore</h4><p><a href="${c.u('treatments')}">Services</a></p>${links.map(([l, p]) => `<p><a href="${c.u(p)}">${l}</a></p>`).join('')}</div>
  <div><h4>Hours</h4><p>Mon 08:30 - 17:30<br>Tue 08:30 - 18:30<br>Wed 08:30 - 17:00<br>Thu 08:00 - 17:30<br>Fri 08:00 - 16:00</p></div></div>
  <div class="wrap foot-base"><span>© ${new Date().getFullYear()} ${practice.name}</span><a href="${practice.liveSite}" target="_blank" rel="noopener">Privacy, complaints &amp; policies</a></div>`;
const pcards = (list) => `<div class="pcards">${list.map((p, i) => `<article class="pc" data-reveal style="--i:${i % 4}"><div class="pc-img">${avatarInner(p.name)}</div><b>${esc(p.name)}</b><small>${esc(p.role)}</small></article>`).join('')}</div>`;
const servicesIndex = (c) => `<div class="svc">${[['Replace', ['Replace']], ['Straighten &amp; Prevent', ['Straighten', 'Prevent']], ['Beautify', ['Beautify']], ['Restore', ['Restore']]].map(([h, gs], i) => `<div class="svc-col" data-reveal style="--i:${i}"><h3>${h}</h3><ul>${gs.flatMap((g) => byGroup[g]).map((t) => `<li><a href="${c.u('treatments/' + t.slug)}"><span><b>${esc(t.name)}</b><small>${esc(t.short)}</small></span>${icon('arrow', 16)}</a></li>`).join('')}</ul></div>`).join('')}</div>`;
const careGrid = (c) => `<div class="cgrid">${[['nhs', 'NHS care', 'shield'], ['private', 'Private care', 'user'], ['dental-plan', 'Dental Plan', 'heart'], ['finance', '0% finance', 'pound']].map(([s, l, ic], i) => { const x = care.find((q) => q.slug === s); return `<a class="cg" href="${c.u('care/' + s)}" data-reveal style="--i:${i}"><span class="cg-ic">${icon(ic, 26)}</span><h3>${l}</h3><p>${esc(x.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`; }).join('')}</div>`;
const journey = () => `<ol class="jr">${[['Choose', 'Pick the appointment you need.', 'cal'], ['About you', 'Tell us about your care.', 'user'], ['Pick a time', 'Choose a day that suits you.', 'clock'], ['We confirm', 'We call or email to confirm.', 'check']].map(([h, p, ic], i) => `<li data-reveal style="--i:${i}"><span>${icon(ic, 26)}</span><b>${h}</b><small>${p}</small></li>`).join('')}</ol>`;
const reassureSplit = (c) => `<div class="split rv"><div class="photo" data-reveal>${img('reassure', 'Dentist talking reassuringly with a patient', 'width="1024" height="688"')}</div><div data-reveal><p class="ey">Gentle care</p><h2>Nervous about the dentist? You are not alone.</h2><p class="body">Every dentist here is happy to look after anxious patients. Tell us how you feel and we will go at your pace, with quieter appointment times available.</p><ul class="checks"><li>${icon('check', 20)}<span>Tell reception, or email us first</span></li><li>${icon('check', 20)}<span>Quieter appointments for patients with autism</span></li><li>${icon('check', 20)}<span>Bristol's first Dementia Friendly dental practice</span></li></ul><a class="btn" href="${c.u('care/nervous-patients')}">How we help</a></div></div>`;

/* =====================================================================
   BLOOM - three colourways of one layout
   ===================================================================== */
function bloom(id, folder, name, logo, themeColor) {
  const D = {
    id, folder, name, themeColor,
    fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600&display=swap',
    cssFiles: ['lux-base.css', 'lux-shared.css', 'bloom.css'], bodyAttrs: '',
    shell: (c, body) => `
<header class="bh"><div class="wrap bh-in">
  <a class="bh-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-' + logo + '.png')}" alt="Passage House Dental Care" width="190" height="71"></a>
  <nav class="bh-nav" aria-label="Main" data-menu>${navList(c)}<a class="btn" href="${c.u('book')}">Book online</a></nav>
  ${burger()}
</div></header>
<main id="main">${body}</main>
<footer class="foot"><div class="foot-body">${footBlock(c, 'white')}</div></footer>`,
    hero: (c, h) => innerHero(c, h),
    treatCard: (c, t) => card(c, t), careCard: (c, t) => card(c, t, 'care'), cta: ctaBox,
    home: (c) => {
      const rows = [
        ['Replace', 'Missing a tooth?', 'Implants, bridges and dentures that look and feel natural. Dr Brad Hall leads our implant care.', 'treatments/dental-implants', 'Explore implants', img('implants-still', 'Dental implant replica and teeth model on marble', 'width="1024" height="688"')],
        ['Straighten', 'Braces for every age', 'Metal, ceramic and Invisalign, planned by specialist orthodontist Dr Ben Cross.', 'treatments/orthodontics', 'Explore orthodontics', img('portrait-teen', 'Smiling teenager with discreet braces', 'width="896" height="1120"')],
        ['Prevent', 'Healthy gums, fresh smile', 'Check-ups and hygienist visits keep gums healthy and small problems small.', 'treatments/hygienist', 'Book a hygiene visit', img('hygienist', 'Dental hygienist preparing for an appointment', 'width="1024" height="688"')],
      ];
      return `
<section class="bl-hero"><div class="wrap">
  <p class="ey">Henbury, Bristol · NHS &amp; private</p>
  <h1>Modern dentistry, <em>beautifully cared for</em></h1>
  <p class="lead">A friendly, professional and caring practice for the whole family, in a calm setting you will feel at ease in.</p>
  <div class="btn-row c"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
  <div class="bl-photo"><div class="bl-frame">${img('hero-clinic', 'A bright, calm, modern dental treatment room with a sage green chair', 'width="1344" height="752" eager')}</div>
    <div class="bl-card c1"><span class="bub sm">${icon('clock', 18)}</span><div><b>${openBadge()}</b><small>Monday to Friday</small></div></div>
    <div class="bl-card c2"><span class="bub sm">${icon('heart', 18)}</span><div><b>Dental Plan</b><small>From ${practice.planFrom} a week</small></div></div></div>
</div></section>

<section class="bl-sec quote"><div class="wrap"><p class="q" data-reveal>“A friendly, professional and <em>caring</em> team, looking after Bristol smiles for decades.”</p>
  <div class="nums" data-reveal><div><b data-count="8">8</b><span>Dentists</span></div><div><b>1</b><span>Specialist orthodontist</span></div><div><b data-count="12">12</b><span>Services</span></div><div><b>NHS</b><span>&amp; private care</span></div></div></div></section>

<section class="bl-sec"><div class="wrap">
  <div class="sh c"><p class="ey">Signature care</p><h2>Considered care for every stage</h2></div>
  ${rows.map(([g, h, p, href, label, art], i) => `<div class="zig${i % 2 ? ' rev' : ''}"><div class="photo" data-reveal>${art}</div><div class="zig-txt" data-reveal><p class="ey">${g}</p><h3>${h}</h3><p>${p}</p><a class="btn" href="${c.u(href)}">${label}</a></div></div>`).join('')}
</div></section>

<section class="bl-sec tintbg"><div class="wrap">
  <div class="sh c"><p class="ey">Our services</p><h2>Everything under one roof</h2><p class="lead">Browse by need, or open the Services menu at the top of any page.</p></div>
  ${servicesIndex(c)}
  <div class="center"><a class="btn ghost" href="${c.u('treatments')}">View every service</a></div>
</div></section>

<section class="bl-sec"><div class="wrap split"><div class="photo" data-reveal>${img('family', 'Happy family laughing together on a sofa', 'width="1024" height="688"')}</div>
  <div data-reveal><p class="ey">For the whole family</p><h2>From first teeth to grown-up smiles</h2><p class="body">Advice for every age, and free NHS dental care for under-18s in England. Bring everyone: we are used to a busy waiting room and a gentle pace.</p><a class="btn" href="${c.u('family')}">Family advice</a></div></div></section>

<section class="bl-sec tintbg"><div class="wrap"><div class="sh c"><p class="ey">Care &amp; payment</p><h2>Choose what suits you</h2></div>${careGrid(c)}</div></section>

<section class="bl-sec"><div class="wrap">${reassureSplit(c)}</div></section>

<section class="bl-sec tintbg"><div class="wrap"><div class="sh c"><p class="ey">Booking</p><h2>Four steps to your appointment</h2></div>${journey()}<div class="center"><a class="btn" href="${c.u('book')}">Start booking</a></div></div></section>

<section class="bl-sec"><div class="wrap"><div class="sh c"><p class="ey">Our team</p><h2>The people who will look after you</h2></div>${pcards([...team.dentists.slice(0, 3), ...team.specialists])}<div class="center"><a class="btn ghost" href="${c.u('team')}">Meet everyone</a></div></div></section>

<section class="bl-sec tintbg"><div class="wrap"><div class="sh c"><p class="ey">Visit</p><h2>Come and see us</h2></div>${visit(c)}</div></section>
${ctaBox(c)}`;
    },
  };
  return D;
}

/* =====================================================================
   HARBOUR - logo, hamburger beneath, animated full-width menu panel
   ===================================================================== */
const ages = [['Children', 'child', 'Happy child giving a thumbs up in the dental chair'], ['Teens', 'portrait-teen', 'Smiling teenager with discreet braces'], ['Adults', 'portrait-woman', 'Woman with a confident natural smile'], ['Later life', 'couple', 'Smiling couple outdoors']];
const HARBOUR = {
  id: 'h1', folder: 'design-4', name: 'Harbour', themeColor: '#F4F1EA',
  fonts: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap',
  cssFiles: ['lux-base.css', 'lux-shared.css', 'harbour.css'], bodyAttrs: '',
  shell: (c, body) => `
<header class="hh"><div class="wrap hh-in">
  <a class="hh-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-navy.png')}" alt="Passage House Dental Care" width="210" height="78"></a>
  <div class="hh-act"><a class="hh-phone" href="${practice.phoneHref}" aria-label="Call ${practice.phone}">${icon('phone', 18)}<span>${practice.phone}</span></a><a class="btn hh-book" href="${c.u('book')}">Book online</a>${burger('Menu')}</div>
</div>
<div class="hmenu" data-menu><div class="wrap hmenu-in"><div class="hm-main">${megaInner(c)}</div>
  <aside class="hm-side"><p class="ey">Practice</p><ul>${links.map(([l, p], i) => `<li style="--i:${i}"><a href="${c.u(p)}">${l}</a></li>`).join('')}</ul>
  <div class="hm-card"><p>${openBadge()}</p><a class="hm-phone" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a><a class="btn" href="${c.u('book')}">Book online</a></div></aside></div></div>
</header>
<main id="main">${body}</main>
<footer class="foot"><div class="foot-body">${footBlock(c, 'white')}</div></footer>`,
  hero: (c, h) => innerHero(c, h),
  treatCard: (c, t) => card(c, t), careCard: (c, t) => card(c, t, 'care'), cta: ctaBox,
  home: (c) => `
<section class="hb-hero"><div class="wrap hb-grid">
  <div class="hb-txt"><p class="pill">${openBadge()}</p><h1>Gentle dentistry, <em>close to home</em></h1><p class="lead">NHS and private care for every age, from check-ups to implants and specialist braces, in a calm and welcoming practice.</p>
  <div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${c.u('treatments')}">Explore services</a></div></div>
  <div class="hb-ph"><div class="arch">${img('family', 'Happy family laughing together on a sofa', 'width="1024" height="688" eager')}</div><div class="hb-badge"><b data-count="8">8</b><span>Dentists &amp;<br>a specialist<br>orthodontist</span></div></div>
</div></section>

<section class="wrap tiles">${[['book', 'cal', 'Book online', 'Four easy steps'], ['care/urgent-care', 'alert', 'Urgent care', 'Same-day slots'], ['care/nervous-patients', 'heart', 'Feeling nervous?', 'Gentle, patient care'], ['care/dental-plan', 'pound', 'Dental Plan', `From ${practice.planFrom} a week`]].map(([p, ic, h, s], i) => `<a class="tile" data-reveal style="--i:${i}" href="${c.u(p)}"><span class="tile-ic">${icon(ic, 26)}</span><b>${h}</b><small>${s}</small></a>`).join('')}</section>

<section class="wrap hb-sec"><div class="sh"><div><p class="ey">Services</p><h2>Find the right care</h2></div><a class="lnk" href="${c.u('treatments')}">All services ${icon('arrow', 16)}</a></div>
  <div class="acc">${allTreatmentGroups.map((g, gi) => `<details${gi === 0 ? ' open' : ''}><summary><span class="acc-ic">${icon({ Replace: 'tooth', Straighten: 'smile', Beautify: 'sparkle', Restore: 'shield', Prevent: 'heart' }[g], 22)}</span><b>${g}</b><small>${byGroup[g].length} service${byGroup[g].length > 1 ? 's' : ''}</small><i>${icon('plus', 18)}</i></summary><ul>${byGroup[g].map((t) => `<li><a href="${c.u('treatments/' + t.slug)}"><span><b>${esc(t.name)}</b><small>${esc(t.short)}</small></span>${icon('arrow', 18)}</a></li>`).join('')}</ul></details>`).join('')}</div>
</section>

<section class="wrap hb-sec"><div class="sh"><div><p class="ey">Family</p><h2>Care that grows with you</h2></div><a class="lnk" href="${c.u('family')}">Family advice ${icon('arrow', 16)}</a></div>
  <div class="ages">${ages.map(([l, n, alt], i) => `<figure class="age" data-reveal style="--i:${i}"><span>${img(n, alt, 'width="400" height="400"')}</span><figcaption>${l}</figcaption></figure>`).join('')}</div></section>

<section class="wrap hb-sec">${reassureSplit(c)}</section>

<section class="wrap hb-sec"><div class="sh"><div><p class="ey">Team</p><h2>Meet the people behind the smiles</h2></div><a class="lnk" href="${c.u('team')}">Whole team ${icon('arrow', 16)}</a></div>${pcards([...team.dentists.slice(0, 3), ...team.specialists])}</section>

<section class="wrap hb-sec">${visit(c)}</section>
${ctaBox(c)}`,
};

/* =====================================================================
   MEADOW - interactive finder + tabbed services
   ===================================================================== */
const finder = [
  ['checkup', 'Check-up', 'check', 'Book a check-up', 'Regular visits catch small problems early. New and existing patients are welcome, NHS or private.', [['Request an appointment', 'book'], ['NHS dental care', 'care/nhs']], 'hygienist', 'Dental hygienist preparing for an appointment'],
  ['pain', 'Toothache', 'alert', 'In pain? Call us first thing', 'We keep same-day urgent slots every day. They fill quickly, so please phone as soon as we open.', [['Urgent care details', 'care/urgent-care']], 'reassure', 'Dentist talking reassuringly with a patient', true],
  ['smile', 'Brighter smile', 'sparkle', 'A brighter, more confident smile', 'From dentist-supervised whitening to composite veneers with SmileFast, we will talk you through what suits you.', [['Teeth whitening', 'treatments/teeth-whitening'], ['SmileFast veneers', 'treatments/smilefast']], 'portrait-woman', 'Woman with a confident natural smile'],
  ['straight', 'Straighter teeth', 'smile', 'Braces for children and adults', 'Specialist orthodontist Dr Ben Cross offers metal and ceramic braces and Invisalign.', [['Orthodontics', 'treatments/orthodontics']], 'portrait-teen', 'Smiling teenager with discreet braces'],
  ['missing', 'Missing tooth', 'tooth', 'Replace a missing tooth', 'Implants, bridges or dentures. We explain each option and the cost clearly before you decide.', [['Dental implants', 'treatments/dental-implants'], ['Bridges', 'treatments/bridges'], ['Dentures', 'treatments/dentures']], 'implants-still', 'Dental implant replica on marble'],
  ['nervous', "I'm nervous", 'heart', 'Gentle care at your pace', 'Every dentist here looks after anxious patients. Tell us how you feel and we will plan around you.', [['How we help', 'care/nervous-patients']], 'reception', 'Calm, welcoming practice reception'],
];
const MEADOW = {
  id: 'm1', folder: 'design-5', name: 'Meadow', themeColor: '#FBF7EE',
  fonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Nunito+Sans:wght@400;600;700&display=swap',
  cssFiles: ['lux-base.css', 'lux-shared.css', 'meadow.css'], jsFile: 'meadow.js', bodyAttrs: '',
  shell: (c, body) => `
<div class="mw-bar"><div class="wrap mw-bar-in"><span>${openBadge()}</span><span class="mw-hide">${practice.address.slice(0, 3).join(', ')}</span><a href="${practice.phoneHref}">${icon('phone', 16)} ${practice.phone}</a></div></div>
<header class="mw-head"><div class="wrap mw-in">
  <a class="mw-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-navy.png')}" alt="Passage House Dental Care" width="170" height="63"></a>
  <nav class="mw-nav" aria-label="Main" data-menu>${navList(c)}<a class="btn" href="${c.u('book')}">Book online</a></nav>
  ${burger()}
</div></header>
<main id="main">${body}</main>
<footer class="foot"><div class="foot-body">${footBlock(c, 'white')}</div></footer>`,
  hero: (c, h) => innerHero(c, h),
  treatCard: (c, t) => card(c, t), careCard: (c, t) => card(c, t, 'care'), cta: ctaBox,
  home: (c) => `
<section class="mw-hero"><div class="wrap mw-hero-in">
  <div class="mw-q"><p class="ey">Welcome to Passage House</p><h1>What brings you in <em>today?</em></h1>
    <div class="opts" role="tablist" aria-label="What brings you in today?">${finder.map(([id, l, ic], i) => `<button class="opt-b${i === 0 ? ' on' : ''}" role="tab" aria-selected="${i === 0}" data-opt="${id}"><span>${icon(ic, 24)}</span>${l}</button>`).join('')}</div></div>
  <div class="mw-res" aria-live="polite">${finder.map(([id, , , h, p, lk, ph, alt, call], i) => `<div class="res${i === 0 ? ' on' : ''}" data-res="${id}"><div class="res-ph">${img(ph, alt, 'width="1024" height="688"')}</div><div class="res-b"><h2>${h}</h2><p>${p}</p><div class="btn-row">${call ? `<a class="btn" href="${practice.phoneHref}">${icon('phone', 18)} Call ${practice.phone}</a>` : `<a class="btn" href="${c.u(lk[0][1])}">${lk[0][0]}</a>`}${lk.slice(call ? 0 : 1).map(([l, p2]) => `<a class="btn ghost" href="${c.u(p2)}">${l}</a>`).join('')}</div></div></div>`).join('')}</div>
</div></section>

<section class="mw-sec"><div class="wrap">
  <div class="sh c"><p class="ey">Our services</p><h2>Everything under one roof</h2></div>
  <div class="filters" role="tablist" aria-label="Filter services">${['All', ...allTreatmentGroups].map((g, i) => `<button class="f${i === 0 ? ' on' : ''}" data-f="${g}" role="tab" aria-selected="${i === 0}">${g}</button>`).join('')}</div>
  <div class="sgrid" data-grid>${treatments.map((t) => `<div data-g="${t.group}">${card(c, t)}</div>`).join('')}</div>
</div></section>

<section class="mw-sec soft"><div class="wrap split"><div class="photo" data-reveal>${img('reception', 'Calm, welcoming practice reception', 'width="1024" height="688"')}</div>
  <div data-reveal><p class="ey">Your first visit</p><h2>What to expect</h2><ol class="fv">${[['Request', 'Tell us what you need and when suits you.'], ['We confirm', 'Our team phones or emails to confirm.'], ['Meet us', 'A friendly welcome and a thorough check-up.'], ['Your plan', 'Clear options and costs before any treatment.']].map(([h, p], i) => `<li><span>${i + 1}</span><div><b>${h}</b><small>${p}</small></div></li>`).join('')}</ol><a class="btn" href="${c.u('book')}">Request an appointment</a></div></div></section>

<section class="mw-sec"><div class="wrap plan">
  <div class="plan-art" data-reveal><svg class="ringtxt" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="rc" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0"/></defs><text><textPath href="#rc" textLength="505" lengthAdjust="spacing">DENTAL PLAN · 10% OFF · CHECK-UPS · HYGIENE · </textPath></text></svg><div class="plan-n"><span data-count="2.30" data-prefix="£">£2.30</span><small>per week</small></div></div>
  <div data-reveal><p class="ey">Dental Plan</p><h2>Look after your smile for less than a coffee a week</h2><ul class="checks"><li>${icon('check', 20)}<span>Budget for private check-ups and hygiene visits</span></li><li>${icon('check', 20)}<span>10% off many routine treatments</span></li><li>${icon('check', 20)}<span>Accident and emergency scheme included</span></li></ul><a class="btn" href="${c.u('care/dental-plan')}">See the plan</a></div>
</div></section>

<section class="mw-sec soft"><div class="wrap"><div class="sh c"><p class="ey">Our team</p><h2>Say hello</h2></div>${pcards([...team.dentists.slice(0, 3), ...team.specialists])}<div class="center"><a class="btn ghost" href="${c.u('team')}">Meet the whole team</a></div></div></section>

<section class="mw-sec"><div class="wrap">${visit(c)}</div></section>
${ctaBox(c)}`,
};

export const designs = [
  bloom('b1', 'design-1', 'Bloom · Sage', 'moss', '#E6EDDF'),
  bloom('b2', 'design-2', 'Bloom · Navy & Champagne', 'white', '#0E1C30'),
  bloom('b3', 'design-3', 'Bloom · Blush & Bronze', 'ink', '#F6E2D9'),
  HARBOUR, MEADOW,
];
export default designs;
