// Review page for the boss: dist/index.html
import { esc } from './lib.mjs';

export const meta = {
  c1: { tag: 'Sage', desc: 'The layout of your current website: slider with logo over it, menu bar top-right, dark info band and four big tiles. Deep sage green with a gold accent.', sw: ['#2B463A', '#6F8C7B', '#D2A64C'] },
  c2: { tag: 'Navy & Teal', desc: 'The same layout in navy with a fresh teal accent. Closest to the current dark-blue feel.', sw: ['#18284A', '#5D6F94', '#1FA6AC'] },
  c3: { tag: 'Plum & Coral', desc: 'The same layout in deep plum with a warm coral accent. A softer, friendlier take.', sw: ['#3A2340', '#86698E', '#FF7B67'] },
  b1: { tag: 'Sage', desc: 'A soft sage-green page with brass gold. Calm, natural and quietly luxurious.', sw: ['#E6EDDF', '#2F4A3B', '#B8975C'] },
  b2: { tag: 'Navy & Champagne', desc: 'A deep navy page with champagne gold. Dark, rich and refined.', sw: ['#0E1C30', '#172C47', '#D2B075'] },
  b3: { tag: 'Blush & Bronze', desc: 'A blush-pink page with rose bronze and deep plum. Soft, elegant and welcoming.', sw: ['#F6E2D9', '#4A2F31', '#C4876B'] },
  h1: { tag: 'Logo, then a menu button', desc: 'The logo sits centred with a hamburger button beneath it. Tap it and a full-width menu slides down with every service. Cool grey-blue with gold.', sw: ['#EEF2F6', '#16283F', '#C9A66B'] },
  m1: { tag: 'Tap what brings you in', desc: 'Opens with "What brings you in today?": tap a need and get the right answer with a photo. Services in filterable cards. Warm cream, teal and gold.', sw: ['#FBF7EE', '#0F4C5C', '#C99A3E'] },
};

const cardHtml = (D, i, m) => `<article class="card"><div class="prev"><iframe src="${D.folder}/index.html" title="${esc(D.name)} preview" loading="lazy" tabindex="-1"></iframe></div>
<div class="body"><p class="tag">Option ${i + 1}</p><h2>${esc(D.name)}</h2><p class="mt">${esc(m.tag)}</p><p style="margin:0;color:#5E6670">${esc(m.desc)}</p>
<div class="sw">${m.sw.map((c) => `<i style="background:${c}"></i>`).join('')}</div>
<div class="links"><a class="b" href="${D.folder}/index.html">Open website</a><a class="b g" href="${D.folder}/treatments/dental-implants/index.html">Service page</a><a class="b g" href="${D.folder}/book/index.html">Booking</a></div></div></article>`;

export function showcase(designs) {
  const row1 = designs.filter((D) => D.id[0] === 'b');
  const row2 = designs.filter((D) => D.id[0] === 'h' || D.id[0] === 'm');
  const row3 = designs.filter((D) => D.id[0] === 'c');
  const fmt = (list) => list.map((D) => cardHtml(D, designs.indexOf(D), meta[D.id])).join('');
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Passage House Dental - website designs</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;background:#F6F4EC;color:#243528;font:400 18px/1.6 Jost,system-ui,sans-serif}
.w{width:min(1240px,100% - 40px);margin-inline:auto}
header{padding:48px 0 8px;text-align:center}header img{height:68px}
h1{font:600 clamp(2.4rem,5vw,4rem)/1 'Cormorant Garamond',serif;margin:26px 0 12px}
.lead{max-width:62ch;color:#5C6B5F;margin:0 auto}
.set{font:600 2.2rem/1.1 'Cormorant Garamond',serif;margin:56px 0 4px}.sub{margin:0 0 4px;color:#5C6B5F}
.rule{border:0;height:1px;background:#C2A26C;width:64px;margin:14px 0 0}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding-block:28px 8px}.grid.two{grid-template-columns:repeat(2,1fr)}
.card{display:flex;flex-direction:column;background:#fff;border:1px solid #DCE3D5;border-radius:22px;overflow:hidden;transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s}.card:hover{transform:translateY(-5px);box-shadow:0 30px 50px -34px rgba(0,0,0,.45)}
.prev{aspect-ratio:4/3;position:relative;overflow:hidden;border-bottom:1px solid #DCE3D5;background:#fff}
.prev iframe{position:absolute;left:0;top:0;width:1280px;height:960px;border:0;transform-origin:0 0;transform:scale(var(--s,.3));pointer-events:none}
.body{padding:24px 26px 28px;display:grid;gap:10px}
h2{margin:0;font:600 2rem/1.1 'Cormorant Garamond',serif}.tag{margin:0;font-weight:600;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#86672F}.mt{margin:0;font-weight:500}
.sw{display:flex;gap:8px}.sw i{width:26px;height:26px;border-radius:50%;border:1px solid #0002}
.links{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
a.b{padding:12px 20px;border-radius:999px;background:#2F4A3B;color:#fff;font-weight:500;font-size:16px;text-decoration:none;transition:transform .3s}a.b:hover{transform:translateY(-2px)}
a.b.g{background:#fff;color:#2F4A3B;box-shadow:inset 0 0 0 1.5px #CFD8C8}
.notes{border-top:1px solid #DCE3D5;margin-top:56px;padding-block:36px 64px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;color:#5C6B5F;font-size:16px}.notes h3{margin:0 0 8px;color:#243528;font:600 1.4rem 'Cormorant Garamond',serif}
@media(max-width:900px){.grid,.grid.two,.notes{grid-template-columns:1fr}}
</style></head><body>
<header class="w"><img src="shared/assets/lockup-moss.png" alt="Passage House Dental Care">
<h1>Choose a look for the new website</h1>
<p class="lead">Row 1 is our main design in three colours. Row 2 shows two other directions. Every option is a complete website: open one, hover the Services menu, and try the booking page.</p></header>
<section class="w"><h2 class="set">Our main design, in three colours</h2><p class="sub">Centred logo, a pill menu with a Services dropdown, and a calm, luxurious feel.</p><hr class="rule"><div class="grid">${fmt(row1)}</div></section>
<section class="w"><h2 class="set">Your current website's layout, in three colours</h2><p class="sub">Same structure as passagehousedental.co.uk (slider, menu bar, info band, four tiles), modernised.</p><hr class="rule"><div class="grid">${fmt(row3)}</div></section>
<section class="w"><h2 class="set">Other design directions</h2><p class="sub">Different layouts, same quality and content.</p><hr class="rule"><div class="grid two">${fmt(row2)}</div></section>
<section class="w notes"><div><h3>Photography</h3>The pictures are AI-generated stand-ins so you can judge the look. The people are not real staff. The practice's live site has no team photos, so real photos of the team and practice are needed. Each team member has a named photo slot ready.</div>
<div><h3>Real information</h3>Address, phone, hours, team names, private fees (2024 guide), Dental Plan price and NHS and urgent-care details come from the current website.</div>
<div><h3>Booking</h3>The booking page is a working request form. Before launch it needs connecting to the practice's email or appointment system.</div></section>
<script>document.querySelectorAll('.prev').forEach(function(p){function f(){p.style.setProperty('--s',p.clientWidth/1280)}f();addEventListener('resize',f)})</script>
</body></html>`;
}
