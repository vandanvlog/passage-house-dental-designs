// v2 - SIMPLE designs. One calm, organised layout shared by three colour/type themes (s1 Warm, s2 Clean, s3 Sage).
// No animation tricks: standard top menu, clear sections, soft colours, big readable text.
import { esc, icon, practice, treatments, care, family, team, openBadge } from '../lib.mjs';

const nav = [['Treatments', 'treatments'], ['Care & plans', 'care'], ['Fees', 'fees'], ['Our team', 'team'], ['Family', 'family'], ['Contact', 'contact']];

const illo = () => `
<svg class="illo" viewBox="0 0 440 380" role="img" aria-label="Illustration of a smiling tooth with a toothbrush">
  <circle cx="90" cy="80" r="70" fill="var(--soft2)"/><circle cx="380" cy="320" r="90" fill="var(--soft2)"/>
  <path d="M60 330C150 372 300 372 400 250" stroke="var(--pop)" stroke-width="5" fill="none" stroke-linecap="round" opacity=".35"/>
  <path d="M95 345C170 372 270 362 340 300" stroke="var(--pop)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".25"/>
  <path d="M220 62C178 40 122 52 112 106c-9 42 12 74 19 116 6 40 10 92 34 101 21 8 28-44 55-44s34 52 55 44c24-9 28-61 34-101 7-42 28-74 19-116-10-54-66-66-108-44z" fill="#fff" stroke="var(--accent)" stroke-width="6" stroke-linejoin="round"/>
  <path d="M158 100c10-14 28-20 44-16" stroke="var(--soft2)" stroke-width="8" stroke-linecap="round" fill="none"/>
  <circle cx="190" cy="150" r="8" fill="var(--accent)"/><circle cx="250" cy="150" r="8" fill="var(--accent)"/>
  <path d="M192 186q28 24 56 0" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" fill="none"/>
  <circle cx="164" cy="178" r="12" fill="var(--pop)" opacity=".3"/><circle cx="276" cy="178" r="12" fill="var(--pop)" opacity=".3"/>
  <g fill="var(--pop)"><path d="M356 70l7 19 19 7-19 7-7 19-7-19-19-7 19-7z"/><path d="M70 220l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" opacity=".7"/><path d="M392 170l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" opacity=".5"/></g>
  <g transform="translate(350 210) rotate(28)"><rect x="-10" y="20" width="20" height="130" rx="10" fill="var(--pop)"/><rect x="-16" y="-46" width="32" height="74" rx="12" fill="#fff" stroke="var(--accent)" stroke-width="5"/><path d="M-8-30v40M0-30v40M8-30v40" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" opacity=".5"/></g>
</svg>`;

const featured = ['dental-implants', 'orthodontics', 'hygienist', 'teeth-whitening', 'white-fillings', 'crowns'].map((s) => treatments.find((t) => t.slug === s));

function make(id, name, fonts, extra = {}) {
  const D = {
    id, folder: `design-${id.slice(1)}`, name, themeColor: extra.themeColor || '#ffffff', fonts, cssFile: 'simple.css',
    bodyAttrs: '',

    shell: (c, body) => `
<header class="hdr"><div class="wrap hdr-in">
  <a class="hlogo" href="${c.u()}" aria-label="Passage House Dental Care - home"><img src="${c.sh('assets/lockup-' + extra.logo + '.png')}" alt="Passage House Dental Care" width="156" height="58"></a>
  <nav class="hnav" aria-label="Main" data-menu>
    ${nav.map(([l, p]) => `<a href="${c.u(p)}">${l}</a>`).join('')}
    <a class="hnav-m btn" href="${c.u('book')}">Book an appointment</a>
  </nav>
  <div class="hact"><a class="hphone" href="${practice.phoneHref}" aria-label="Call ${practice.phone}">${icon('phone', 18)}<span>${practice.phone}</span></a><a class="btn hbook" href="${c.u('book')}">Book online</a>
  <button class="hburger" data-menu-toggle aria-expanded="false" aria-label="Menu">${icon('menu', 24)}</button></div>
</div></header>
<main id="main">${body}</main>
<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand"><img src="${c.sh('assets/lockup-white.png')}" alt="Passage House Dental Care - modern dentistry for all" width="200"><p>${practice.address.join(', ')}</p></div>
    <div><h4>Contact</h4><p><a href="${practice.phoneHref}">${practice.phone}</a></p><p><a href="mailto:${practice.email}">${practice.email}</a></p><p>${openBadge()}</p></div>
    <div><h4>Quick links</h4>${nav.map(([l, p]) => `<p><a href="${c.u(p)}">${l}</a></p>`).join('')}</div>
    <div><h4>Opening hours</h4><p>Mon 08:30 - 17:30<br>Tue 08:30 - 18:30<br>Wed 08:30 - 17:00<br>Thu 08:00 - 17:30<br>Fri 08:00 - 16:00</p></div>
  </div>
  <div class="wrap foot-base"><span>© ${new Date().getFullYear()} ${practice.name}</span><a href="${practice.liveSite}" target="_blank" rel="noopener">Privacy, complaints &amp; policies</a></div>
</footer>`,

    hero: (c, { eyebrow, title, lead, crumbs = [], actions, compact }) => `
<section class="phero${compact ? ' compact' : ''}"><div class="wrap">
  <p class="crumbs">${[['Home', ''], ...crumbs].map(([l, p], i, a) => (p !== undefined && i < a.length - 1 ? `<a href="${c.u(p)}">${l}</a>` : `<span>${esc(l)}</span>`)).join(' <i>/</i> ')}</p>
  <h1>${esc(title)}</h1>
  <p class="lead">${esc(lead)}</p>
  ${actions ? `<div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>` : ''}
</div></section>`,

    treatCard: (c, t) => `<a class="card" href="${c.u('treatments/' + t.slug)}"><span class="bub">${icon(t.icon, 24)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`,
    careCard: (c, t) => `<a class="card" href="${c.u('care/' + t.slug)}"><span class="bub">${icon(t.icon, 24)}</span><h3>${esc(t.name)}</h3><p>${esc(t.short)}</p><span class="more">Learn more ${icon('arrow', 16)}</span></a>`,

    cta: (c) => `
<section class="cta-s"><div class="wrap"><div class="cta-box">
  <div><h2>Ready to book your visit?</h2><p>Request an appointment online in four easy steps, or call our friendly team.</p></div>
  <div class="btn-row"><a class="btn light" href="${c.u('book')}">Book an appointment</a><a class="btn ghost-l" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
</div></div></section>`,

    home: (c) => `
<section class="hero${extra.flip ? ' flip' : ''}"><div class="wrap hero-g">
  <div class="hero-copy">
    <p class="pill">${openBadge()}</p>
    <h1>Friendly, modern dentistry for <span class="hl">everyone</span> in Bristol</h1>
    <p class="lead">NHS and private care for the whole family, from check-ups to implants and specialist braces, in Henbury.</p>
    <div class="btn-row"><a class="btn" href="${c.u('book')}">Book an appointment</a><a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a></div>
    <ul class="ticks"><li>${icon('check', 18)} NHS &amp; private</li><li>${icon('check', 18)} Nervous patients welcome</li><li>${icon('check', 18)} Same-day urgent slots</li></ul>
  </div>
  <div class="hero-art">${illo()}<div class="float"><span class="bub sm">${icon('clock', 18)}</span><div><b>Open Monday to Friday</b><small>Tue until 18:30</small></div></div></div>
</div></section>

<section class="strip"><div class="wrap strip-g">
  <div><span class="bub dk">${icon('shield', 22)}</span><div><b>NHS &amp; private</b><small>Care to suit you</small></div></div>
  <div><span class="bub dk">${icon('heart', 22)}</span><div><b>From £2.30 / week</b><small>Dental Plan</small></div></div>
  <div><span class="bub dk">${icon('pound', 22)}</span><div><b>0% finance</b><small>Spread the cost</small></div></div>
  <div><span class="bub dk">${icon('alert', 22)}</span><div><b>Urgent care</b><small>Same-day slots</small></div></div>
</div></section>

<section class="blk"><div class="wrap">
  <div class="sh"><div><p class="ey">Treatments</p><h2>How can we help you today?</h2></div><a class="lnk" href="${c.u('treatments')}">See all 12 treatments ${icon('arrow', 16)}</a></div>
  <div class="grid3">${featured.map((t) => D.treatCard(c, t)).join('')}</div>
</div></section>

<section class="blk tint"><div class="wrap">
  <div class="sh"><div><p class="ey">Care &amp; payment</p><h2>Choose the care that suits you</h2></div><a class="lnk" href="${c.u('care')}">All care options ${icon('arrow', 16)}</a></div>
  <div class="grid2">${['nhs', 'private', 'dental-plan', 'finance'].map((s) => { const x = care.find((q) => q.slug === s); return `<a class="opt" href="${c.u('care/' + s)}"><span class="bub">${icon(x.icon, 24)}</span><div><h3>${esc(x.name)}</h3><p>${esc(x.short)}</p></div>${icon('arrow', 20)}</a>`; }).join('')}</div>
</div></section>

<section class="blk"><div class="wrap split">
  <div>
    <p class="ey">About us</p><h2>A friendly, professional and caring team</h2>
    <p class="body">We have provided NHS dental care in Henbury for decades, alongside private treatment and a Dental Plan. Our dentists, specialist orthodontist, hygienist and nurses are here to look after you at every age.</p>
    <ul class="checks"><li>${icon('check', 20)}<span>8 dentists, including implant specialist Dr Brad Hall</span></li><li>${icon('check', 20)}<span>Specialist orthodontist Dr Ben Cross for children and adults</span></li><li>${icon('check', 20)}<span>Hygienist appointments without a dentist referral</span></li><li>${icon('check', 20)}<span>Bristol's first Dementia Friendly dental practice</span></li></ul>
    <a class="btn" href="${c.u('team')}">Meet the team</a>
  </div>
  <div class="faces">${[...team.dentists.slice(0, 3), ...team.specialists].map((p) => `<div class="face"><span class="av2">${esc(p.name.replace('Dr ', '').split(' ').map((w) => w[0]).join(''))}</span><b>${esc(p.name)}</b><small>${esc(p.role)}</small></div>`).join('')}</div>
</div></section>

<section class="blk tint"><div class="wrap">
  <div class="sh c"><div><p class="ey">Booking</p><h2>Book in four easy steps</h2></div></div>
  <ol class="steps3">${[['Choose', 'Pick the appointment you need.'], ['Your details', 'Tell us about your care and who you would like to see.'], ['Pick a time', 'Choose a day and time that suits you.'], ['We confirm', 'Our team confirms by phone or email.']].map(([h, p], i) => `<li><span class="num">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
  <div class="center"><a class="btn" href="${c.u('book')}">Start booking</a></div>
</div></section>

<section class="blk"><div class="wrap"><div class="reassure">
  <span class="bub lg">${icon('heart', 28)}</span>
  <div><h2>Nervous about the dentist? You're not alone.</h2><p>Every dentist here is happy to look after anxious patients. Tell us how you feel and we will go at your pace, with quieter appointment times available.</p></div>
  <a class="btn" href="${c.u('care/nervous-patients')}">How we help</a>
</div></div></section>

<section class="blk tint"><div class="wrap">
  <div class="sh"><div><p class="ey">Find us</p><h2>Visit the practice</h2></div></div>
  <div class="visit">
    <div class="vcard"><h3>Opening hours</h3><table class="x-hours"><tbody>${['Monday|08:30 - 17:30', 'Tuesday|08:30 - 18:30', 'Wednesday|08:30 - 17:00', 'Thursday|08:00 - 17:30', 'Friday|08:00 - 16:00', 'Saturday|Closed', 'Sunday|Closed'].map((r, i) => { const [d, h] = r.split('|'); return `<tr data-hours-row="${(i + 1) % 7}"><th>${d}</th><td>${h}</td></tr>`; }).join('')}</tbody></table></div>
    <div class="vcard"><h3>Get in touch</h3>
      <p class="vl">${icon('pin', 20)}<span>${practice.address.join('<br>')}</span></p>
      <p class="vl">${icon('phone', 20)}<a href="${practice.phoneHref}">${practice.phone}</a></p>
      <p class="vl">${icon('mail', 20)}<a href="mailto:${practice.email}">${practice.email}</a></p>
      <div class="btn-row"><a class="btn" href="${c.u('contact')}">Contact &amp; directions</a></div></div>
  </div>
</div></section>
${D.cta(c)}`,
  };
  return D;
}

export const designs = [
  make('s1', 'Warm', 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap', { logo: 'navy', themeColor: '#FBF6EC' }),
  make('s2', 'Clean', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap', { logo: 'navy', themeColor: '#F6F9FB', flip: false }),
  make('s3', 'Sage', 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=DM+Sans:wght@400;500;700&display=swap', { logo: 'moss', themeColor: '#F3F6F0', flip: true }),
];
export default designs;
