// v5 CLASSIC: the structure of the current passagehousedental.co.uk, modernised, in three colourways.
//   hero slider (4 slides) with logo over it + coloured menu bar top-right, info band (phone / hours / address),
//   four big quick-link tiles, policy footer. The band + tiles repeat under every page, as on the live site.
import { esc, icon, practice, treatments, care, openBadge } from '../lib.mjs';

const SH = '%%SH%%';
const img = (n, alt, extra = '') => `<img src="${SH}photos/${n}.jpg" alt="${esc(alt)}" loading="lazy" ${extra}>`;

/* ---- white line icons for the quick-link tiles ---- */
const T = {
  implant: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M30 14c-12 0-18 12-15 22 2 8 9 10 12 16h66c3-6 10-8 12-16 3-10-3-22-15-22-8 0-11 4-30 4S38 14 30 14z" fill="currentColor"/><path d="M42 62h36l-2 10H44zM44 76h32l-2 10H46zM46 90h28l-2 10H48zM50 104h20l-3 10H53z" fill="currentColor"/></svg>`,
  braces: `<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round"><rect x="6" y="34" width="30" height="52" rx="14"/><rect x="38" y="26" width="30" height="62" rx="14"/><rect x="70" y="26" width="30" height="62" rx="14"/><rect x="100" y="34" width="16" height="52" rx="8"/></g><path d="M8 60h108" stroke="currentColor" stroke-width="7"/><g fill="currentColor"><rect x="14" y="50" width="14" height="20" rx="4"/><rect x="46" y="50" width="14" height="20" rx="4"/><rect x="78" y="50" width="14" height="20" rx="4"/></g></svg>`,
  people: `<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="currentColor"><circle cx="60" cy="38" r="17"/><path d="M26 96c0-20 14-32 34-32s34 12 34 32z"/><circle cx="24" cy="48" r="12"/><path d="M0 98c0-14 9-24 24-24 6 0 10 1 14 4-8 6-12 12-13 20z"/><circle cx="96" cy="48" r="12"/><path d="M120 98c0-14-9-24-24-24-6 0-10 1-14 4 8 6 12 12 13 20z"/></g></svg>`,
  plan: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 40C46 30 22 34 20 56c-2 16 8 26 10 40 2 12 8 20 14 18 7-2 8-22 16-22s9 20 16 22c6 2 12-6 14-18 2-14 12-24 10-40-2-22-26-26-40-16z" fill="currentColor"/><g fill="currentColor"><path d="M26 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path d="M60 4l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path d="M94 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></g></svg>`,
};

/* ---- menu (same sections as the live site) ---- */
const li = (c, p, l) => `<li><a href="${c.u(p)}">${l}</a></li>`;
const menu = (c) => {
  const on = (p) => (c.path === p || c.path.startsWith(p + '/') ? ' on' : '');
  const dd = (label, p, items) => `<li class="has-dd${on(p)}"><a href="${c.u(p)}" data-mega-toggle aria-haspopup="true">${label} ${icon('chev', 14)}</a><ul class="dd">${items.map(([pp, l], i) => `<li style="--i:${i}"><a href="${c.u(pp)}">${l}</a></li>`).join('')}</ul></li>`;
  return `<ul class="cmu">
    <li class="home${c.path === '' ? ' on' : ''}"><a href="${c.u()}" aria-label="Home">${icon('smile', 18)}</a></li>
    ${dd('About us', 'team', [['team', 'Meet the team'], ['contact', 'Opening hours'], ['care/oral-health', 'Patient information']])}
    <li class="${on('news')}"><a href="${c.u('news')}">Latest news</a></li>
    ${dd('Services', 'care', care.map((x) => ['care/' + x.slug, x.name]))}
    ${dd('Treatments', 'treatments', treatments.map((t) => ['treatments/' + t.slug, t.name]))}
    ${dd('Fees', 'fees', [['fees', 'Private treatment fee guide'], ['care/finance', '0% finance plan'], ['care/dental-plan', 'Dental Plan']])}
    ${dd('Lifestyle', 'family', [['family', 'Babies & toddlers'], ['family', 'Children'], ['family', 'Teens & adults']])}
    ${dd('Contact us', 'contact', [['contact', 'Contact & directions'], ['book', 'Book online']])}
  </ul>`;
};

const infoBand = (c) => `<section class="ci"><div class="wrap ci-g">
  <a class="ci-c" href="${practice.phoneHref}">${icon('phone', 40)}<b class="ci-n">${practice.phone}</b></a>
  <div class="ci-c">${icon('clock', 40)}<div><b>Opening hours</b><p>Mon 08.30-17.30 / Tue 08.30-18.30 / Wed 08.30-17.00<br>Thu 08.00-17.30 / Fri 08.00-16.00</p><p class="ci-open">${openBadge()}</p></div></div>
  <div class="ci-c">${icon('pin', 40)}<div><b>Find us</b><p>${practice.address.join(', ')}</p><a class="u" href="${practice.map}" target="_blank" rel="noopener">View map ›</a></div></div>
</div></section>`;
const tiles = (c) => `<section class="cq"><div class="wrap cq-g">${[['treatments/dental-implants', 'implant', 'Dental implants'], ['treatments/orthodontics', 'braces', 'Orthodontic'], ['treatments/cosmetic-dentistry', 'people', 'Cosmetic Dentistry'], ['care/dental-plan', 'plan', 'Practice Plan']].map(([p, ic, l]) => `<a class="cq-t" href="${c.u(p)}"><span class="cq-i">${T[ic]}</span><b>${l}</b></a>`).join('')}</div></section>`;

const slides = [
  { bg: 'hero-clinic', alt: 'A bright, calm, modern dental treatment room', h1: 'Welcome to Passage House Dental Care, Bristol', h2: 'Working with you to provide amazing dental care from check-ups to dental implants', p: 'A friendly, professional and caring dental team.', to: 'team' },
  { bg: 'portrait-teen', alt: 'Smiling teenager with discreet braces', h1: 'Orthodontics', h2: 'Specialist braces for children and adults', p: 'Metal, ceramic and Invisalign with specialist orthodontist Dr Ben Cross.', to: 'treatments/orthodontics', portrait: true },
  { bg: 'hygienist', alt: 'Dental hygienist preparing for an appointment', h1: 'Hygiene and gum care', h2: 'Healthy gums and a fresh, clean smile', p: 'Professional cleaning with our hygienist. No referral needed.', to: 'treatments/hygienist', portrait: true },
  { bg: 'implants-still', alt: 'Dental implant replica and teeth model on marble', h1: 'Dental implants', h2: 'Permanent, natural-looking replacement teeth', p: 'Led by Dr Brad Hall, who has a special interest in implants.', to: 'treatments/dental-implants' },
];

function classic(id, folder, name, themeColor) {
  const D = {
    id, folder, name, themeColor,
    fonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Nunito+Sans:wght@400;600;700&display=swap',
    cssFiles: ['lux-base.css', 'lux-shared.css', 'classic.css'], jsFile: 'classic.js', bodyAttrs: '',
    shell: (c, body) => `
<header class="ch${c.path === '' ? ' ch-over' : ''}"><div class="ch-in">
  <a class="ch-logo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-white.png')}" alt="Passage House Dental Care" width="220" height="82"></a>
  <nav class="cm" aria-label="Main" data-menu>${menu(c)}<a class="cm-book" href="${c.u('book')}">Book online</a></nav>
  <button class="burger" data-menu-toggle aria-expanded="false" aria-label="Menu"><span class="bl"><i></i><i></i><i></i></span></button>
</div></header>
<main id="main">${body}</main>
${infoBand(c)}${tiles(c)}
<footer class="cf"><div class="wrap cf-in"><span>© ${new Date().getFullYear()} ${practice.name}</span><span class="cf-l"><a href="${practice.liveSite}" target="_blank" rel="noopener">General privacy policy</a><a href="${practice.liveSite}" target="_blank" rel="noopener">Children's privacy policy</a><a href="${practice.liveSite}" target="_blank" rel="noopener">Website privacy policy</a><a href="${practice.liveSite}" target="_blank" rel="noopener">Complaints procedure</a><a href="${practice.liveSite}" target="_blank" rel="noopener">Appointment management policy</a></span></div></footer>`,

    hero: (c, { eyebrow, title, lead, crumbs = [], actions }) => `
<section class="phero"><div class="wrap">
  <p class="crumbs">${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a href="${c.u(p)}">${l}</a>` : `<span>${esc(l)}</span>`)).join(' <i>/</i> ')}</p>
  <h1>${esc(title)}</h1><p class="lead">${esc(lead)}</p>
  ${actions ? `<div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}
</div></section>`,
    treatCard: (c, t) => `<a class="card" href="${c.u('treatments/' + t.slug)}"><span class="bub">${icon(t.icon, 24)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`,
    careCard: (c, t) => `<a class="card" href="${c.u('care/' + t.slug)}"><span class="bub">${icon(t.icon, 24)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`,
    cta: (c) => `<section class="cta-s"><div class="wrap"><div class="cta-simple"><div><h2>Ready to book your visit?</h2><p>Request an appointment online in four easy steps, or call our friendly team.</p></div><div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost-l" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div></div></div></section>`,

    home: (c) => `
<section class="cs" data-slider aria-roledescription="carousel" aria-label="Welcome">
  ${slides.map((s, i) => `<div class="sl${i === 0 ? ' on' : ''}${s.portrait ? ' portrait' : ''}" role="group" aria-label="Slide ${i + 1} of ${slides.length}"><div class="sl-bg">${img(s.bg, s.alt, 'width="1344" height="752"')}</div>
    <div class="sl-in"><div class="sl-txt"><h1>${esc(s.h1)}</h1><h2>${esc(s.h2)}</h2><p>${esc(s.p)}</p><a class="sl-btn" href="${c.u(s.to)}">Learn more</a></div></div></div>`).join('')}
  <button class="sl-arrow prev" data-prev aria-label="Previous slide">${icon('chev', 22)}</button><button class="sl-arrow next" data-next aria-label="Next slide">${icon('chev', 22)}</button>
  <div class="sl-dots" role="tablist">${slides.map((s, i) => `<button class="${i === 0 ? 'on' : ''}" data-go="${i}" role="tab" aria-label="Go to slide ${i + 1}"></button>`).join('')}</div>
</section>`,
  };
  return D;
}

export const designs = [
  classic('c1', 'design-6', 'Classic · Sage', '#2B463A'),
  classic('c2', 'design-7', 'Classic · Navy & Teal', '#18284A'),
  classic('c3', 'design-8', 'Classic · Plum & Coral', '#3A2340'),
];
export default designs;
