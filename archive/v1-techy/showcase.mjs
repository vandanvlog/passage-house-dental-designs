// Presentation page for the boss: dist/index.html
import { esc } from './lib.mjs';

const meta = {
  d1: { tag: 'Light · Bento · Editorial serif', desc: 'Porcelain and navy with a coral pop. A floating glass dock, oversized serif headlines and a bento-grid homepage. Calm, confident and modern.', sw: ['#F3EFE8', '#14263B', '#A8B5A0', '#FF6B4A'], font: 'Instrument Serif + Inter' },
  d2: { tag: 'Dark · Luxury · Cinematic', desc: 'Midnight navy and champagne gold. A vertical side rail, numbered editorial lists and glass panels - a private-clinic feel for implants and cosmetic work.', sw: ['#0B1626', '#E8E0D0', '#C9A66B', '#16283F'], font: 'Cormorant Garamond + Inter' },
  d3: { tag: 'Warm · Friendly · Rounded', desc: 'Cream, moss and terracotta with arch-shaped frames, soft rounded type and a mobile-first bottom dock. Welcoming for families and nervous patients.', sw: ['#F6EFE3', '#2F4A3B', '#D9A383', '#FF7A3D'], font: 'Bricolage Grotesque + DM Sans' },
  d4: { tag: 'Bold · Swiss · Typographic', desc: 'Ink on paper with an acid-lime accent, mono labels, hairline grids and a full-screen index menu. Confident, contemporary and unmistakably different.', sw: ['#EFEBE3', '#0E1620', '#D8FF3D', '#16283F'], font: 'Space Grotesk + JetBrains Mono' },
};

export function showcase(designs) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Passage House Dental - four design directions</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
:root{--bg:#F1EDE6;--fg:#14263B;--mute:#55606F;--line:rgba(20,38,59,.14)}
@media(prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#0e1622;--fg:#f1ede6;--mute:#9aa6b4;--line:rgba(255,255,255,.14)}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:400 17px/1.6 Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.w{width:min(1240px,100% - 40px);margin-inline:auto}
header{padding:56px 0 32px}header img{height:56px}
h1{font:400 clamp(48px,9vw,128px)/.92 'Instrument Serif',serif;letter-spacing:-.05em;margin:48px 0 24px}h1 em{color:#e35a3b}
.lead{max-width:60ch;color:var(--mute);font-size:20px}
.mono{font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding-block:48px 96px}
.card{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:28px;overflow:hidden;background:color-mix(in srgb,var(--bg) 60%,#fff 8%);transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s}
.card:hover{transform:translateY(-6px);box-shadow:0 30px 60px -30px rgba(0,0,0,.4)}
.prev{aspect-ratio:16/10;position:relative;overflow:hidden;border-bottom:1px solid var(--line);background:#fff}
.prev iframe{position:absolute;left:0;top:0;width:1440px;height:900px;border:0;transform-origin:0 0;transform:scale(var(--s,.42));pointer-events:none}
.body{padding:28px 32px 32px;display:grid;gap:14px}
.num{font:400 20px 'Instrument Serif',serif;color:var(--mute)}
h2{font:400 44px/1 'Instrument Serif',serif;letter-spacing:-.03em;margin:0}
.sw{display:flex;gap:8px}.sw i{width:28px;height:28px;border-radius:50%;border:1px solid var(--line)}
.links{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
a.b{padding:13px 22px;border-radius:999px;background:var(--fg);color:var(--bg);font-weight:600;font-size:15px;text-decoration:none;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}a.b:hover{transform:scale(1.04)}
a.b.g{background:transparent;color:var(--fg);box-shadow:inset 0 0 0 1.5px var(--line)}
.notes{border-top:1px solid var(--line);padding-block:48px 80px;display:grid;grid-template-columns:repeat(3,1fr);gap:32px;color:var(--mute);font-size:15px}.notes h3{font:500 12px 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--fg);margin:0 0 10px}
@media(max-width:860px){.grid,.notes{grid-template-columns:1fr}}
</style></head><body>
<header class="w"><img src="shared/assets/${'lockup-navy'}.png" alt="Passage House Dental Care" style="filter:none"><p class="mono" style="margin-top:32px">Website redesign · four directions for review</p>
<h1>Four ways to <em>feel</em> Passage House.</h1>
<p class="lead">Each direction is a complete, clickable website: homepage, all 12 treatments, care options, fees, team, family, news, contact and an online booking flow. Open one, click around, then tell us which feels right.</p></header>
<main class="w grid">
${designs.map((D, i) => { const m = meta[D.id]; return `<article class="card"><div class="prev"><iframe src="${D.folder}/index.html" title="${esc(D.name)} preview" loading="lazy" tabindex="-1"></iframe></div>
<div class="body"><span class="num">0${i + 1}</span><h2>${esc(D.name)}</h2><p class="mono">${esc(m.tag)}</p><p style="margin:0;color:var(--mute)">${esc(m.desc)}</p>
<div class="sw">${m.sw.map((c) => `<i style="background:${c}"></i>`).join('')}</div><p class="mono" style="margin:0">${esc(m.font)}</p>
<div class="links"><a class="b" href="${D.folder}/index.html">Open website</a><a class="b g" href="${D.folder}/treatments/dental-implants/index.html">Implants page</a><a class="b g" href="${D.folder}/book/index.html">Booking flow</a></div></div></article>`; }).join('')}
</main>
<section class="w notes"><div><h3>What's real</h3>Address, phone, hours, team, fees (2024 private guide), Dental Plan price and NHS / urgent-care information are taken from the current website.</div>
<div><h3>What's placeholder</h3>No photography has been supplied, so imagery uses brand-derived art and initials. Treatment descriptions are general copy for review by the clinical team. Plan tiers were an image on the old site and still need adding.</div>
<div><h3>Booking</h3>The booking flow is a polished request form: it validates, confirms and prepares an email. It needs connecting to the practice's appointment system or an inbox before launch.</div></section>
<script>document.querySelectorAll('.prev').forEach(function(p){function f(){p.style.setProperty('--s',p.clientWidth/1440)}f();addEventListener('resize',f)})</script>
</body></html>`;
}
