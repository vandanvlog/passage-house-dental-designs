import {
  esc, icon, makeCtx, faq, priceTable, highlights, steps, teamBlocks, feeBlocks, contactBlock, bookingBlock,
  practice, treatments, care, family, news, treatmentsByGroup, openBadge,
} from './lib.mjs';
import { allTreatmentGroups } from './content.mjs';

const PH = {
  'dental-implants': ['implants-still', 'Dental implant replica and teeth model on a marble tray'], orthodontics: ['portrait-teen', 'Smiling teenager with discreet braces'], hygienist: ['hygienist', 'Dental hygienist preparing for an appointment'],
  smilefast: ['portrait-woman', 'Woman with a confident natural smile'], 'cosmetic-dentistry': ['portrait-woman', 'Woman with a confident natural smile'], 'teeth-whitening': ['portrait-woman', 'Woman with a bright natural smile'], veneers: ['portrait-woman', 'Woman with a confident natural smile'],
  crowns: ['portrait-man', 'Man with a relaxed, healthy smile'], bridges: ['couple', 'Smiling couple outdoors'], dentures: ['couple', 'Smiling couple outdoors'], 'white-fillings': ['portrait-man', 'Man with a relaxed, healthy smile'], 'root-canal': ['reassure', 'Dentist talking reassuringly with a patient'],
  nhs: ['reception', 'Calm, welcoming practice reception'], private: ['reception', 'Calm, welcoming practice reception'], 'dental-plan': ['family', 'Happy family laughing together'], finance: ['couple', 'Smiling couple outdoors'], referrals: ['hygienist', 'Dental hygienist at work'],
  'nervous-patients': ['reassure', 'Dentist talking reassuringly with a patient'], 'urgent-care': ['reassure', 'Dentist talking reassuringly with a patient'], 'oral-health': ['child', 'Happy child giving a thumbs up in the dental chair'],
};
const photo = (slug) => (PH[slug] ? `<figure class="x-photo" data-reveal><img src="%%SH%%photos/${PH[slug][0]}.jpg" alt="${PH[slug][1]}" loading="lazy" width="1024" height="688"></figure>` : '');
const wrap = (inner, cls = '') => `<div class="wrap ${cls}">${inner}</div>`;
const sec = (inner, cls = '') => `<section class="x-sec ${cls}">${wrap(inner)}</section>`;

// Each entry: { path, title, desc, body(ctx, D) }
export function pageList(D) {
  const pages = [];
  const add = (path, title, desc, body) => pages.push({ path, title, desc, body });

  add('', `${practice.name} - Bristol`, 'Modern dentistry for all in Henbury, Bristol. NHS and private care, implants, orthodontics and more.', (c) => D.home(c));

  /* ---- Treatments ---- */
  add('treatments', 'Treatments', 'Every treatment we offer at Passage House Dental Care.', (c) => {
    const groups = treatmentsByGroup();
    return D.hero(c, { eyebrow: 'Treatments', title: 'Everything your smile could need.', lead: 'From routine check-ups to implants and orthodontics - all under one roof in Henbury.', crumbs: [['Treatments']] }) +
      sec(allTreatmentGroups.filter((g) => groups[g]).map((g) => `
        <div class="x-group"><h2 class="x-group-title" data-reveal>${g}</h2><div class="x-cards">${groups[g].map((t, i) => D.treatCard(c, t, i)).join('')}</div></div>`).join('')) +
      D.cta(c, {});
  });

  treatments.forEach((t) => {
    add(`treatments/${t.slug}`, t.name, t.short, (c) => {
      const related = treatments.filter((x) => x.slug !== t.slug && (x.group === t.group)).slice(0, 3);
      const rel = related.length ? related : treatments.filter((x) => x.slug !== t.slug).slice(0, 3);
      return D.hero(c, {
        eyebrow: t.group, title: t.name, lead: t.lead,
        crumbs: [['Treatments', 'treatments'], [t.name]],
        actions: true,
      }) +
        sec(`
        <div class="x-detail">
          <div class="x-main">
            ${photo(t.slug)}<div class="x-prose" data-reveal>${t.intro.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
            <h2 class="x-h2" data-reveal>Why patients choose it</h2>${highlights(t.highlights)}
            <h2 class="x-h2" data-reveal>How it works</h2>${steps(t.steps)}
            ${priceTable(t.price)}
            <h2 class="x-h2" data-reveal>Questions</h2>${faq(t.faqs)}
          </div>
          <aside class="x-aside">
            <div class="x-side" data-reveal>
              <h3>Interested in ${esc(t.name.toLowerCase())}?</h3>
              <p>Talk to the team or request a consultation online.</p>
              <a class="btn" href="${c.u('book')}" data-magnetic>Book a consultation ${icon('arrow', 18)}</a>
              <a class="btn ghost" href="${practice.phoneHref}">${icon('phone', 18)} ${practice.phone}</a>
              <ul class="x-side-list"><li>${icon('pound', 18)} <a href="${c.u('care/finance')}">0% finance available</a></li><li>${icon('heart', 18)} <a href="${c.u('care/dental-plan')}">10% off for Dental Plan members</a></li></ul>
            </div>
            <div class="x-side alt" data-reveal><h3>Related</h3>${rel.map((r) => `<a class="x-rel" href="${c.u('treatments/' + r.slug)}"><span>${esc(r.name)}</span>${icon('up', 18)}</a>`).join('')}</div>
          </aside>
        </div>`) + D.cta(c, {});
    });
  });

  /* ---- Care & fees ---- */
  add('care', 'Care options', 'NHS, private, plans, finance, referrals and urgent care.', (c) =>
    D.hero(c, { eyebrow: 'Care & payment', title: 'Care that fits your life - and your budget.', lead: 'NHS or private, pay as you go or a monthly plan. Whatever route suits you, we will explain it clearly.', crumbs: [['Care options']] }) +
    sec(`<div class="x-cards care">${care.map((x, i) => D.careCard(c, x, i)).join('')}</div>`) + D.cta(c, {}));

  care.forEach((x) => {
    add(`care/${x.slug}`, x.name, x.short, (c) =>
      D.hero(c, { eyebrow: 'Care options', title: x.name, lead: x.lead, crumbs: [['Care options', 'care'], [x.name]], actions: x.slug === 'urgent-care' ? 'urgent' : true }) +
      sec(`<div class="x-detail"><div class="x-main">${photo(x.slug)}${x.blocks.map((b, i) => `
        <div class="x-block" data-reveal style="--i:${i}"><h2 class="x-h2">${esc(b.h)}</h2>${b.p ? `<p>${esc(b.p)}</p>` : ''}${b.list ? `<ul class="x-list">${b.list.map((l) => `<li>${icon('check', 18)}<span>${esc(l)}</span></li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
        <aside class="x-aside"><div class="x-side" data-reveal><h3>Questions?</h3><p>Call or email and we will be happy to help.</p>
          <a class="btn" href="${practice.phoneHref}" data-magnetic>${icon('phone', 18)} ${practice.phone}</a>
          <a class="btn ghost" href="${c.u('book')}">Request an appointment</a></div>
          <div class="x-side alt" data-reveal><h3>More options</h3>${care.filter((o) => o.slug !== x.slug).slice(0, 4).map((r) => `<a class="x-rel" href="${c.u('care/' + r.slug)}"><span>${esc(r.name)}</span>${icon('up', 18)}</a>`).join('')}</div></aside></div>`) + D.cta(c, {}));
  });

  add('fees', 'Private fee guide', 'Transparent private treatment fees at Passage House Dental Care.', (c) =>
    D.hero(c, { eyebrow: 'Fees', title: 'Clear, honest pricing.', lead: 'Our private fee guide, with 0% finance and a Dental Plan to help you spread the cost.', crumbs: [['Fees']] }) +
    sec(feeBlocks()) + D.cta(c, {}));

  /* ---- People & community ---- */
  add('team', 'Meet the team', 'The dentists, specialists and team at Passage House Dental Care.', (c) =>
    D.hero(c, { eyebrow: 'About us', title: 'The people looking after your smile.', lead: 'A friendly, professional and caring team - from our dentists and specialists to the nurses and reception team who keep everything running.', crumbs: [['Meet the team']] }) +
    sec(teamBlocks()) + D.cta(c, {}));

  add('family', 'Family dentistry', 'Dental care for babies, children, teens and adults.', (c) =>
    D.hero(c, { eyebrow: 'Family', title: 'Healthy smiles at every age.', lead: 'Habits formed early last a lifetime. Practical advice for each stage of childhood.', crumbs: [['Family']] }) +
    sec(`<figure class="x-photo wide" data-reveal><img src="%%SH%%photos/family.jpg" alt="Happy family laughing together" loading="lazy" width="1024" height="688"></figure><div class="x-family">${family.map((f, i) => `<article class="x-age" data-reveal style="--i:${i}"><span class="age">${f.age}</span><h2>${esc(f.title)}</h2><p>${esc(f.p)}</p></article>`).join('')}</div>`) + D.cta(c, {}));

  add('news', 'News', 'Latest news from Passage House Dental Care.', (c) =>
    D.hero(c, { eyebrow: 'News', title: 'Latest from the practice.', lead: 'Team updates, patient information and plan news.', crumbs: [['News']] }) +
    sec(`<div class="x-news">${news.map((n, i) => `<article class="x-post" data-reveal style="--i:${i}"><span class="tag">${esc(n.tag)}</span><h2>${esc(n.title)}</h2><p>${esc(n.p)}</p></article>`).join('')}</div>`) + D.cta(c, {}));

  add('contact', 'Contact', 'Contact, opening hours and directions for Passage House Dental Care.', (c) =>
    D.hero(c, { eyebrow: 'Contact', title: 'Come and say hello.', lead: 'We are on Passage Road in Henbury, Bristol. Call, email or request an appointment online.', crumbs: [['Contact']] }) +
    sec(`<figure class="x-photo wide" data-reveal><img src="%%SH%%photos/reception.jpg" alt="Calm, welcoming practice reception" loading="lazy" width="1024" height="688"></figure>` + contactBlock() + `<p class="x-note review">Happy with your visit? <a href="${practice.liveSite}review-us/" target="_blank" rel="noopener">Leave us a review</a>.</p>`));

  add('book', 'Request an appointment', 'Request an appointment at Passage House Dental Care.', (c) =>
    D.hero(c, { eyebrow: 'Book', title: 'Request an appointment.', lead: 'Four quick steps. We will confirm your appointment by phone or email.', crumbs: [['Book']], compact: true }) +
    sec(bookingBlock()));

  return pages;
}

export { makeCtx };
