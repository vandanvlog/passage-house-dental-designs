import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { practice, hours, team, fees, treatments, care, family, news, bookingTypes } from './content.mjs';

// Team photos: drop <slug>.jpg into shared/photos/team/ (e.g. dr-brad-hall.jpg) and rebuild.
const teamDir = fileURLToPath(new URL('../shared/photos/team/', import.meta.url));
export const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const teamPhoto = (name) => (existsSync(teamDir + slug(name) + '.jpg') ? `%%SH%%photos/team/${slug(name)}.jpg` : null);
export const avatarInner = (name) => { const p = teamPhoto(name); return p ? `<img src="${p}" alt="${esc(name)}" loading="lazy">` : `<span>${esc(initials(name))}</span>`; };

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const P = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  up: '<path d="M7 17 17 7M8 7h9v9"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  sparkle: '<path d="M12 3l2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7z"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  tooth: '<path d="M7 3C4.5 3 3 5 3 7.5c0 2 1 3.5 1.5 5.5.6 2.4.7 5 2 7.5.5 1 1.8 1 2.2 0 .7-1.8.8-4 2.3-4s1.6 2.2 2.3 4c.4 1 1.7 1 2.2 0 1.3-2.5 1.4-5.1 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.500 3 17 3c-1.8 0-2.5 1-5 1S8.800 3 7 3z"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  pound: '<path d="M18 7c0-3-2-4-4.500-4S9 4.500 9 7v4H6m3 0h7M6 20h12M9 11v9"/>',
  alert: '<path d="M10.290 3.860 1.820 18a2 2 0 0 0 1.710 3h16.940a2 2 0 0 0 1.710-3L13.710 3.860a2 2 0 0 0-3.420 0zM12 9v4M12 17h.01"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  star: '<path d="M12 2l3.090 6.260L22 9.270l-5 4.870 1.180 6.880L12 17.770l-6.180 3.250L7 14.140 2 9.270l6.910-1.010z"/>',
};
export const icon = (n, size = 20) =>
  `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.sparkle}</svg>`;

// Build a context bound to one design + page depth (so links work from file:// and from a server)
export function makeCtx(design, depth) {
  const up = '../'.repeat(depth);
  return {
    design, depth,
    u: (p = '') => up + (p ? p.replace(/\/$/, '') + '/' : '') + 'index.html',
    d: (p) => up + p,
    sh: (p) => up + '../shared/' + p,
  };
}

export const initials = (n) => n.replace(/^Dr\s+/, '').split(' ').map((w) => w[0]).slice(0, 2).join('');

/* ---------- Shared components (neutral class names; each design styles them) ---------- */
export const faq = (list) =>
  `<div class="x-faq">${list.map(([q, a], i) => `<details data-reveal style="--i:${i}"><summary><span>${esc(q)}</span><i aria-hidden="true">${icon('plus', 18)}</i></summary><p>${esc(a)}</p></details>`).join('')}</div>`;

export const priceTable = (p) => p && p.rows && p.rows.length
  ? `<div class="x-price" data-reveal><h3>${esc(p.title)}</h3><table><tbody>${p.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</tbody></table><p class="x-note">${esc(p.note || '')}</p></div>` : '';

export const highlights = (hl) =>
  `<ul class="x-hl">${hl.map((x, i) => `<li data-reveal style="--i:${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></li>`).join('')}</ul>`;

export const steps = (st) =>
  `<ol class="x-steps">${st.map((x, i) => `<li data-reveal style="--i:${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(x.h)}</h3><p>${esc(x.p)}</p></div></li>`).join('')}</ol>`;

export const hoursTable = () =>
  `<table class="x-hours"><tbody>${hours.map((h, i) => `<tr data-hours-row="${(i + 1) % 7}"><th>${h.d}</th><td>${h.s ? `${h.s} - ${h.e}` : 'Closed'}</td></tr>`).join('')}</tbody></table>`;

export const openBadge = () => `<span class="x-open"><i></i><b data-open-now>Checking hours...</b></span>`;

export const person = (p, i = 0) =>
  `<article class="x-person" data-reveal style="--i:${i % 4}"><div class="av"${teamPhoto(p.name) ? '' : ' aria-hidden="true"'}>${avatarInner(p.name)}</div><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p>${p.note ? `<small>${esc(p.note)}</small>` : ''}${p.gdc ? `<small>GDC ${p.gdc}</small>` : ''}</article>`;

export const teamBlocks = () => {
  const chips = (arr) => arr.map((n) => `<span class="chip-s">${esc(n)}</span>`).join('');
  return `
  <div class="x-team">
    <div class="x-team-group"><h3 class="x-label">Dentists</h3><div class="x-people">${team.dentists.map(person).join('')}</div></div>
    <div class="x-team-group"><h3 class="x-label">Specialists &amp; hygiene</h3><div class="x-people">${team.specialists.map(person).join('')}</div></div>
    <div class="x-team-group"><h3 class="x-label">Practice management</h3><div class="x-people">${team.managers.map(person).join('')}</div></div>
    <div class="x-team-group x-crew">
      <div><h3 class="x-label">Dental nurses</h3><p class="chips">${chips(team.nurses)}</p></div>
      <div><h3 class="x-label">Reception</h3><p class="chips">${chips(team.reception)}</p></div>
      <div><h3 class="x-label">Support</h3><p class="chips">${chips(team.support)}</p></div>
    </div>
  </div>`;
};

export const feeBlocks = () =>
  `<div class="x-fees">${fees.map((g, i) => `<section class="x-fee" data-reveal style="--i:${i % 3}"><h3>${esc(g.group)}</h3><table><tbody>${g.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</tbody></table></section>`).join('')}</div>
   <p class="x-note">Prices are from the practice's private fee guide (listed as 2024 prices) and may change. Plan members receive 10% off many treatments, and 0% patient finance is available. Fees are tailored at consultation.</p>`;

export const contactBlock = () => `
  <div class="x-contact">
    <div class="x-contact-cards">
      <a class="x-cc" href="${practice.phoneHref}" data-magnetic>${icon('phone', 22)}<span>Call</span><b>${practice.phone}</b></a>
      <a class="x-cc" href="mailto:${practice.email}" data-magnetic>${icon('mail', 22)}<span>Email</span><b>${practice.email}</b></a>
      <a class="x-cc" href="${practice.map}" target="_blank" rel="noopener" data-magnetic>${icon('pin', 22)}<span>Visit</span><b>${practice.address.join(', ')}</b></a>
    </div>
    <div class="x-contact-grid">
      <div class="x-box"><h3>Opening hours</h3>${openBadge()}${hoursTable()}</div>
      <div class="x-box x-map"><iframe title="Map showing Passage House Dental Care" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${practice.mapEmbed}"></iframe></div>
    </div>
    <div class="x-box x-urgent">${icon('alert', 22)}<div><h3>Dental emergency?</h3><p>Call us at opening time for a same-day urgent slot. Out of hours, call NHS 111, or ${practice.out247.name} on ${practice.out247.phone} (private).</p></div></div>
  </div>`;

export const bookingBlock = () => {
  const clinicians = [
    ...team.dentists.map((d) => ({ name: d.name, kind: d.name === 'Dr Brad Hall' ? 'implant' : 'dentist' })),
    { name: 'Dr Ben Cross', kind: 'ortho' },
    { name: 'Mercedez Francis', kind: 'hygienist' },
  ];
  const hrs = [0, 1, 2, 3, 4, 5, 6].map((d) => { const h = hours[(d + 6) % 7]; return h.s ? [h.s, h.e] : null; });
  const json = JSON.stringify({ types: bookingTypes, clinicians, hours: hrs, email: practice.email }).replace(/</g, '\\u003c');
  const bar = ['Appointment', 'Details', 'Date & time', 'Confirm'];
  return `
  <div class="x-book" data-booking>
    <script type="application/json" id="bk-data">${json}</script>
    <ol class="bk-bar" aria-label="Booking progress">${bar.map((b, i) => `<li data-bar="${i + 1}"><i>${i + 1}</i><span>${b}</span></li>`).join('')}</ol>

    <section data-step="1" aria-labelledby="bk1">
      <h2 id="bk1" data-focus tabindex="-1">What do you need?</h2>
      <div class="bk-opts">${bookingTypes.map((t) => `<label class="bk-opt"><input type="radio" name="type" value="${t.id}"><span><b>${esc(t.label)}</b><small>${esc(t.sub)}</small></span></label>`).join('')}</div>
      <div class="bk-actions"><span></span><button class="btn" data-next disabled>Continue ${icon('arrow', 18)}</button></div>
    </section>

    <section data-step="2" hidden aria-labelledby="bk2">
      <h2 id="bk2" tabindex="-1" data-focus>A little about you</h2>
      <fieldset class="bk-f"><legend>Type of care</legend>
        <div class="bk-pills">
          <label><input type="radio" name="funding" value="nhs" checked><span>NHS</span></label>
          <label><input type="radio" name="funding" value="private"><span>Private</span></label>
          <label><input type="radio" name="funding" value="plan"><span>Dental Plan member</span></label>
        </div></fieldset>
      <fieldset class="bk-f"><legend>Are you already a patient?</legend>
        <div class="bk-pills">
          <label><input type="radio" name="patient" value="existing" checked><span>Existing patient</span></label>
          <label><input type="radio" name="patient" value="new"><span>New patient</span></label>
        </div></fieldset>
      <label class="bk-f"><span class="lg">Preferred clinician</span><select data-who></select></label>
      <p class="x-note">NHS availability varies and lists may be closed to new patients - we will confirm what is possible.</p>
      <div class="bk-actions"><button class="btn ghost" data-prev>Back</button><button class="btn" data-next>Continue ${icon('arrow', 18)}</button></div>
    </section>

    <section data-step="3" hidden aria-labelledby="bk3">
      <h2 id="bk3" tabindex="-1" data-focus>Pick a preferred time</h2>
      <p class="lg">Day</p><div class="chips-row" data-dates></div>
      <p class="lg">Time</p><div class="chips-row" data-times><span class="x-note">Choose a day first.</span></div>
      <p class="x-note">This is a request - we will confirm the exact appointment by phone or email.</p>
      <div class="bk-actions"><button class="btn ghost" data-prev>Back</button><button class="btn" data-next disabled>Continue ${icon('arrow', 18)}</button></div>
    </section>

    <section data-step="4" hidden aria-labelledby="bk4">
      <h2 id="bk4" tabindex="-1" data-focus>Your details</h2>
      <ul class="bk-sum" data-summary></ul>
      <form>
        <div class="bk-grid">
          <label><span class="lg">Full name</span><input name="name" required autocomplete="name"></label>
          <label><span class="lg">Phone</span><input name="phone" type="tel" required autocomplete="tel"></label>
          <label class="wide"><span class="lg">Email</span><input name="email" type="email" required autocomplete="email"></label>
          <label class="wide"><span class="lg">Anything we should know? (optional)</span><textarea name="notes" rows="3" placeholder="Anxiety, access needs, pain, preferred days..."></textarea></label>
        </div>
        <label class="bk-check"><input type="checkbox" required><span>I understand this is an appointment request and that my details will be used to contact me about it.</span></label>
        <div class="bk-actions"><button type="button" class="btn ghost" data-prev>Back</button><button type="submit" class="btn">Send request ${icon('arrow', 18)}</button></div>
      </form>
    </section>

    <section data-step="5" hidden class="bk-done" aria-live="polite">
      <div class="tick">${icon('check', 36)}</div>
      <h2 tabindex="-1" data-focus>Thank you, <span data-name-out></span>.</h2>
      <p>Your request has been noted. A member of our team will be in touch to confirm. For anything urgent, please call <a href="${practice.phoneHref}">${practice.phone}</a>.</p>
      <a class="btn ghost" data-mailto href="#">Also email this request to the practice</a>
    </section>
  </div>`;
};

export const treatmentsByGroup = () => {
  const m = {}; treatments.forEach((t) => { (m[t.group] ||= []).push(t); }); return m;
};

export { practice, hours, team, fees, treatments, care, family, news, bookingTypes };
